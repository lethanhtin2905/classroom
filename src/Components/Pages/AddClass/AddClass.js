import './AddClass.css'
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AuthHeader from '../../../Auth/AuthHeader';
import AuthService from '../../../Auth/AuthService';
import constant from '../../Utils';
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
import AddIcon from "@mui/icons-material/Add";

export default function MenuActClass() {
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        history.push('/logIn');
    }

    const [open, setOpen] = React.useState(false);
    const [className, setClassName] = React.useState('');
    const [classID, setClassID] = React.useState('');
    const [desc, setDesc] = React.useState('');
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

    const handleAddClass = () => {
        if (!classID) {
            alert("To add a class, please enter the Class ID");
        } else {
            const data = {
                classID: classID,
                className: className,
                desc: desc,
            }
            fetch(constant.api+constant.allClassPath, {
                method: 'POST',
                headers: Object.assign({
                    'Content-Type': 'application/json'
                }, AuthHeader()),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                        alert('Successfully added new class');
                        const newClass = {
                            _id: data.newClass._id,
                            role: true
                        }
                        const classList = currentUser.classList
                        classList.push(newClass);
                        AuthService.updateCurrentUser({
                            classList: classList
                        });
                    } else {
                        alert(data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            handleClose();
        }
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
            <MenuItem onClick={handleOpenAddClass}>Add Class</MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ADD CLASS</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill the information of class
                    </DialogContentText>
                    <TextField
                        required={true}
                        margin="dense"
                        id="id"
                        label="ClassID"
                        type="id"
                        fullWidth
                        variant="standard"
                        onChange={onChangeCode}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Class name"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={onChangeName}
                    />
                    <TextField
                        margin="dense"
                        id="des"
                        label="Description"
                        type="des"
                        fullWidth
                        variant="standard"
                        onChange={onChangeDesc}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClass}>Add Class</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <MenuItem onClick={handleMenuClose}>Join Class</MenuItem>
        </Menu>
    );

    return (
        <div>
            <IconButton className="BtnActClass icon"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleActClassMenuOpen}
                color="inherit"
            >
                <AddIcon />
            </IconButton>
            {renderActClassMenu}
        </div>
    );
}
