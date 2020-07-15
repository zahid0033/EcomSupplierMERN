import React,{Component} from "react";
import axios from "axios";
import {apiUrl} from "../../config/config";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import SimpleReactValidator from "simple-react-validator";
import loading from "../assets/images/loadForm.gif";

class EmailVerify extends Component{
    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.state = {
            message : null,
            showForm: false,
            email: "",
            loading: false
        };
    }



    async componentDidMount() {
        await axios.get(`${apiUrl}/supplier/verifyEmail/${this.props.match.params.token}`)
            .then(res => {
                if (res.data.success){
                    this.setState({
                        message : res.data.message
                    });
                }
                else if (res.data.success === false){
                    this.setState({
                        message : res.data.message,
                        showForm: true
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

    onSave = async(e) => {
        e.preventDefault();
        if (this.validator.allValid()){
            this.setState({
                loading: true
            });
            const dataPost = {
                email: this.state.email,
            };
            await axios.post(`${apiUrl}/supplier/sendVerificationToken`,dataPost)
                .then(res => {
                    if (res.data.success){
                        this.setState({
                            message : res.data.message,
                            loading: false
                        })
                    }else{
                        this.setState({
                            message : res.data.message,
                            loading: false
                        })
                    }
                }).catch(error =>{
                    console.log(error)
                })
        }else {
            this.validator.showMessages();
            this.setState({
                loading: false
            });
        }

    };

    render() {
        const {message,showForm,email} = this.state;
        return (
            <>
                <Breadcrumbs title="Verify Email"/>
                <div className="main_content">
                    {/* START LOGIN SECTION */}
                    <div className="login_register_wrap section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-md-10">
                                    <div className="login_wrap">
                                        <div className="padding_eight_all bg-white">
                                            {message && <p className="alert alert-primary">{message}</p>}


                                            {showForm &&
                                                <>
                                                    <div className="heading_s1">
                                                        <h3>Write your email to get the verification link again</h3>
                                                    </div>
                                                    <form>
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                required
                                                                className="form-control"
                                                                name="email"
                                                                placeholder="Your Email"
                                                                value={email}
                                                                onChange={this.handleChange}
                                                            />
                                                            {this.validator.message('email', this.state.email, 'required|email',{ className: 'text-danger' })}
                                                        </div>
                                                        { this.state.loading && <img width="100%" src={loading} alt=""/> }
                                                        <div className="form-group">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-fill-out btn-block"
                                                                onClick={this.onSave}
                                                            >
                                                                Send Verification Link
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>

                                            }


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

export default EmailVerify