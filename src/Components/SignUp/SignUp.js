import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Paper,
    FormHelperText,
    Box
} from '@mui/material';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Constant && Services
import AuthService from '../../services/auth.service';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
    formMessageSuccess: {
        textAlign: 'center',
        fontSize: '1.1em',
        color: '#4BB543'
    },
    formMessageFail: {
        textAlign: 'center',
        fontSize: '1.1em',
        color: '#ff1500'
    },
}));

const theme = createTheme();

export default function SignUp(props) {
    const history = useHistory();
    if (AuthService.getCurrentUser()) {
        history.push('/dashboard');
    }
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userID, setUserID] = useState('');
    const [repassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorMsg, setErrMsg] = useState('');

    function handleUsernameChange(evt) {
        setUsername(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleRePasswordChange(evt) {
        setRePassword(evt.target.value);
    }
    function handleUserIDChange(evt) {
        setUserID(evt.target.value);
    }
    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    function handleRoleChange(evt) {
        setRole(evt.target.value);
    }
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handleSignUp(event) {
        event.preventDefault()
        if (!username || !password || !repassword || (password !== repassword) || !name || !email) {
            return;
        }
        props.setIsLoading(true);
        const fetch = AuthService.signUp(username, password, name, email, userID, role).then(result => {
            if (result.isSuccess) {
                history.push('/logIn');
            } else {
                setIsSuccess(result.isSuccess);
                // Error message
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
                            <CreateIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            SIGN UP
                        </Typography>

                        <Box component="form" noValidate onSubmit={(e) => handleSignUp(e)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User name"
                                name="username"
                                autoComplete="Username"
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="repassword"
                                label="Confirm Password"
                                type="password"
                                id="re-password"
                                autoComplete="re-password"
                                value={repassword}
                                error={(password === "" || repassword === "" || password !== repassword)}
                                helperText={(password === "" || repassword === "" || password !== repassword) ? 'Confirm Password incorrect' : ' '}
                                onChange={(evt) => handleRePasswordChange(evt)}
                            />
                            <TextField
                                margin="normal"
                                autoComplete="userID"
                                name="userID"
                                required
                                fullWidth
                                id="userID"
                                label="userID"
                                value={userID}
                                error={userID === ""}
                                helperText={userID === "" ? 'Enter user ID' : ' '}
                                onChange={(evt) => handleUserIDChange(evt)}
                            />
                            <TextField
                                margin="normal"
                                autoComplete="fullName"
                                name="fullName"
                                required
                                fullWidth
                                id="fullName"
                                label="Full name"
                                value={name}
                                error={name === ""}
                                helperText={name === "" ? 'Enter Name' : ' '}
                                onChange={(evt) => handleNameChange(evt)}
                            />
                            <TextField
                                autoComplete="email"
                                name="email"
                                required
                                type="email"
                                fullWidth
                                id="email"
                                label="Email"
                                value={email}
                                error={email === ""}
                                helperText={email === "" ? 'Enter Email' : ' '}
                                onChange={(evt) => handleEmailChange(evt)}
                            />
                            <TextField
                                margin="normal"
                                autoComplete="role"
                                name="role"
                                required
                                fullWidth
                                id="role"
                                label="Teacher/Student"
                                value={role}
                                error={role === ""}
                                helperText={role === "" ? 'Enter you role' : ' '}
                                onChange={(evt) => handleRoleChange(evt)}
                            />
                            <FormHelperText className={(isSuccess) ? classes.formMessageSuccess : classes.formMessageFail} error={!isSuccess}>
                                {errorMsg}
                            </FormHelperText>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/logIn" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
