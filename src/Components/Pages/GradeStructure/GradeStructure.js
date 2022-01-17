import { Link } from 'react-router-dom';
import authHeader from "../../Auth/AuthHeader"
import AuthService from "../../Auth/AuthService";
import "./GradeStructure.css";
import constant from '../../Utils/index'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from "./ListGradeItem";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function DragAndDropList() {
    const [gradeList, setGradeList] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const requestOptions1 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure', requestOptions1)
            .then(res => res.json())
            .then(
                (result) => {
                    setGradeList(result);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )

        // return () => {
        //     // setGradeList([]);
        // }
    }, [gradeList])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeGrade = (e) => {
        setGrade(e.target.value);
    };

    const handleAddGrade = () => {
        if (!name || !grade) {
            alert("To add a class, please enter the name and grade");
        } else {
            const data = {
                name: name,
                grade: grade
            }
            fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure', {
                method: 'POST',
                headers: Object.assign({
                    'Content-Type': 'application/json'
                }, authHeader()),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                        alert('Successfully added new grade');
                    } else {
                        alert('Failed to added new grade');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            handleClose();
        }
    }

    const onDragEnd = (result) => {
        console.log(result)
        const newItems = Array.from(gradeList);
        // setGradeList(newItems);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure/arrange', {
            method: 'POST',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, authHeader()),
            body: JSON.stringify({
                newItems: newItems
            }),
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

        const requestOptions1 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure', requestOptions1)
            .then(res => res.json())
            .then(
                (result) => {
                    setGradeList(result);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )
        console.log(gradeList)
    };


    return (
        <div className="grade-structure__container">
            <div className="grade-structure__content">
                GRADE STRUCTURE
            </div>

            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {gradeList.map((grade, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <ListItem
                                            provided={provided}
                                            snapshot={snapshot}
                                            item={grade}
                                            id={id}>

                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="btn-add">
                <span className="btnBack">
                    <Button variant="outlined" >
                        <Link to={`/${id}`} className="text-link">
                            BACK TO CLASS
                        </Link>
                    </Button>
                </span>
                <span className="btnAdd">
                    <Button variant="contained" onClick={handleClickOpen}>ADD ASSIGNMENT</Button>
                </span>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        ADD SCORE
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to remove this point column from the grade structure
                        </DialogContentText>
                        <TextField
                            required={true}
                            margin="dense"
                            id="name"
                            label="Name"
                            type="name"
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
                            fullWidth
                            variant="standard"
                            error={grade !== '0' && grade !== '1' && grade !== '2' && grade !== '3' && grade !== '4' && grade !== '5' && grade !== '6' && grade !== '7' && grade !== '8' && grade !== '9'
                                && grade !== 0 && grade !== 1 && grade !== 2 && grade !== 3 && grade !== 4 && grade !== 5 && grade !== 6 && grade !== 7 && grade !== 8 && grade !== 9}
                            helperText={grade === "" ? 'Enter grade' : ' '}
                            onChange={onChangeGrade}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddGrade}>ADD</Button>
                        <Button onClick={handleClose} autoFocus>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
}

