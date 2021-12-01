import authHeader from "../../services/auth-header"
import AuthService from "../../services/auth.service"
import "./GradeStructure.css";
import constant from '../../Utils/index'
import React from "react";
import styled, { css } from "styled-components";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'

const CardHeader = styled.div`
  font-weight: 500;
  text-align: start;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


const ListItem = ({ id, item, provided, snapshot }) => {

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(false)
    const [name, setName] = React.useState(item.name)
    const [grade, setGrade] = React.useState(item.grade)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenUpdate = () => {
        setUpdate(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false)
    };

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeGrade = (e) => {
        setGrade(e.target.value)
    }

    const handleDelete = (idGrade) => {
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure' + `/${idGrade}`, {
            method: 'DELETE',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, authHeader()),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                } else {
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        handleClose();
    }

    const handleUpdate = (idGrade) => {
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure' + `/${idGrade}`, {
            method: 'PUT',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, authHeader()),
            body: JSON.stringify({
                name: name,
                grade: grade
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                } else {
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        handleClose();
        
    }

    return (
        <div className="grade-structure__item">
            <DragItem
                ref={provided.innerRef}
                snapshot={snapshot}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <CardHeader>Name: {item.name}</CardHeader>
                <CardFooter>
                    <span>Grade: {item.grade}</span>
                    <Author>
                        <div className="edit-icon">
                            <EditIcon onClick={handleClickOpenUpdate}></EditIcon>
                            <Dialog open={update} onClose={handleClose}>
                                <DialogTitle>YOUR PROFILE</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        You can change your profile
                                    </DialogContentText>
                                    <TextField
                                        required={true}
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        type="name"
                                        value={name}
                                        fullWidth
                                        variant="standard"
                                        error={name === ""}
                                        helperText={name === "" ? 'Enter name' : ' '}
                                        onChange={onChangeName}
                                    />
                                    <TextField
                                        required={true}
                                        margin="dense"
                                        id="grade"
                                        label="Grade"
                                        type="grade"
                                        value={grade}
                                        fullWidth
                                        variant="standard"
                                        error={grade !== '0' && grade !== '1' && grade !== '2' && grade !== '3' && grade !== '4' && grade !== '5' && grade !== '6' && grade !== '7' && grade !== '8' && grade !== '9'
                                            && grade !== 0 && grade !== 1 && grade !== 2 && grade !== 3 && grade !== 4 && grade !== 5 && grade !== 6 && grade !== 7 && grade !== 8 && grade !== 9}
                                        helperText={grade === "" ? 'Enter grade' : ' '}
                                        onChange={onChangeGrade}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => handleUpdate(item._id)}>Update</Button>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className="delete-icon">
                            <DeleteIcon onClick={handleClickOpen}></DeleteIcon>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Delete this score
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to remove this point column from the grade structure
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => handleDelete(item._id)} autoFocus>Delete</Button>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Author>
                </CardFooter>
            </DragItem>
        </div>

    );
};

export default ListItem;
