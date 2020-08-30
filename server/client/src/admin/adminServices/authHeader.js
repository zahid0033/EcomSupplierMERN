export default function authHeader() {
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (admin && admin.accessToken) {
        // return { 'x-access-token': admin.accessToken };       // for Node.js Express back-end
        return  admin.accessToken ;       // for Node.js Express back-end
    } else {
        return {};
        // return <Redirect to="/login" />
    }
}