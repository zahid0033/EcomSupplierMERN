import React,{Component} from "react";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import {Link} from "react-router-dom";
import SupplierAuthService from "../supplierService/supplierAuthService";
// sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//validation
import SimpleReactValidator from 'simple-react-validator';

class SupplierSignin extends Component{
    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }
    state = {
        email: "",
        password : "",
        isLoggedIn : false
    };

    componentDidMount = async() => {
        const supplier = SupplierAuthService.getCurrentSupplier();

        if (supplier !== null && supplier.accessToken){
            await this.setState({
                isLoggedIn : true
            });
        }

    };

    handleChange = event => {
        this.validator.showMessages();
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    onSave = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()){
            const dataPost = {
                email : this.state.email,
                password : this.state.password
            };

            await SupplierAuthService.supplierSignin(dataPost)
                .then(response => {
                    if (response.success === true) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.props.history.push("/supplier/profile");
                        window.location.reload();
                    }
                    else {
                        alert("hey " + response.data.message)
                    }
                })
                .catch(error=>{
                    alert("Error 34 "+error.status+ error.code)
                });
        }
        else{
            this.validator.showMessages();
        }

    };

    render() {
        if (this.state.isLoggedIn){
            this.props.history.push("/supplier/profile");
        }
        return (
            <>
                {/* START SECTION BREADCRUMB */}
                <Breadcrumbs title="Login"/>
                {/* END SECTION BREADCRUMB */}
                {/* START MAIN CONTENT */}
                <div className="main_content">
                    {/* START LOGIN SECTION */}
                    <div className="login_register_wrap section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-md-10">
                                    <div className="login_wrap">
                                        <div className="padding_eight_all bg-white">
                                            <div className="heading_s1">
                                                <h3>Login</h3>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Your Email"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.validator.message('email', this.state.email, 'required|email',{ className: 'text-danger' })}
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        required
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.validator.message('password', this.state.password, 'required',{ className: 'text-danger' })}
                                                </div>
                                                <div className="login_footer form-group">
                                                    <div className="chek-form">
                                                        <div className="custome-checkbox">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                name="checkbox"
                                                                id="exampleCheckbox1"
                                                                defaultValue
                                                            />

                                                        </div>
                                                    </div>
                                                    <a href="/#">Forgot password?</a>
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-fill-out btn-block"
                                                        name="login"
                                                        onClick={this.onSave}
                                                    >
                                                        Log in
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="different_login">
                                                <span> or</span>
                                            </div>

                                            <div className="form-note text-center">
                                                Don't Have an Account? <Link to={"/supplier/signup"}>Sign up now</Link>
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

export default SupplierSignin