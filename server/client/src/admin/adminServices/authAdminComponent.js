import React,{Component} from "react";
import adminAuthService from "./adminAuthService";
import { Redirect } from 'react-router-dom';
export default function AuthAdminComponent(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            const jwt =  adminAuthService.getCurrentAdmin();
            if (!jwt){
                // this.props.history.push('/login');
                this.setState({ loading: false, redirect: true });
            }else{
                this.setState({ loading: false });
            }

        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/admin/login" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}