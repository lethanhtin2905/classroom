import * as React from 'react';
import { useEffect, useState } from 'react';
import "./Members.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import authHeader from '../../services/auth-header';

export default function Members(props) {
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const [users, setUsers] = useState([]);
    console.log(currentClass);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(`http://localhost:3030/classes/${currentClass._id}/user`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setCurrentClass(result);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )

        return () => {

        }
    }, [])
    return (
        <div className="detail__members">
            <div className="detail__members_item">
                <div className="detail__memberWrapper">
                    <div className="detail__member_role">
                        <div className="role__content">
                            TEACHER
                        </div>
                        <div className="btnAddUser">
                            <AddIcon />
                        </div>
                    </div>
                    <div className="line">
                        <hr/>
                    </div>
                    
                    <div className="detail__memberContent">
                        <div className="detail__wrapper1001">
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </div>
                    </div>
                </div>
                <div className="detail__memberWrapper">
                    <div className="detail__member_role">
                        <div className="role__content">
                            STUDENT
                        </div>
                        <div className="btnAddUser">
                            <AddIcon />
                        </div>
                    </div>
                    <div className="line">
                        <hr/>
                    </div>
                    <div className="detail__memberContent">
                        <div className="detail__wrapper1001">
                            
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
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
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}