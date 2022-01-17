import './InvitedStudent.css';
import * as React from 'react';
import { useHistory } from 'react-router-dom'
import authHeader from '../../../Auth/AuthHeader';
import AuthService from '../../../Auth/AuthService';
import constant from '../../../Utils'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Menu,
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

export default function Invited(props) {

    const history = useHistory();
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        history.push('/logIn');
    }

    const {currentClass, role} = props;
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [addUser, setAddUser] = React.useState(null);

    const isAddClassDialog = Boolean(addUser);

    const handleMenuClose = () => {
        setAddUser(null);
    };

    const handleOpenAddClass = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleInvited = () => {
        if (!email) {
            
        } else {
            const data = {
                email: email,
                role: role
            }
            fetch(constant.api+constant.allClassPath+`/${currentClass._id}` +constant.invitedPath, {
                method: 'POST',
                headers: Object.assign({
                    'Content-Type': 'application/json'
                }, authHeader()),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    alert('You have successfully invited');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            handleClose();
        }
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const menuId = "primary-search-account-menu";
    const renderAddMemberDialog = (
        <Menu
            anchorEl={addUser}
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
            open={isAddClassDialog}
            onClose={handleMenuClose}
        >
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{role?"ADD TEACHER":"ADD STUDENT"}</DialogTitle>
                <DialogContent>
                    <h4>Invitation link: http://localhost:3000/{currentClass._id}</h4>
                    
                    <TextField
                        required={true}
                        margin="dense"
                        id="email"
                        label={role ? "Fill in the teacher's email" : "Fill in the student's email"}
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={onChangeEmail}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInvited}>{role?"Add Teacher":"Add Student"}</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Menu>
    );

    return (
        <div>
            <div className="btnAddUser">
                <AddIcon onClick={handleOpenAddClass}/>
            </div>
            {renderAddMemberDialog}
        </div>
    );
}