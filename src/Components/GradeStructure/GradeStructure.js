import authHeader from "../../services/auth-header"
import AuthService from "../../services/auth.service";
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
import TextField from '@mui/material/TextField'

const elements = [
    { id: "one", content: "one" },
    { id: "two", content: "two" },
    { id: "three", content: "three" },
    { id: "four", content: "four" }
];

export default function DragAndDropList() {
    const [gradeList, setGradeList] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');

    const { id } = useParams();

    useEffect(() => {
        setGradeList([]);

        const requestOptions1 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure', requestOptions1)
            .then(res => res.json())
            .then(
                (result) => {
                    setGradeList(result);
                    // setCreateBy(result.createBy);
                    // if (createBy._id == currentUser._id) {
                    //     setIsCreateBy(true)
                    // }
                    // setPosts(true);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )

        return () => {
        }
    }, [])

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

    }

    const onDragEnd = (result) => {
        const newItems = Array.from(gradeList);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setGradeList(newItems);
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
                                        />
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="btn-add">
                <Button variant="contained" onClick={handleClickOpen}>ADD</Button>
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

