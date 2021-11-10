import * as React from 'react';
import { useHistory } from 'react-router';
import AuthService from '../../services/auth.service';
import './ProfileMenu.css'
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

export default function ProfileMenu() {
    const history = useHistory();
    const user = AuthService.getCurrentUser();
    if (!user) {
        history.push('/logIn');
    }
    const [open, setOpen] = React.useState(false);
    const [className, setClassName] = React.useState('');
    const [classID, setClassID] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [teacher, setTeacher] = React.useState('');
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

    const handleUpdate = () => {
        const data = {
            classID: classID,
            className: className,
            desc: desc,
            teacher: teacher,
        }
        fetch('http://localhost:3030/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                alert("Update successful");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        handleClose();

    }

    const onChangeCode = (e) => {
        setClassID(e.target.value)
    }

    const onChangeName = (e) => {
        setClassName(e.target.value)
    }

    const onChangeDesc = (e) => {
        setDesc(e.target.value)
    }

    const menuId = "primary-search-account-menu";
    const renderActClassMenu = (
        <div className="menuProfile">
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
                <div >
                    <MenuItem onClick={handleOpenAddClass}>Log Out</MenuItem>
                    <MenuItem onClick={handleMenuClose}>About You</MenuItem>
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
                            label="Mã lớp học"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={onChangeCode}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Tên lớp học"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={onChangeName}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Mô tả"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={onChangeDesc}
                        />
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
            <IconButton className="btnActClass"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleActClassMenuOpen}
                color="inherit"
                className="icon"
            >
                <AccountCircle />
            </IconButton>
            {renderActClassMenu}
        </div>
    );
}
