import React,{Component} from "react";
// sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// supplier Auth Service
import SupplierAuthService from "../supplierService/supplierAuthService";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import {Link} from "react-router-dom";
//validation
import SimpleReactValidator from 'simple-react-validator';


class SupplierSignup extends Component{
    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    state = {
        name : "",
        email : "",
        phone : "",
        address : "",
        password : "",
        confirmedPassword : "",
        businessType : "",
        ownership : "",
        country : "",
        terms : false,
        isLoggedIn : false,
        error : ""
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
            [event.target.name] : event.target.value,
        })
    };
    termsHandler = () => {
        this.setState({
            terms : !this.state.terms
        })
    };
    onSave = async (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmedPassword) {
            alert("You password doesnt match")
        }
        if (this.validator.allValid()) {
            const dataPost = {
                name : this.state.name,
                address : this.state.address,
                phone : this.state.phone,
                email : this.state.email,
                password : this.state.password,
                country : this.state.country,
                businessType : this.state.businessType,
                ownership : this.state.ownership,
            };

            await SupplierAuthService.supplierSignup(dataPost)
                .then(response => {
                    if (response.success === true) {
                        Swal.fire(
                            'Added!',
                            'Supplier added Successfully.',
                            'success'
                        );
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
        } else {
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
                <Breadcrumbs title="SignUp"/>
                {/* END SECTION BREADCRUMB */}
                <div className="login_register_wrap section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-md-10">
                                <div className="login_wrap">
                                    <div className="padding_eight_all bg-white">
                                        <div className="heading_s1">
                                            <h3>Create an Account</h3>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="name"
                                                    placeholder="Enter Your Name"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('name', this.state.name, 'required',{ className: 'text-danger' })}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="Enter Your Email"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('email', this.state.email, 'required|email',{ className: 'text-danger' })}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="phone"
                                                    placeholder="Enter Your Phone"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('phone', this.state.phone, 'required|phone', { className: 'text-danger' })}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="address"
                                                    placeholder="Enter Your Address"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('address', this.state.address, 'required|min:10|max:30',{ className: 'text-danger' })}
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
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    required
                                                    type="password"
                                                    name="confirmedPassword"
                                                    placeholder="Confirm Password"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('confirmedPassword', this.state.confirmedPassword, 'required',{ className: 'text-danger' })}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="businessType"
                                                    placeholder="Enter Your Business Type"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('businessType', this.state.businessType, 'required',{ className: 'text-danger' })}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="ownership"
                                                    placeholder="Enter Your ownerShip"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('ownership', this.state.ownership, 'required',{ className: 'text-danger' })}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    name="country"
                                                    placeholder="Enter Your country"
                                                    onChange={this.handleChange}
                                                />
                                                {this.validator.message('country', this.state.country, 'required',{ className: 'text-danger' })}
                                            </div>
                                            <div className="login_footer form-group">
                                                <div className="chek-form">
                                                    <div className="custome-checkbox">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="terms"
                                                            id="exampleCheckbox2"
                                                            checked={this.state.terms}
                                                            onChange={this.termsHandler}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="exampleCheckbox2"
                                                        >
                                                            <span>I agree to terms &amp; Policy.</span>
                                                            {this.validator.message('terms', this.state.terms, 'accepted',{ className: 'text-danger' })}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-fill-out btn-block"
                                                    name="register"
                                                    onClick={this.onSave}
                                                >
                                                    Register
                                                </button>

                                            </div>
                                        </form>
                                        <div className="different_login">
                                            <span> or</span>
                                        </div>

                                        <div className="form-note text-center">
                                            Already have an account? <Link to={"/supplier/signin"}>Log in</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SupplierSignup