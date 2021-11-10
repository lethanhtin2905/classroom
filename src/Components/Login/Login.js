import * as React from 'react';
import './Login.css'
import { useState } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

// Constant && Services
import AuthService from '../../services/auth.service';
import constant from '../../Utils/';

const useStyles = makeStyles((theme) => ({
    googleBtn: {
        margin: theme.spacing(0, 0, 2, 0),
        border: '1.5px solid #dd4b39',
        color: '#dd4b39'
    },
    facebookBtn: {
        margin: theme.spacing(0, 0, 10, 20),
        left: '100px !important',
        border: '1.5px solid #dd4b39',
        color: '#dd4b39'
    },
    googleIcon: {
        marginRight: '10px'
    },
    facebookIcon: {
        fontSize: '24px !important'
    },
    anchor: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));
const theme = createTheme();

export default function Login(props) {
    const history = useHistory();
    if (AuthService.getCurrentUser()) {
        history.push('/dashboard');
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrMsg] = useState('');
    const classes = useStyles();

    function handleUsernameChange(evt) {
        setUsername(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    const handleLogIn = (event) => {
        event.preventDefault()
        if (!username || !password) {
            return;
        }
        props.setIsLoading(true);
        AuthService.logIn(username, password).then(result => {
            if (result.isSuccess) {
                history.push('/dashboard');
            } else {
                setUsername("");
                setPassword("");
                setErrMsg(result.message);
            }
            props.setIsLoading(false);
        }, (error) => {
            if (error) {
                props.setIsLoading(false);
            }
        });
    };

    const responseGoogle = (response) => {
        props.setIsLoading(true);
        AuthService.logInWithGoogle(response.tokenId).then(result => {
            if (result.isSuccess) {
                history.push('/dashboard');
            } else {
                setUsername("");
                setPassword("");
                setErrMsg(result.message);
            }
            props.setIsLoading(false);
        }, (error) => {
            if (error) {
                props.setIsLoading(false);
            }
        });
    }

    const responseFacebook = (response) => {
        props.setIsLoading(true);
        AuthService.logInWithFacebook(response.accessToken, response.userID).then(result => {
            if (result.isSuccess) {
                history.push('/dashboard');
            } else {
                setUsername("");
                setPassword("");
                setErrMsg(result.message);
            }
            props.setIsLoading(false);
        }, (error) => {
            if (error) {
                props.setIsLoading(false);
            }
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://3.files.edl.io/168b/18/11/02/153249-6a52a1ae-6e6a-46fc-96c7-e5f7a3fb6dea.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form" noValidate onSubmit={(e) => handleLogIn(e)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                error={username === ""}
                                helperText={username === "" ? 'Enter Username' : ' '}
                                onChange={(evt) => handleUsernameChange(evt)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                error={password === ""}
                                helperText={password === "" ? 'Enter password' : ' '}
                                onChange={(evt) => handlePasswordChange(evt)}
                            />
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        {"Forgot password?"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signUp" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <GoogleLogin
                                clientId="456562452797-8l37bdgcv5uuacglkgjpkobpvs6nelli.apps.googleusercontent.com"
                                buttonText="SIGN IN WITH GOOGLE"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />,
                            <FacebookLogin
                                appId="1049530302499866"
                                autoLoad={false}
                                // onClick={componentClicked}
                                callback={responseFacebook}
                            />


                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}