import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory, Link } from 'react-router-dom'
import "./ClassDetail.css";
import constant from '../../Utils'
import authHeader from "../../services/auth-header"
import AuthService from "../../services/auth.service"
import Members from "../Members/Members";

export default function ClassDetail(props) {
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser()

    if (!currentUser) {
        history.push('/logIn');
    }

    const { id } = useParams();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [currentClass, setCurrentClass] = useState({});
    const [createBy, setCreateBy] = useState({});
    const [posts, setPosts] = useState(true)
    const [members, setMembers] = useState(false)
    const [grades, setGrades] = useState(false)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => { }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api+constant.allClassPath`${id}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setCurrentClass(result);
                    setCreateBy(result.createBy);
                    props.setIsLoading(false);
                },
                (error) => {
                    props.setIsLoading(false)
                }
            )

        return () => {}
    },[])

    return (
        <div className="detail">
            <div className="detail__wrapper">
                <div className="detail__content">
                    <div className="detail__wrapper1">
                        <div className="detail__bgImage">
                            <div className="detail__emptyStyles" />
                        </div>
                        <div className="detail__text">
                            <h1 className="detail__name detail__overflow">
                                {currentClass.className}
                            </h1>
                            <div className="detail__desc detail__overflow">
                                {currentClass.desc}
                            </div>
                            <div className="detail__wrapper2">
                                <em className="detail__code">Link invite: </em>
                                <span className="detail__id">http://localhost:3000/{currentClass._id}</span>
                            </div>
                            <div className="detail__wrapper2 detail__id">
                                Create by: {createBy.name}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detail_menu">
                    <span>
                        <button className={posts ? "detail_menu_item isActive" : "detail_menu_item"}
                            onClick={() => { setPosts(true); setGrades(false); setMembers(false) }}>
                            POSTS
                        </button>
                    </span>
                    <span>
                        <button className={members ? "detail_menu_item isActive" : "detail_menu_item"}
                            onClick={() => { setPosts(false); setGrades(false); setMembers(true) }}>
                            MEMBERS
                        </button>
                    </span>
                    <span>
                        <button className={grades ? "detail_menu_item isActive" : "detail_menu_item"}
                            onClick={() => { setPosts(false); setGrades(true); setMembers(false) }}>
                            GRADES
                        </button>
                    </span>
                </div>

                {/* Posts in class */}
                {posts?(<div className="detail__announce">

                    <div className="detail__status">
                        <p>Class Code</p>
                        <p className="detail__subText">{currentClass.classID}</p>
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
                                                onChange={handleChange}
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
                        {/* <Announcment classData={classData} /> */}
                    </div>
                </div>):<div></div>}

                {/* Members of class */}

                {members?<Members currentClass={currentClass}> </Members>:<div></div>}
            </div>
        </div>
    );
};
