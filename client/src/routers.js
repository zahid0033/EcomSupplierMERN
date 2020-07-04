import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import AdminLayout from "./admin/layouts/Admin";
import UserLayout from "./user/layouts/userLayout";

// import Login from "./admin/views/Login";
// import AuthAdminComponent from "./services/authAdminComponent";

class Routes extends Component {
    render() {
        return (
            <Switch>
                {/*<AuthAdminComponent>*/}
                {/*    <Route path="/admin" render={props => <AdminLayout {...props} />} />*/}
                {/*</AuthAdminComponent>*/}
                {/*<Route path="/login" component={Login} />} />*/}
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Route path="/"  render={props => <UserLayout {...props} />} />
                {/*<Redirect from="/"  to="/home" />*/}
                {/*<Redirect from="/" to="/admin/dashboard" />*/}
            </Switch>
        )
    }
}

export default Routes;