/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo-white.svg";
//auth
import AdminAuthService from "../../adminServices/adminAuthService";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          currentAdmin : undefined
        };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    const admin = AdminAuthService.getCurrentAdmin();
    this.setState({
      currentAdmin : admin
    })

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  sidebar = () => {
    // console.log(this.state.currentAdmin.role)
    if(this.state.currentAdmin){
      return this.props.routes.map((prop, key) => {
        if (prop.redirect) return null;
        if (prop.sidebar && prop.permission.indexOf(this.state.currentAdmin.role) > -1){
          return (
              <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? "active active-pro" : "")
                  }
                  key={key}
              >
                <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                >
                  <i className={"now-ui-icons " + prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
          );
        }
      })
    }
    else{
      return this.props.routes.map((prop, key) => {
        if (prop.redirect) return null;
        if (prop.sidebar && prop.permission.indexOf("All") > -1){
          return (
              <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? "active active-pro" : "")
                  }
                  key={key}
              >
                <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                >
                  <i className={"now-ui-icons " + prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
          );
        }
      })
    }

  };

  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-normal"
            target="_blank"
          >
            Creative Tim
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.sidebar()}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
