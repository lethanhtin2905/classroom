import './DashBoard.css';
import dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AuthHeader from '../../../Auth/AuthHeader';
import AuthService from '../../..AuthHeader/Auth/AuthService';
import constant from '../../../Utils'
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

require('dotenv').config();

function Dashboard(props) {
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
        history.push('/logIn');
    }

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: AuthHeader(),
        };
        fetch(constant.api+constant.allClassPath, requestOptions)
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
    }, [classes])

    return (
        <Box sx={{ flexGrow: 1 }} className='box'>
            
            <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                
                {classes.map((cls, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index} >
                        <Card className='classItem' sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                height="210"
                                width="250"
                                image = {process.env.REACT_APP_IMAGE_CARD}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" className="className">
                                    <Link to="/" className="link">
                                        {cls.classID} - {cls.className}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="desc">
                                    {cls.desc}
                                </Typography>
                                <Typography className="teacher">
                                    Create By: {cls.createBy.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to = {`/${cls._id}`} className="link">
                                    <Button size="small" className="btn">SEE MORE</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;