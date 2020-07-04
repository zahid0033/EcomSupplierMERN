import React,{Component} from "react";
import {apiUrl,frontendUrl} from '../../config/config';
import CreateAdmin from "./CreateAdmin";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// reactstrap components

import { Card, CardBody, CardHeader, CardTitle, Table, Row, Col, Button, Modal, ModalHeader, ModalBody} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";

import { thead, tbody } from "../variables/general";

import axios from "axios";

class ManageAdmins extends Component {
    state = {
        isAuth : true,
        showAddModal : false,
        showEditModal : false,
        singleAdmin : null,
        adminList : []
    };

    componentDidMount() {
        this.loadAdmins();
    }

    loadAdmins = async () => {
      await  axios.get(`${apiUrl}/admin`)
                .then(res => {
                    if (res.data.success){
                        const list = res.data.output;
                        this.setState({
                            adminList : list
                        })
                    }else{
                        alert("error occured");
                    }
                })
                .catch(error => {
                    alert(error);
                })
    };

    getSingleAdmin = async (id) => {
        // alert(id);
      await axios.get(`${apiUrl}/admin/get/${id}`)
                .then(res => {
                    if (res.data.success){
                        this.setState({
                            singleAdmin : res.data.output[0],
                            showEditModal : true
                        })

                    }else{
                        alert("error occured");
                    }
                })
    };

    fillAdminData = () => {
        return this.state.adminList.map( (admin,key) => {
            if (admin.image !== null){
                const splitPath = admin.image.split("\\");
                const path = splitPath[splitPath.length - 1];

                return (
                    <tr key={key}>
                        <th>{key+1}</th>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role.role}</td>
                        <td><img style={{width : "50px", height : "50px"}} src={`${frontendUrl}/images/admin/${path}`} alt=""/></td>
                        <td>{admin.status}</td>
                        <td>
                            <span className="btn btn-primary mr-2" onClick={() => this.getSingleAdmin(admin.id)}>Edit</span>
                            <span className="btn btn-danger" onClick={()=> this.onDelete(admin.id)}><i className="now-ui-icons ui-1_simple-remove"></i></span>
                        </td>
                        {/*<td>*/}
                        {/*    <Link className="btn btn-outline-info " to={"/edit/"+admin.id}>Edit</Link>*/}
                        {/*</td>*/}
                        {/*<td>*/}
                        {/*    <button className="btn btn-outline-danger" onClick={()=>{this.onDelete(admin.id)}}> Delete</button>*/}
                        {/*</td>*/}
                    </tr>
                )

            }else{
                return (
                    <tr key={key}>
                        <th>{key+1}</th>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role.role}</td>
                        <td>No Photos Available</td>
                        <td>{admin.status}</td>
                        <td>
                            <span className="btn btn-primary mr-2" onClick={() => this.getSingleAdmin(admin.id)}>Edit</span>
                            <span className="btn btn-danger" onClick={()=> this.onDelete(admin.id)}><i className="now-ui-icons ui-1_simple-remove"></i></span>
                        </td>
                        {/*<td>*/}
                        {/*    <Link className="btn btn-outline-info " to={"/edit/"+admin.id}>Edit</Link>*/}
                        {/*</td>*/}
                        {/*<td>*/}
                        {/*    <button className="btn btn-outline-danger" onClick={()=>{this.onDelete(admin.id)}}> Delete</button>*/}
                        {/*</td>*/}
                    </tr>
                )
            }

        } )
    };

    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this file!',
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
    };

    sendDelete = async (id) =>{
      await axios.delete(`${apiUrl}/admin/delete/${id}`)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Admin has been deleted.',
                        'success'
                    );
                    this.loadAdmins();
                }
            })
            .catch(error => {
                alert(error)
            })
    };

    toggleModal = () => {
        this.setState({
            showAddModal : false,
            showEditModal : false
        });
        this.loadAdmins();
    };

    render() {
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">All Admins</CardTitle>
                                    <Button color="danger" onClick={()=>this.setState({showAddModal : true})}>Add</Button>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.fillAdminData()}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.showAddModal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Admin Add</ModalHeader>
                        <ModalBody>
                            <CreateAdmin
                                edit={false}
                                singleData = {null}
                                onSave = { ()=>this.toggleModal() }
                            />
                        </ModalBody>
                        {/*<ModalFooter>*/}
                        {/*    <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}*/}
                        {/*    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>*/}
                        {/*</ModalFooter>*/}
                    </Modal>
                    <Modal isOpen={this.state.showEditModal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Admin Edit</ModalHeader>
                        <ModalBody>
                            <CreateAdmin
                                edit={true}
                                singleData = {this.state.singleAdmin}
                                onSave = { ()=>this.toggleModal() }
                            />
                        </ModalBody>
                        {/*<ModalFooter>*/}
                        {/*    <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}*/}
                        {/*    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>*/}
                        {/*</ModalFooter>*/}
                    </Modal>
                </div>
            </>
        );
    }
}

export default ManageAdmins;
