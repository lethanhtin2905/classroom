import * as React from "react";
import logo from '../../images/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import './Header.css';
import { Link, useHistory } from 'react-router-dom'
import AuthService from '../../services/auth.service';
import {
    AppBar, Box,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuActClass from '../../Components/ActClassMenu/MenuActClass'
import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu'

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
                            <img width="40px" height="40px" src={logo} />
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
                            <MenuActClass ></MenuActClass>
                        </div>
                        <div className="menuProfileBtn">
                            <ProfileMenu ></ProfileMenu>
                        </div>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
