import React,{Component} from "react";
import axios from 'axios';
import SupplierAuthService from "../../supplierService/supplierAuthService";
import {apiUrl,frontendUrl} from "../../../config/config";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//validation
import SimpleReactValidator from 'simple-react-validator';
//auth
import supplierAuthHeader from "../../supplierService/supplierAuthHeader";

class SupplierAddorEditEmployee extends Component{

    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    state = {
        name : "",
        email : "",
        phone : "",
        image : null,
        designation : "",
        supplierId : null,
        errorMessage : null
    };

    componentDidMount() {
        if(this.props.edit){
            let {name,email,phone,designation,supplierId} = this.props.singleData;
            this.setState({
                name : name,
                email : email,
                phone : phone,
                designation : designation,
                supplierId : supplierId
            })
        }else{
            const supplier = SupplierAuthService.getCurrentSupplier();
            this.setState({
                supplierId : supplier.id
            })
        }
    }

    fileSelectHandler = (e) => {
        this.setState({
            image : e.target.files[0]
        })
    };

    renderImage = () => {
        if(this.props.singleData.image !== null){
            const splitPath = this.props.singleData.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img style={{width : "50px", height : "50px"}} src={`${frontendUrl}/images/employee/${path}`} alt=""/>)
        }else{
            return (<span>No Photo Available</span>)
        }

    };

    handleChange = event => {
        this.validator.showMessages();
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    sendSave = async () => {
        if (this.validator.allValid()){
            const dataPost = new FormData();
            if (!this.props.edit){
                dataPost.set('name' , this.state.name);
                dataPost.set('email' , this.state.email);
                dataPost.set('phone' , this.state.phone);
                dataPost.set('designation' , this.state.designation);
                dataPost.set('supplierId' , this.state.supplierId);
                dataPost.append('image' , this.state.image);

                await axios.post(`${apiUrl}/employee/add`,dataPost, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token" : supplierAuthHeader()
                    }
                })
                    .then(response => {
                        if (response.data.success === true) {
                            Swal.fire(
                                'Added!',
                                'Employee added Successfully.',
                                'success'
                            );
                            // window.location.reload(false);
                            this.props.onSave();
                        }
                        else {
                            alert("hey " + response.data)
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
                                errorMessage : error.response.data.error.errors[0].message
                            })
                        }
                    });

            }
            else{
                dataPost.set('name' , this.state.name);
                dataPost.set('email' , this.state.email);
                dataPost.set('phone' , this.state.phone);
                dataPost.set('designation' , this.state.designation);
                dataPost.set('supplierId' , this.state.supplierId);
                dataPost.append('image' , this.state.image);

                await axios.post(`${apiUrl}/employee/update/${this.props.singleData.id}`,dataPost, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token" : supplierAuthHeader()
                    }
                })
                    .then(response => {
                        if (response.data.success === true) {
                            Swal.fire(
                                'Updated!',
                                'Employee Updated Successfully.',
                                'success'
                            );
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
                                errorMessage : error.response.data.error.errors[0].message
                            })
                        }
                    });
            }
        }
        else{
            this.validator.showMessages();
        }

    };

    render() {
        const {name,email,phone,designation} = this.state;

        return (
            <div>
                {this.state.errorMessage && <p className="text-danger">{this.state.errorMessage}</p>}
                <div className="container">
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Name </label>
                            <input type="text" className="form-control" name="name" value={name} placeholder="Enter your Name" onChange={this.handleChange} />
                            {this.validator.message('name', this.state.name, 'required',{ className: 'text-danger' })}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" className="form-control" name="email" value={email} placeholder="Enter your Email"  onChange={this.handleChange}/>
                            {this.validator.message('email', this.state.email, 'required|email',{ className: 'text-danger' })}
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Phone </label>
                            <input type="text" className="form-control" name="phone" value={phone} placeholder="Enter your Phone" onChange={this.handleChange} />
                            {this.validator.message('phone', this.state.phone, 'required|phone',{ className: 'text-danger' })}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Designation</label>
                            <input type="email" className="form-control" name="designation" value={designation} placeholder="Enter your Designation" onChange={this.handleChange} />
                            {this.validator.message('designation', this.state.designation, 'required',{ className: 'text-danger' })}
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-6">
                            { this.props.edit ? this.renderImage() : '' }
                        </div>
                        <input type="file" className="form-control" name="file" onChange={this.fileSelectHandler}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-fill-out btn-block"
                            onClick={() => this.sendSave()}>Save
                    </button>
                </div>
            </div>
        );
    }
}
export default SupplierAddorEditEmployee