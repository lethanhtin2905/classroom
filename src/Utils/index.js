const api = 'https://classroom-api-18120595.herokuapp.com';
// const api = 'http://localhost:3030'
// const api = 'https://midtern-18120595-api.herokuapp.com'

// Class
const allClassPath = '/classes';

// User
const userPath = '/users';
const logInPath = '/logIn';
const signUpPath = '/signUp';
const invitedPath = '/invited';
const authGooglePath = '/auth/google'
const logInWithGoogle = '/logInWithGoogle';
const authFbPath = '/auth/facebook'
const logInWithFacebook = '/logInWithFacebook';
const updateProfilePath = '/updateProfile'

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    api,
    allClassPath,
    userPath,
    logInPath,
    signUpPath,
    authGooglePath,
    logInWithGoogle,
    authFbPath,
    logInWithFacebook,
    updateProfilePath,
    invitedPath,
    // 
    queryParams
}