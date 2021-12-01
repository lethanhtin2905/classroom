import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import authHeader from "../../services/auth-header"
import AuthService from "../../services/auth.service"
import "./ClassDetail.css";
import constant from '../../Utils'
import { Avatar, Button, TextField } from "@material-ui/core";
import Members from "../Members/Members";
import Posts from "../Posts/Posts";


export default function ClassDetail(props) {
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser()

    if (!currentUser) {
        history.push('/logIn');
    }

    const { id } = useParams();
    const [currentClass, setCurrentClass] = useState({});
    const [createBy, setCreateBy] = useState({});
    const [posts, setPosts] = useState(false)
    const [members, setMembers] = useState(false)
    const [grades, setGrades] = useState(false)
    const [users, setUsers] = useState([])
    const [gradeList, setGradeList] = useState([]);

    // let
    const [isCreateBy, setIsCreateBy] = useState()

    useEffect(() => {
        // setCurrentClass({})
        // setUsers([]);
        // setIsCreateBy(false);
        // setGradeList([])
        const requestOptions1 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${id}`, requestOptions1)
            .then(res => res.json())
            .then(
                (result) => {
                    setCurrentClass(result);
                    setCreateBy(result.createBy);
                    if (createBy._id == currentUser._id) {
                        setIsCreateBy(true)
                    }
                    setPosts(true);
                    props.setIsLoading(false);
                },
                (error) => {
                    props.setIsLoading(false)
                }
            )

        const requestOptions2 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${id}` + constant.userPath, requestOptions2)
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result);
                },
                (error) => {
                }
            )
            setGradeList([]);

        const requestOptions3 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${id}` + '/grade-structure', requestOptions3)
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
        return () => { }
    }, [])

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
                {/* <Posts currentClass={currentClass}> </Posts> */}
                {posts ? <Posts currentClass={currentClass} gradeStructure = {gradeList}> </Posts> : <div></div>}
                {members ? <Members currentClass={currentClass} users={users}> </Members> : <div></div>}
            </div>
        </div>
    );
};
