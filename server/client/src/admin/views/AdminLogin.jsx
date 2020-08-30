import React,{Component} from "react";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
import AdminAuthService from "../adminServices/adminAuthService";
// sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


class AdminLogin extends Component {

    state = {
        email : "",
        password : "",
        isLoggedIn : false,
        errorMessage : null
    };

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    onSave = async (e) => {
            e.preventDefault();
            const dataPost = {
                email : this.state.email,
                password : this.state.password
            };

            await AdminAuthService.AdminSignin(dataPost)
                .then(res => {
                    if (res.success === true){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Logged in',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.props.history.push("/admin/dashboard");
                        window.location.reload();
                    }
                })
                .catch(error => {
                    if (error.response.data.success === false){
                        this.setState({
                            errorMessage : error.response.data.message
                        });
                    }
                })

    };

    render() {
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col md="3" ></Col>
                        <Col md="6">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Login</h5>
                                    {this.state.errorMessage && <p className="text-danger">{this.state.errorMessage}</p>}
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pl-5 pr-5" md="12">
                                                <FormGroup>
                                                    <label>First Name</label>
                                                    <Input
                                                        placeholder="Email"
                                                        name="email"
                                                        type="email"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-5 pr-5" md="12">
                                                <FormGroup>
                                                    <label>Last Name</label>
                                                    <Input
                                                        placeholder="Password"
                                                        name="password"
                                                        type="password"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-5 pr-5" md="12">
                                                <FormGroup>
                                                    <Input
                                                        type="submit"
                                                        className="btn btn-fill-out btn-block"
                                                        name="login"
                                                        value="Log in"
                                                        onClick={this.onSave}
                                                    />

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3" ></Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default AdminLogin