import React,{Component} from "react";
import {apiUrl, frontendUrl} from "../../../config/config";
import axios from "axios";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//validation
import SimpleReactValidator from 'simple-react-validator';

class SupplierEditProfile extends Component{
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.state = {
            name : props.singleData.name,
            email : this.props.singleData.email,
            phone : this.props.singleData.phone,
            description : this.props.singleData.description,
            image : null,
            address : this.props.singleData.address,
            businessType : this.props.singleData.businessType,
            ownership : this.props.singleData.ownership,
            country : this.props.singleData.country,
        };
    }



    handleChange = (e) => {
        this.validator.showMessages();
        this.setState({
            [e.target.name] : e.target.value
        })

    };

    fileSelectHandler = (e) => {
        this.setState({
            image : e.target.files[0]
        })
    };

    renderImage = () => {
        if(this.props.singleData.image !== null){
            const splitPath = this.props.singleData.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img style={{width : "50px", height : "50px"}} src={`${frontendUrl}/images/supplier/${path}`} alt=""/>)
        }else{
            return (<span>No Photo Available</span>)
        }
    };

    onSave = async () => {

        if (this.validator.allValid()){
            const dataPost = new FormData();
            dataPost.set('name' , this.state.name);
            dataPost.set('email' , this.state.email);
            dataPost.set('phone' , this.state.phone);
            dataPost.set('description' , this.state.description);
            dataPost.set('address' , this.state.address);
            dataPost.set('businessType' , this.state.businessType);
            dataPost.set('ownership' , this.state.ownership);
            dataPost.set('country' , this.state.country);
            dataPost.append('image' , this.state.image);

            await axios.post(`${apiUrl}/supplier/update/${this.props.singleData.id}`,dataPost, {
                config: { headers: { "Content-Type": "multipart/form-data" } }
            })
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire(
                            'Updated!',
                            'Profile updated Successfully.',
                            'success'
                        );
                    }
                    else {
                        alert("hey " + response.data)
                    }
                })
                .catch(error=>{
                    alert("Error 34 "+error.status+ error)
                });

            this.props.onSave();
        }
        else{
            this.validator.showMessages();
        }


    };

    render() {
        const {name,email,phone,description,address,businessType,ownership,country} = this.state;
        return (
            <div>
                <div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter Your Company Name"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter Your Company Email"
                            value={email}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="phone"
                            placeholder="Enter Your Company Phone"
                            value={phone}
                            onChange={this.handleChange}
                        />
                        {this.validator.message('phone', this.state.phone, 'required|phone', { className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <textarea
                            required
                            className="form-control"
                            name="description"
                            rows="3"
                            placeholder="Enter Your Company Description"
                            value={description}
                            onChange={this.handleChange}
                        />
                        {this.validator.message('description', this.state.description, 'required|min:10|max:40',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        {this.props.singleData.image !== null ? this.renderImage() : ''}
                        <input type="file" className="form-control" name="file" onChange={this.fileSelectHandler}/>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="address"
                            placeholder="Enter Your Company Address"
                            value={address}
                            onChange={this.handleChange}
                        />
                        {this.validator.message('address', this.state.address, 'required|min:10|max:30',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="businessType"
                            placeholder="Enter Your Company Business Type"
                            value={businessType}
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
                            placeholder="Enter Your Company OwnerShip"
                            value={ownership}
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
                            value={country}
                            onChange={this.handleChange}
                        />
                        {this.validator.message('country', this.state.country, 'required',{ className: 'text-danger' })}
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-fill-out btn-block"
                            name="register"
                            onClick={this.onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SupplierEditProfile