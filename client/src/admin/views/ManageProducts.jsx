import React,{Component} from "react";
import axios from 'axios';
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Card, CardBody, Table} from "reactstrap";

import {tbody, thead} from "../variables/general";
import {Link} from "react-router-dom";
import authHeader from "../adminServices/authHeader";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

class ManageProducts extends Component{
    state = {
        products : [],
        exclusive : "",
        featured : ""
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        await axios.get(`/api/product`)
            .then(res => {
                this.setState({
                    products : res.data.output
                })
            })
    };

    exclusiveHandle = async (status,id) => {
        if (status === "no"){
            await this.setState({
                exclusive : "yes"
            });
        }else if(status === "yes"){
            await this.setState({
                exclusive : "no"
            });
        }

        await axios.post(`/api/product/exclusiveUpdate`,{status : this.state.exclusive,id: id},{headers : {"x-access-token" : authHeader()}})
            .then(res =>{
                this.props.handleNotification("tr","Exclusive Successfully Updated");
                this.loadProducts();
            })
            .catch(error => {
                alert(error)
            })

    };

    featuredHandle = async (status,id) => {
        if (status === "no"){
            await this.setState({
                featured : "yes"
            });
        }else if(status === "yes"){
            await this.setState({
                featured : "no"
            });
        }

        await axios.post(`/api/product/featuredUpdate`,{status : this.state.featured,id: id},{headers : {"x-access-token" : authHeader()}})
            .then(res =>{
                this.props.handleNotification("tr","Featured Successfully Updated");
                this.loadProducts();
            })
            .catch(error => {
                alert(error)
            })

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
        await axios.delete(`/api/product/delete/${id}`)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        'success'
                    );
                    this.loadProducts();
                }
            })
            .catch(error => {
                alert(error)
            })
    };

    fillProductsData = () => {
        return this.state.products.map((product,key) => {
            return (
                <tr key={key}>
                    <th>{key+1}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.exclusive === 'no' ? <span className="btn btn-danger" onClick={ () => this.exclusiveHandle(product.exclusive ,product.id)}><i className="fas fa-tags"/></span> : <span className="btn btn-success" onClick={ () => this.exclusiveHandle(product.exclusive ,product.id)}><i className="fas fa-tags"/></span>}</td>
                    <td>{product.featured === 'no' ? <span className="btn btn-danger"  onClick={ () => this.featuredHandle(product.featured ,product.id)}><i className="far fa-star"/></span> : <span className="btn btn-success"  onClick={ () => this.featuredHandle(product.featured, product.id)}><i className="far fa-star"/></span>}</td>
                    {/*<td>action</td>*/}
                    <td>
                        <span className="mr-2">{product.supplier.name}</span>
                        <span
                            className = {
                                product.supplier.status === "Platinum" ? "badge badge-success"
                                    : product.supplier.status === "Gold" ? "badge badge-warning"
                                    : product.supplier.status === "Verified" ? "badge badge-danger"
                                        : product.supplier.status === "Silver" ? "badge badge-primary"
                                            : "badge badge-dark"
                            }
                        > {product.supplier.status} </span>
                    </td>
                    <td>{product.subCategory.name}</td>
                    <td>
                        <Link className="btn btn-info mr-2" to={"/admin/viewProductDetails/"+product.id}>View</Link>
                        <span className="btn btn-danger" onClick={()=> this.onDelete(product.id)}><i className="now-ui-icons ui-1_simple-remove"></i></span>
                    </td>
                    {/*<td>*/}
                    {/*    <button className="btn btn-outline-danger" onClick={()=>{this.onDelete(admin.id)}}> Delete</button>*/}
                    {/*</td>*/}
                </tr>
            )
        })
    };

    render() {
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Card>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Exclusive</th>
                                    <th scope="col">Featured</th>
                                    <th scope="col">Supplier</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.fillProductsData()}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default ManageProducts