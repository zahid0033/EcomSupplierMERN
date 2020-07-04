import React,{Component} from "react";

import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import {Redirect, Route, Switch} from "react-router-dom";
import {userRoutes} from "../../routes";

class Layout extends Component {

    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user") {
                return (
                    <Route
                        path={prop.path}
                        exact={true}
                        render={props => (
                            <prop.component
                                {...props}
                            />
                        )}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    componentDidMount() {

        if (this.props.match.path === "/"){
            // Favicon Icon
            require("../assets/images/favicon.png");
            // Animation CSS
            require("../assets/css/animate.css");
            // Latest Bootstrap min CSS
            require( "bootstrap/dist/css/bootstrap.css");
            // require("../assets/bootstrap/css/bootstrap.min.css");
            // Icon Font CSS
            require ("../assets/css/all.min.css");
            require ("../assets/css/ionicons.min.css");
            require ("../assets/css/themify-icons.css");
            require ("../assets/css/linearicons.css");
            require ("../assets/css/flaticon.css");
            require ("../assets/css/simple-line-icons.css");
            // Magnific Popup CSS
            require("../assets/css/magnific-popup.css");
            // Slick CSS
            // require ("../assets/css/slick.css");
            // require ("../assets/css/slick-theme.css");

            // Style CSS
            require("../assets/css/style.css");
            require("../assets/css/responsive.css");
            // custom css
            require("../assets/css/custom.css");

            // this.props.history.push("/home");
        }
    }

    render() {
        return (
            <div>

                <Navbar {...this.props}/>
                <Switch>
                    {this.getRoutes(userRoutes)}
                    <Redirect from="/" to="/home" />
                </Switch>

                    {/*{this.props.children}*/}
                <Footer/>
            </div>

        )
    }


}

export default Layout;