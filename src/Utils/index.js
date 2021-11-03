//const api = 'https://shrouded-bastion-84248.herokuapp.com';
 const api = 'http://localhost:3030';

// Class
 const allClassPath = '/classes';

// User
 const userPath = '/users';
 const logInPath = '/logIn';
 const signUpPath = '/signUp';

 function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    api,
    // Classes
    allClassPath,
    // User
    userPath,
    logInPath,
    signUpPath,
    // 
    queryParams
}