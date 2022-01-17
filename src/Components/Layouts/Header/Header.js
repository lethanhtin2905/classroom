import './Header.css';
import logo from '../../../Images/logo.png';
import * as React from "react";
import { Link, useHistory } from 'react-router-dom'
import AuthService from '../../../Auth/AuthService';
import AddClass from '../../Pages/AddClass/AddClass';
import ProfileUser from '../../Pages/ProfileUser/ProfileUser';
import {
    AppBar, Box,
    Toolbar,
    Typography,
} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
        fontSize: '30px',
        fontFamily: 'ThirstyScript',
        fontWeight: 'bold',
        color: '#ffffff',
        '&:hover': {
            textDecoration: 'none'
        }
    },
}))

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
        history.push('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        <Link to="/dashboard" className='logo'>
                            <img width="40px" height="40px" src='../../../Images/logo.png' />
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "none", sm: "block" } }}
                    >
                        <Link to="/dashboard" className={classes.logo}>
                            GradeBook
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <span className="userName">Hello {currentUser ? currentUser.name : ""}</span>
                        <div className="menuClassBtn">
                            <AddClass ></AddClass>
                        </div>
                        <div className="menuProfileBtn">
                            <ProfileUser></ProfileUser>
                        </div>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
