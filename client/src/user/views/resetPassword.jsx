import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {apiUrl} from "../../config/config";
import axios from 'axios';
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import {Link} from "react-router-dom";

class ResetPassword extends Component{
    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.state = {
            supplierId: null,
            password: "",
            confirmPassword: "",
            message : null
        };
    }

    async componentDidMount() {
        await axios.get(`${apiUrl}/supplier/resetSupplierPassword/${this.props.match.params.token}`)
        .then(res => {
            if (res.data.success && res.data.message === 'password reset link is valid'){
                this.setState({
                    supplierId : res.data.supplierId,
                    message : 'valid'
                })
            }
            else if (res.data.success === false){
                this.setState({
                    message : res.data.message
                })
            }
        })
        .catch(error => {
            alert(error)
        })
    }

    handleChange = event => {
        this.validator.showMessages();
        this.setState({
            [event.target.name] : event.target.value
        })
    };



    render() {
        return (
            <>
                {/* START SECTION BREADCRUMB */}
                <Breadcrumbs title="Reset Password"/>
                {/* END SECTION BREADCRUMB */}
                <div className="main_content">
                    {/* START LOGIN SECTION */}
                    <div className="login_register_wrap section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-md-10">
                                    <div className="login_wrap">
                                        <div className="padding_eight_all bg-white">
                                            <div className="heading_s1">
                                                {this.state.message && <p className="text-danger">{this.state.message}</p>}
                                                <h3>Reset Password</h3>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="Your Password"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.validator.message('password', this.state.password, 'required|min:8|max:20',{ className: 'text-danger' })}
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        name="confirmPassword"
                                                        placeholder="Confirm Password"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.validator.message('confirmPassword', this.state.confirmPassword, 'required|min:8|max:20',{ className: 'text-danger' })}
                                                </div>

                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-fill-out btn-block"
                                                        name="login"
                                                        onClick={this.onSave}
                                                    >
                                                        Reset Password
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="different_login">
                                                <span> or</span>
                                                <Link to={"/forgetPassword"} className="btn btn-fill-out btn-block" >
                                                    Resend Reset Link
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END LOGIN SECTION */}
                </div>

            </>
        );
    }
}

export default ResetPassword