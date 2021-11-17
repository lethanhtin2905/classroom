import * as React from 'react';
import { useHistory } from 'react-router-dom'
import './MenuActClass.css'
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
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

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
            alert("Để thêm lớp học, vui lòng nhập mã lớp học");
        } else {
            const data = {
                classID: classID,
                className: className,
                desc: desc,
            }
            fetch('http://localhost:3030/classes', {
                method: 'POST',
                headers: Object.assign({
                    'Content-Type': 'application/json'
                }, authHeader()),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    const newClass = {
                        _id: data.newClass._id,
                        role: true
                    }
                    const classList = currentUser.classList
                    classList.push(newClass);
                    AuthService.updateCurrentUser({
                        classList: classList
                        })
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
            <IconButton className="BtnActClass"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleActClassMenuOpen}
                color="inherit"
                className="icon"
            >
                <AddIcon />
            </IconButton>
            {renderActClassMenu}
        </div>
    );
}
