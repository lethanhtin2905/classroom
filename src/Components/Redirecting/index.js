import React, { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

// Service
import AuthService from '../../services/auth.service';

function Redirecting() {
    const { authType, ID } = useParams();
    const history = useHistory();
    useEffect(() => {
        if (authType === 'google') {
            AuthService.logInWithGoogle(ID).then(result => {
                if (result.isSuccess) {
                    history.push('/dashboard');
                } else {
                    console.log(result)
                    history.push('/logIn');
                }
            }, (error) => {
                if (error) {
                    console.log(error)
                    history.push('/logIn');
                }
            })
        } else if (authType === 'facebook') {
            AuthService.logInWithFacebook(ID).then(result => {
                if (result.isSuccess) {
                    history.push('/dashboard');
                } else {
                    console.log(result)
                    history.push('/logIn');
                }
            }, (error) => {
                if (error) {
                    console.log(error)
                    history.push('/logIn');
                }
            })
        }
    })

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default Redirecting;
