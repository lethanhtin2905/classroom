import { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
import './DashBoard.css'
import constant from '../../Utils'
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

function Dashboard(props) {
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
        history.push('/logIn');
    }

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // setClasses([]);
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
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
                                image="https://p18cdn4static.sharpschool.com/UserFiles/Servers/Server_102145/Image/Our%20School/Academic%20Information/Grading%20Policy/1413463042370_wnp250.jpg"
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