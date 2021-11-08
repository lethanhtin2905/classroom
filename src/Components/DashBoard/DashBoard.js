import './DashBoard.css'
import { useHistory } from "react-router-dom";

import { useEffect, useState } from 'react';
import {
    Grid,
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@mui/material';

import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function Dashboard(props) {
    const history = useHistory();
    if (!AuthService.getCurrentUser()) {
        history.push('/logIn');
    }

    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch("http://localhost:3030/classes", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setClasses(result);
                    props.setIsLoading(false);
                },
                (error) => {
                    props.setIsLoading(false)
                }
            )

        return () => {
            
        }
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }} className='box'>
            <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {classes.map((cls, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index} >
                        <Card className='classItem' sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://p18cdn4static.sharpschool.com/UserFiles/Servers/Server_102145/Image/Our%20School/Academic%20Information/Grading%20Policy/1413463042370_wnp250.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" className="className">
                                    {cls.classID} - {cls.className}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="desc">
                                    {cls.desc}
                                </Typography>
                                <Typography className="teacher">
                                    Giảng viên: {cls.teacher}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" className="btn">SEE MORE</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;
