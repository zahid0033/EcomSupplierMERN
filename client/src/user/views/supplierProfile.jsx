import React,{Component} from "react";
import axios from 'axios';
import img1 from '../assets/images/product_img1.jpg';
import {ModalHeader, ModalBody, Modal} from 'reactstrap';
import SupplierAuthService from "../supplierService/supplierAuthService";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import SupplierEditProfile from "../components/Supplier/supplierEditProfile";
import {apiUrl,frontendUrl} from "../../config/config";

class SupplierProfile extends Component{

    state = {
        supplier : [],
        currentSupplier : undefined,
        showEditModal : false
    };

    componentDidMount = async () => {
        const supplier = SupplierAuthService.getCurrentSupplier();
        if (supplier !== null && supplier.accessToken){
            await this.setState({
                currentSupplier : supplier
            });
            this.loadSupplier(this.state.currentSupplier.id);
        }else{
            this.props.history.push("/supplier/signin");
        }

    };

    loadSupplier = async (id) => {
        await axios.get(`${apiUrl}/supplier/get/${id}`)
                .then(response => {
                    if (response.data.success){
                        this.setState({
                            supplier : response.data.output[0]
                        })
                    }else{
                        alert ("failed")
                    }
                })
                .catch(error => {
                    alert (error);
                })
    };

    toggleModal = () => {
        this.setState({
            showEditModal : false
        });
        this.loadSupplier(this.state.currentSupplier.id);
    };

    renderImage = () => {
        if(this.state.supplier.image !== null){
            const splitPath = this.state.supplier.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img className="circle_image" src={`${frontendUrl}/images/supplier/${path}`} alt=""/>)
        }else{
            return (<img src={img1} alt=""/>)
        }
    };


    render() {
        const {supplier} = this.state;

        if (supplier.length === 0){
            return (
                <>
                    <Breadcrumbs title="profile"/>
                    <div className="container">
                        <h1>Loading..</h1>
                    </div>
                </>
            )
        }
        else{
            return (
                <>
                    <Breadcrumbs title="profile"/>
                    <div className="main_content">
                        <div className="section">
                            <div className="container">
                                <span className="btn btn-fill-out btn-addtocart mb-5" onClick={()=>this.setState({showEditModal : true})}>Edit Profile</span>
                                <h1 className="text-center">{supplier.name}</h1>
                                <p className="text-center">{supplier.description}</p>
                                <div className="row pt-4">
                                    <div className="col-md-4">
                                        {this.renderImage()}
                                    </div>
                                    <div className="col-md-8">
                                        <div className="description">
                                            <p>{supplier.description}</p>
                                        </div>
                                        <div className="supplier_sort_info mt-5">
                                            <ul>
                                                <li><i className="linearicons-smartphone"/> {supplier.phone}</li>
                                                <li><i className="linearicons-map-marker"/> {supplier.address}</li>
                                                <li><i className="linearicons-envelope"/>{supplier.email}</li>
                                            </ul>
                                        </div>
                                        <div className="desc_table mt-5 ">
                                            <table className="table table-dark table-bordered">
                                                <tbody>
                                                <tr>
                                                    <th>Country</th>
                                                    <td>{supplier.country}</td>
                                                </tr>
                                                <tr>
                                                    <th>Business Type</th>
                                                    <td>{supplier.businessType}</td>
                                                </tr>
                                                <tr>
                                                    <th>Ownership</th>
                                                    <td>{supplier.ownership}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.showEditModal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Edit Profile</ModalHeader>
                        <ModalBody>
                            <SupplierEditProfile
                                singleData = {this.state.supplier}
                                onSave = { ()=>this.toggleModal() }
                            />
                        </ModalBody>
                    </Modal>
                </>
            );
        }

    }
}

export default SupplierProfile