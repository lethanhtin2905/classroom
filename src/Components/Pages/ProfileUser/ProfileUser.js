import './ProfileUser.css';
import * as React from 'react';
import { useHistory } from 'react-router';
import AuthHeader from '../../../Auth/AuthHeader';
import AuthService from '../../../Auth/AuthService';
import constant from '../../../Utils';
import {
    Button,
    MenuItem,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    IconButton
} from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function ProfileUser() {
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        history.push('/logIn');
    }
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(currentUser?currentUser.name:'');
    const [email, setEmail] = React.useState(currentUser?currentUser.email:'');
    const [studentId, setStudentId] = React.useState(currentUser?currentUser.userID:'');
    const [studentId_temp, setStudentId_temp] = React.useState(currentUser?currentUser.userID:'');
    const [classList, setClassList] = React.useState(currentUser?currentUser.classList:'');
    const [actClass, setActClass] = React.useState(null);

    const isMenuActClassOpen = Boolean(actClass);

    const handleActClassMenuOpen = (event) => {
        handleMenuClose();
        setActClass(event.currentTarget);
    };

    const handleMenuClose = () => {
        setActClass(null);
    };

    const handleOpenAddClass = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleLogOut = () => {
        AuthService.logOut();
        handleClose();
        history.push('/logIn');
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, AuthHeader()),
            body: JSON.stringify({
                name: name,
                email: email,
                userID: studentId_temp,
                classList: classList
            })
        };
        fetch(constant.api + constant.userPath + constant.updateProfilePath, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.isSuccess) {
                    const classList = result.userUpdate.classList;
                    AuthService.updateCurrentUser({
                        name: name,
                        email: email,
                        userID: studentId_temp,
                        classList: classList,
                    })
                    alert(result.message);
                    setStudentId(studentId_temp);
                } else {
                    setStudentId(currentUser.userID)
                    alert(result.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        history.push('/dashboard');
        handleClose()
    }
    
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeStudentId = (e) => {

        setStudentId_temp(e.target.value)
    }

    const menuId = "primary-search-account-menu";
    const renderActClassMenu = (
        <div>
            <Menu
                anchorEl={actClass}
                anchorOrigin={{
                    vertical: 40,
                    horizontal: 40,
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={isMenuActClassOpen}
                onClose={handleMenuClose}
            >
                <div className="menuProfile">
                    <MenuItem onClick={handleOpenAddClass}>Your Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>YOUR PROFILE</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can change your profile
                        </DialogContentText>
                        <TextField
                            required={true}
                            margin="dense"
                            id="name"
                            label="Full Name"
                            type="name"
                            value={name}
                            fullWidth
                            variant="standard"
                            onChange={onChangeName}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            fullWidth
                            variant="standard"
                            onChange={onChangeEmail}
                        />
                        {studentId === '' ? <TextField
                            margin="dense"
                            id="studentId"
                            label="Student ID"
                            type="studentId"
                            value={studentId_temp}
                            fullWidth
                            variant="standard"
                            onChange={onChangeStudentId}
                        /> :
                        <TextField
                            disabled
                            margin="dense"
                            id="studentId"
                            label="Student ID"
                            type="studentId"
                            value={studentId}
                            fullWidth
                            variant="standard"
                        /> }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUpdate}>Update</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>

            </Menu>
        </div>
    );

    return (
        <div>
            <IconButton className="btnActClass icon"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleActClassMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            {renderActClassMenu}
        </div>
    );
}