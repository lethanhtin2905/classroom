export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      // for Node.js Express back-end
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
}