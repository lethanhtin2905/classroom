import "./MembersOfClass.css";
import * as React from 'react';
import { useState } from 'react';
import AuthService from "../../../Auth/AuthService";
import InvitedStudent from '../InvitedStudent/InvitedStudent';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from '@mui/material';

export default function MembersOfClass(props) {
    const currentUser = AuthService.getCurrentUser()
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const listUser = currentClass.userList;
    const [users, setUsers] = useState(props.users);
    let teachers = [];
    let students = []

    let checkCreateBy = false;
    if (currentClass.createBy._id === currentUser._id) {
        checkCreateBy = true;
    }

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

    return (
        <div className="detail__members">
            <div className="detail__members_item">
                <div className="detail__memberWrapper">
                    <div className="detail__member_role">
                        <div className="role__content">
                            TEACHER
                        </div>
                        {checkCreateBy ? <InvitedStudent currentClass={currentClass} role={true}></InvitedStudent> : <div></div>}
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
                                    primary={teacher.name ? teacher.name : "Noname"}
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
                        {checkCreateBy ? <InvitedStudent currentClass={currentClass} role={false}></InvitedStudent> : <div></div>}
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
                                    primary={student.name ? student.name : "Noname"}
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