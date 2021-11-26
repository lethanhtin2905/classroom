import * as React from 'react';
import { useEffect, useState } from 'react';
import "./Members.css";
import constant from '../../Utils'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import authHeader from '../../services/auth-header';
import Invited from '../Invited/Invited';
import AuthService from "../../services/auth.service"

export default function Members(props) {
    const currentUser = AuthService.getCurrentUser()
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const listUser = currentClass.userList;
    const [users, setUsers] = useState([]);
    let teachers = [];
    let students = []

    let checkCreateBy = false;
    if(currentClass.createBy._id === currentUser._id){
        checkCreateBy = true;
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api+constant.allClassPath+`/${currentClass._id}`+constant.userPath, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result);

                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )

        return () => {}
    },[])

    for (var i = 0; i < listUser.length; i++) {
        for (var j = 0; j < users.length; j++) {
            if (listUser[i]._id === users[j]._id) {
                if (listUser[i].role === true) {
                    teachers.push(users[j])
                } 
                if (listUser[i].role === false) {
                    students.push(users[j]);
                }
            }
        }
    }

    console.log(teachers, students)

    return (
        <div className="detail__members">
            <div className="detail__members_item">
                <div className="detail__memberWrapper">
                    <div className="detail__member_role">
                        <div className="role__content">
                            TEACHER
                        </div>
                        {checkCreateBy?<Invited currentClass = {currentClass} role={true}></Invited>:<div></div>}
                    </div>
                    <div className="line">
                        <hr />
                    </div>

                    <div className="detail__memberContent">
                        <div className="detail__wrapper1001">
                            {teachers.map((teacher, index) =>
                            (<ListItem alignItems="flex-start" key={index}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={teacher.name?teacher.name:"Noname"}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Email:
                                            </Typography>
                                            {teacher.email}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>))}
                        </div>

                    </div>
                </div>
                <div className="detail__memberWrapper">
                    <div className="detail__member_role">
                        <div className="role__content">
                            STUDENT
                        </div>
                        {checkCreateBy?<Invited currentClass = {currentClass} role={false}></Invited>:<div></div>}
                    </div>
                    <div className="line">
                        <hr />
                    </div>
                    <div className="detail__memberContent">
                        <div className="detail__wrapper1001">

                            {students.map((student, index) =>
                            (<ListItem alignItems="flex-start" key={index}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={student.name?student.name:"Noname"}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Email: 
                                            </Typography>
                                            {student.email}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}