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
            email: "",
            password: "",
            confirmPassword: "",
            message : null,
            tokenStatus : false
        };
    }

    async componentDidMount() {
        await axios.get(`${apiUrl}/supplier/resetSupplierPassword/${this.props.match.params.token}`)
        .then(res => {
            if (res.data.success && res.data.message === 'password reset link is valid'){
                this.setState({
                    email : res.data.supplierMail,
                    tokenStatus : true
                });
            }
            else if (res.data.success === false){
                this.setState({
                    message : res.data.message,
                    tokenStatus : false
                })
            }
        })
        .catch(error => {
            this.setState({
                message : error.response.data.message,
                tokenStatus : false
            })
        })
    }

    handleChange = event => {
        this.validator.showMessages();
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    updatePassword = async (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("You password doesnt match")
        }
        const dataPost = {
            email: this.state.email,
            password: this.state.password
        };
        await axios.post(`${apiUrl}/supplier/updatePasswordViaEmail`,dataPost)
                .then(res => {
                    if (res.data.success){
                        this.setState({
                            password: '',
                            confirmPassword: '',
                            message : res.data.message
                        })
                    }
                })
    };

    render() {
        const {supplierId,password,confirmPassword,message,tokenStatus} = this.state;
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
                                                {this.state.message && <p className="alert alert-primary">{this.state.message}</p>}
                                                <h3>Reset Password</h3>
                                            </div>
                                            {tokenStatus &&
                                                <form>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            required
                                                            className="form-control"
                                                            name="password"
                                                            placeholder="Your Password"
                                                            value={password}
                                                            onChange={this.handleChange}
                                                        />
                                                        {this.validator.message('password', this.state.password, 'required|min:8|max:20',{ className: 'text-danger' })}
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            required
                                                            className="form-control"
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            value={confirmPassword}
                                                            onChange={this.handleChange}
                                                        />
                                                        {this.validator.message('confirmPassword', this.state.confirmPassword, 'required|min:8|max:20',{ className: 'text-danger' })}
                                                    </div>

                                                    <div className="form-group">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-fill-out btn-block"
                                                            onClick={this.updatePassword}
                                                        >
                                                            Reset Password
                                                        </button>
                                                    </div>
                                                </form>
                                            }

                                            <div className="different_login">
                                                {tokenStatus && <span> or</span>  }
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