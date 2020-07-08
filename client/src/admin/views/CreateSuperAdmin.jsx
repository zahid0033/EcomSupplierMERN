import React,{Component} from "react";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, Form, FormGroup, Input,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Table
} from "reactstrap";
import {tbody, thead} from "../variables/general";
import CreateAdmin from "./CreateAdmin";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from "axios";
import {apiUrl} from "../../config/config";
import authHeader from "../adminServices/authHeader";

class CreateSuperAdmin extends Component{
    state = {
        isAuth : true,
        name : "",
        email : "",
        password : "",
        role_id : 0,
        address : "",
        phone : "",
        status : "",
        file : null,
        isUpdated : false,
        roles : [],
        errorMessage : null
    };

    componentDidMount() {
        this.fetchRoles();
    }

    fetchRoles = async () => {
        await axios.get(`${apiUrl}/role`)
            .then(res => {
                if (res.data.success){
                    this.setState({
                        roles: res.data.output
                    });
                }
                else{
                    alert ("error occured")
                }
            })
            .catch(error => {
                alert (error);
            })
    };

    loadRoles = () => {
        return this.state.roles.map((role,key) => {
            return <option value={role.id} key={key}>{role.role}</option>
        });
    };

    fileSelectHandler = (e) => {
        this.setState({
            file : e.target.files[0]
        })
    };

    sendSave = async () => {
        if (this.state.name==="") {
            alert("Fill Your Name")
        }
        else if (this.state.email==="") {
            alert("Select Your Email")
        }
        else if (this.state.password==="") {
            alert("Select Your Password")
        }
        else if (this.state.role===0) {
            alert("Select the type of Role")
        }
        else {

            // const baseUrl = `${apiUrl}/admin/add`;
            const dataPost = new FormData();
            dataPost.set('name' , this.state.name);
            dataPost.set('email' , this.state.email);
            dataPost.set('password' , this.state.password);
            dataPost.set('role_id' , this.state.role_id);
            dataPost.set('address' , this.state.address);
            dataPost.set('phone' , this.state.phone);
            dataPost.append('file' , this.state.file);

            await axios.post(`${apiUrl}/admin/addSuperAdmin`,dataPost, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token" : authHeader()
                }
            })
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire(
                            'Added!',
                            'Admin added Successfully.',
                            'success'
                        );
                        // this.props.handleNotification("tr","Admin added Successfully");
                        this.setState({isUpdated: true});
                        // window.location.reload(false);
                    }
                    else {
                        alert("hey " + response.data.message)
                    }
                })
                .catch(error => {
                    if(error.response.data.name === "server error"){
                        this.setState({
                            errorMessage : error.response.data.error[0].message
                        })
                    }
                });

            // this.props.onSave();

        }
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
                                    <h5 className="title">SignUp</h5>
                                    {this.state.errorMessage && <p className="text-danger">{this.state.errorMessage}</p>}
                                </CardHeader>
                                <CardBody>
                                    <div className="form-row justify-content-center">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Name </label>
                                            <input type="text" className="form-control" placeholder="Name" value={ this.state.name }
                                                   onChange={(value) => this.setState({name: value.target.value})}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputState">Role</label>
                                            <select id="inputState" className="form-control"
                                                    onChange={(value) => this.setState({role_id: value.target.value})}>
                                                <option>Choose...</option>
                                                {this.loadRoles()}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <input type="email" className="form-control" placeholder="Email" value={this.state.email}
                                                   onChange={(value) => this.setState({email: value.target.value})}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Password</label>
                                            <input type="password" className="form-control" placeholder="Password"
                                                   onChange={(value) => this.setState({password: value.target.value})}/>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Address</label>
                                            <input type="text" className="form-control" placeholder="Address" value={this.state.address}
                                                   onChange={(value) => this.setState({address: value.target.value})}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Phone</label>
                                            <input type="text" className="form-control" placeholder="Phone" value={this.state.phone}
                                                   onChange={(value) => this.setState({phone: value.target.value})}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <input type="file" className="form-control" name="file" onChange={this.fileSelectHandler}/>
                                    </div>

                                    {/*<input type="submit" className= "btn btn-primary pull-right" value="Add Admin"/>*/}
                                    <button type="submit" className="btn btn-primary"
                                            onClick={() => this.sendSave()}>Save
                                    </button>
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

export default CreateSuperAdmin