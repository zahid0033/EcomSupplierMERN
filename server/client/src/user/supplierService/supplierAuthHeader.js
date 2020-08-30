export default function authHeader() {
    const supplier = JSON.parse(localStorage.getItem('supplier'));

    if (supplier && supplier.accessToken) {
        // return { 'x-access-token': admin.accessToken };       // for Node.js Express back-end
        return  supplier.accessToken ;       // for Node.js Express back-end
    } else {
        return {};
        // return <Redirect to="/login" />
    }
}