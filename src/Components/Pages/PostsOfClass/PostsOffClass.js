import "./PostsOfClass.css";
import React, { useState } from "react";
import {Link} from 'react-router-dom';
import AuthService from "../../../Auth/AuthService";
import { 
    Avatar, 
    Button, 
    TextField 
} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';

export default function PostsOfClass(props) {
    const currentUser = AuthService.getCurrentUser()

    const currentClass = props.currentClass;
    const gradeStructure = props.gradeStructure;

    let checkCreateBy = false;
    if (currentClass.createBy._id === currentUser._id) {
        checkCreateBy = true;
    }

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    // const [image, setImage] = useState(null);

    // const handleChange = (e) => {
    //     if (e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    // };

    const handleUpload = () => { }

    return (
        < div className="detail__announce" >

            <div className="detail__status">
                <div className="link-invite">
                    <p>Link invite:</p>
                    <p className="detail__subText">{currentClass.classID}</p>
                </div>
                <div className="grade-structure">
                <div className = "structure-content">
                <div className = "structure-content__text">GRADE STRUCTURE</div>
                    <div className="structure-content__icon">
                        {checkCreateBy?
                            <Link to={`/${currentClass._id}/grade-structure`} className="structure-content__icon">
                                <EditIcon> </EditIcon>
                            </Link>
                        :<div></div>}
                    </div>
                </div>
                    {gradeStructure.length ? (gradeStructure.map((grade, index) => (
                        <p key={index} className="grade__detail">{grade.name}: {grade.grade} point</p>)))
                    :(<p className="grade__detail"> none </p>)}

                </div>
            </div>

            <div className="detail__announcements">
                <div className="detail__announcementsWrapper">
                    <div className="detail__ancContent">
                        {showInput ? (
                            <div className="detail__form">
                                <TextField
                                    id="filled-multiline-flexible"
                                    multiline
                                    label="Announce Something to class"
                                    variant="filled"
                                    value={inputValue}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <div className="detail__buttons">
                                    <input
                                        // onChange={handleChange}
                                        variant="outlined"
                                        color="primary"
                                        type="file"
                                    />

                                    <div>
                                        <Button onClick={() => setShowInput(false)}>
                                            Cancel
                                        </Button>

                                        <Button
                                            onClick={handleUpload}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="detail__wrapper100"
                                onClick={() => setShowInput(true)}
                            >
                                <Avatar />
                                <div>Announce Something to class</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="detail__announcementsWrapper">
                    <div className="detail__ancContent">
                        {showInput ? (
                            <div className="detail__form">
                                <TextField
                                    id="filled-multiline-flexible"
                                    multiline
                                    label="Announce Something to class"
                                    variant="filled"
                                    value={inputValue}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <div className="detail__buttons">
                                    <input
                                        // onChange={handleChange}
                                        variant="outlined"
                                        color="primary"
                                        type="file"
                                    />

                                    <div>
                                        <Button onClick={() => setShowInput(false)}>
                                            Cancel
                                        </Button>

                                        <Button
                                            onClick={handleUpload}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="detail__wrapper100"
                                onClick={() => setShowInput(true)}
                            >
                                <Avatar />
                                <div>Announce Something to class</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}