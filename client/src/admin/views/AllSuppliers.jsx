import React,{Component} from "react";
import {apiUrl} from '../../config/config'

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col
} from "reactstrap";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";

import { thead, tbody } from "../variables/general";

import axios from "axios";
import {Link} from "react-router-dom";

class AllSuppliers extends Component {
    state = {
        isAuth : true,
        supplierList : []
    };

    componentDidMount() {
        this.loadSuppliers();
    }

    loadSuppliers = async () => {
        await axios.get(`${apiUrl}/supplier`)
                .then(res => {
                    if (res.data.success){
                        const list = res.data.output;
                        this.setState({
                            supplierList : list
                        })
                    }else{
                        alert("error occured");
                    }
                })
                .catch(error => {
                    alert(error);
                })
    };

    fillSuppliersData = () => {
        return this.state.supplierList.map( (supplier,key) => {
            return (
                <tr key={key}>
                    <th>{key+1}</th>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phone}</td>
                    <td>
                        <span className={
                          supplier.status === "Platinum" ? "badge badge-success"
                        : supplier.status === "Gold" ? "badge badge-warning"
                        : supplier.status === "Verified" ? "badge badge-danger"
                        : supplier.status === "Silver" ? "badge badge-primary"
                        : "badge badge-dark"
                        }>{supplier.status}</span>
                    </td>
                    {/*<td>action</td>*/}
                    <td>
                        <Link className="btn btn-info mr-2" to={"/admin/viewSupplierDetails/"+supplier.id}>View</Link>
                        <span className="btn btn-danger" onClick={()=> this.onDelete(supplier.id)}><i className="now-ui-icons ui-1_simple-remove"></i></span>
                    </td>
                    {/*<td>*/}
                    {/*    <button className="btn btn-outline-danger" onClick={()=>{this.onDelete(admin.id)}}> Delete</button>*/}
                    {/*</td>*/}
                </tr>
            )
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
        await axios.delete(`${apiUrl}/supplier/delete/${id}`)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Supplier has been deleted.',
                        'success'
                    );
                    this.loadSuppliers();
                }
            })
            .catch(error => {
                alert(error)
            })
    };

    render() {
        if (this.state.supplierList.length === 0){
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Card>
                            <CardBody>
                                <h1>Loading</h1>
                            </CardBody>
                        </Card>
                    </div>
                </>
            )
        }
        else{
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">All Suppliers</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table responsive>
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.fillSuppliersData()}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </>
            );
        }

    }
}

export default AllSuppliers;
