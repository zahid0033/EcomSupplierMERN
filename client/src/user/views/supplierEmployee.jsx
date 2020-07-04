import React,{Component} from "react";
import { Card, CardBody, Modal, ModalHeader, ModalBody} from "reactstrap";
import axios from 'axios';
import {apiUrl, frontendUrl} from "../../config/config";
import SupplierAuthService from "../supplierService/supplierAuthService";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import SupplierAddorEditEmployee from "../components/Supplier/supplierAddorEditEmployee";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import noDataImg from "../assets/images/noDataFound.gif";

class SupplierEmployee extends Component{

    state = {
        currentSupplier : undefined,
        employees : [],
        showAddModal : false,
        showEditModal : false,
        singleEmployee : null
    };

    componentDidMount = async () => {
        const supplier = SupplierAuthService.getCurrentSupplier();
        if (supplier !== null && supplier.accessToken){
            await this.setState({
                currentSupplier : supplier
            });
            this.fetchEmployee(this.state.currentSupplier.id);
        }else{
           this.props.history.push("/supplier/signin");
        }

    };

    fetchEmployee = async (id) => {
        await axios.get(`${apiUrl}/supplier/get/${id}`)
            .then(res => {
                this.setState({
                    employees : res.data.output[0].employees
                })
            })
    };

    getSingleEmployee = (id) => {
        axios.get(`${apiUrl}/employee/get/${id}`)
            .then(res => {
                if (res.data.success){
                    this.setState({
                        singleEmployee : res.data.output[0],
                        showEditModal : true
                    })

                }else{
                    alert("error occured");
                }
            })
    };

    renderEmployee = () => {
        if (this.state.employees.length === 0){
            return (
                <div className="text-center">
                    <h1>No Supplier Found</h1>
                    <img width="300px" src={noDataImg} alt=""/>
                </div>
            )
        }
        else{
            return this.state.employees.map((employee,key)=>{
                if(employee.image !== null){
                    const splitPath = employee.image.split("\\");
                    const path = splitPath[splitPath.length - 1];
                    return (
                        <Card className="mb-3" key={key}>
                            <CardBody>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><span className="employee_title"><i className="linearicons-pencil"></i> Name :</span> {employee.name}</p>
                                        <p><span className="employee_title"><i className="linearicons-envelope"></i> Email :</span> {employee.email}</p>
                                        <p><span className="employee_title"><i className="linearicons-smartphone"></i> Phone :</span> {employee.phone}</p>
                                        <p><span className="employee_title"><i className="linearicons-tag"></i> Designation :</span> {employee.designation}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <img className="circle_image" src={`${frontendUrl}/images/employee/${path}`} alt=""/>
                                    </div>
                                    <div className="col-md-2">
                                        <ul className="action-list">
                                            <li><span className="badge badge-primary" onClick={() => this.getSingleEmployee(employee.id)}> <i className="linearicons-pencil"></i> </span></li>
                                            <li><span className="badge badge-danger" onClick={()=> this.onDelete(employee.id)}><i className="linearicons-trash"></i></span></li>
                                        </ul>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )
                }else{
                    return (
                        <Card className="mb-3">
                            <CardBody>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><span className="employee_title"><i className="linearicons-pencil"></i> Name :</span> {employee.name}</p>
                                        <p><span className="employee_title"><i className="linearicons-envelope"></i> Email :</span> {employee.email}</p>
                                        <p><span className="employee_title"><i className="linearicons-smartphone"></i> Phone :</span> {employee.phone}</p>
                                        <p><span className="employee_title"><i className="linearicons-tag"></i> Designation :</span> {employee.designation}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p>No Photos available</p>
                                    </div>
                                    <div className="col-md-2">
                                        <ul className="action-list">
                                            <li><span className="badge badge-primary" onClick={() => this.getSingleEmployee(employee.id)}> <i className="linearicons-pencil"></i> </span></li>
                                            <li><span className="badge badge-danger" onClick={()=> this.onDelete(employee.id)}><i className="linearicons-trash"></i></span></li>
                                        </ul>

                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )
                }

            })
        }

    };

    toggleModal = () => {
        this.setState({
            showAddModal : false,
            showEditModal : false
        });
        this.fetchEmployee(this.state.currentSupplier.id);
    };

    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id)
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    sendDelete = (id) =>{
        axios.delete(`${apiUrl}/employee/delete/${id}`)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your employee has been deleted.',
                        'success'
                    );
                    this.fetchEmployee(this.state.currentSupplier.id);
                }
            })
            .catch(error => {
                alert(error)
            })
    };

    render() {
        return (
            <>
                <Breadcrumbs title="Employees"/>
                <div className="main_content">
                    <div className="section">
                        <div className="container">
                            {/*<Link to={"/supplier/employee/form"} className="btn btn-primary mb-5">Add Employee</Link>*/}
                            <span className="btn btn-fill-out btn-addtocart mb-5" onClick={()=>this.setState({showAddModal : true})}>Add Employee</span>
                            {this.renderEmployee()}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.showAddModal} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Employee Add</ModalHeader>
                    <ModalBody>
                        <SupplierAddorEditEmployee
                            edit={false}
                            singleData = {null}
                            onSave = { ()=>this.toggleModal() }
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.showEditModal} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Employee Edit</ModalHeader>
                    <ModalBody>
                        <SupplierAddorEditEmployee
                            edit={true}
                            singleData = {this.state.singleEmployee}
                            onSave = { ()=>this.toggleModal() }
                        />
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default SupplierEmployee