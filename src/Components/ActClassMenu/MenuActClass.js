import * as React from 'react';
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

export default function MenuActClass() {

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

    const handleAddClass = () => {
        if (!classID) {
            alert("Để thêm lớp học, vui long nhập mã lớp học");
        } else {
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
                    console.log('Success:', data);
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

    const onChangeTeacher = (e) => {
        setTeacher(e.target.value)
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
                <DialogTitle>THÊM LỚP HỌC</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập thông tin lớp học
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
                    <TextField
                        margin="dense"
                        id="name"
                        label="Giảng viên"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={onChangeTeacher}
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
