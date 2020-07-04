import React,{Component} from "react";
import {apiUrl, frontendUrl} from '../../config/config';

import axios from "axios";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//auth header
import authHeader from "../adminServices/authHeader";



class CreateAdmin extends Component {

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
        if(this.props.edit){
            let {name,email,password,roleId,address,phone,status} = this.props.singleData;
            this.setState({
                name :name,
                email :email,
                password :password,
                role_id : roleId,
                address : address,
                phone : phone,
                status : status,
            })
        }
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

    renderImage = () => {
        if(this.props.singleData.image !== null){
            const splitPath = this.props.singleData.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img style={{width : "50px", height : "50px"}} src={`${frontendUrl}/images/admin/${path}`} alt=""/>)
        }else{
            return (<span>No Photo Available</span>)
        }

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
            if (!this.props.edit){
                dataPost.set('name' , this.state.name);
                dataPost.set('email' , this.state.email);
                dataPost.set('password' , this.state.password);
                dataPost.set('role_id' , this.state.role_id);
                dataPost.set('address' , this.state.address);
                dataPost.set('phone' , this.state.phone);
                dataPost.append('file' , this.state.file);

                await axios.post(`${apiUrl}/admin/add`,dataPost, {
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
                            this.props.onSave();
                            // window.location.reload(false);
                        }
                        else {
                            alert("hey " + response.data.message)
                        }
                    })
                    .catch(error=>{
                        if (error.response.data.isAuth === false){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data.message
                            })
                        }
                        else if(error.response.data.name === "server error"){
                            this.setState({
                                errorMessage : error.response.data.error[0].message
                            })
                        }
                    });

                // this.props.onSave();
            }
            else{
                dataPost.set('name' , this.state.name);
                dataPost.set('role_id' , this.state.role_id);
                dataPost.set('address' , this.state.address);
                dataPost.set('phone' , this.state.phone);
                dataPost.set('status' , this.state.status);
                dataPost.append('file' , this.state.file);

                await axios.post(`${apiUrl}/admin/update/${this.props.singleData.id}`,dataPost, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token" : authHeader()
                    }
                })
                    .then(response => {
                        if (response.data.success === true) {
                            Swal.fire(
                                'Updated!',
                                'Admin Updated Successfully.',
                                'success'
                            );
                            // this.props.handleNotification("tr","Admin Updated Successfully");
                            this.setState({isUpdated: true});
                            // window.location.reload(false);
                        }
                        else {
                            alert("hey " + response.data.message)
                        }
                    })
                    .catch(error => {
                        if (error.response.data.isAuth === false){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data.message
                            })
                        }
                        else if(error.response.data.name === "server error"){
                            this.setState({
                                errorMessage : error.response.data.error[0].message
                            })
                        }
                    });
                this.props.onSave();
            }
        }
    };

    render() {
        return (
            <div>
                {this.state.errorMessage && <p className="text-danger">{this.state.errorMessage}</p>}
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
                            {/*<option selected>Choose...</option>*/}
                            { this.props.edit ? <option value={this.props.singleData.roleId}>{this.props.singleData.role.role}</option> : <option>Choose...</option> }
                            {this.loadRoles()}
                        </select>
                    </div>

                </div>
                { !this.props.edit &&
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
                }

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
                {this.props.edit ? (
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputState">Status</label>
                            <select id="inputState" className="form-control" onChange={(value) => this.setState({status: value.target.value})}>
                                <option value= {this.props.singleData.status}>{this.props.singleData.status}</option>
                                <option value= "Active">Active</option>
                                <option value= "Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                ) : ''}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        { this.props.edit ? this.renderImage() : '' }
                    </div>
                    <input type="file" className="form-control" name="file" onChange={this.fileSelectHandler}/>
                </div>

                {/*<input type="submit" className= "btn btn-primary pull-right" value="Add Admin"/>*/}
                <button type="submit" className="btn btn-primary"
                        onClick={() => this.sendSave()}>Save
                </button>
                <div className="clearfix" />

            </div>
        );
    }
}

export default CreateAdmin;
