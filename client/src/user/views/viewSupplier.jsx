import React,{Component} from "react";
import axios from 'axios'
import img1 from '../assets/images/product_img1.jpg';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from 'reactstrap';
import classnames from 'classnames';
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import ProductTemplateTwo from "../widgets/Product/productTemplateTwo";
import EmployeeTemplate from "../widgets/Employee/employeeTemplate";
import {apiUrl,frontendUrl} from "../../config/config";
import noDataImg from "../assets/images/noDataFound.gif";

class ViewSupplier extends Component{

    state = {
        supplier : [],
        products : [],
        employees : [],
        activeTab : '1'
    };

    componentDidMount() {
        const id = this.props.match.params.supplierId;
        this.loadSupplier(id);
    }

    loadSupplier = async (id) => {
        await axios.get(`${apiUrl}/supplier/get/${id}`)
                .then(response => {
                    if (response.data.success){
                        this.setState({
                            supplier : response.data.output[0],
                            products : response.data.output[0].products,
                            employees : response.data.output[0].employees
                        })
                    }else{
                        alert ("failed")
                    }
                })
                .catch(error => {
                    alert (error);
                })
    };

    loadProducts =  () => {
        return  this.state.products.map((product,key) => {
            return (
                <div className="col-md-3 col-6">
                    <ProductTemplateTwo product={product} showStatus={false} key={key}/>
                </div>
            )

        })
    };

    loadEmployee =  () => {
        if (this.state.employees.length === 0){
            return (
                <div className="text-center">
                    <p>No Employees Found</p>
                    <img width="300px" src={noDataImg} alt=""/>
                </div>
            )
        }
        else{
            return  this.state.employees.map((employee,key) => {
                return <EmployeeTemplate employee={employee} key={key}/>
            })
        }

    };

    toggle = tab => {
        if (this.state.activeTab !== tab){
            this.setState({
                activeTab : tab
            })
        }
    };

    renderSupplierImage = () => {
        if(this.state.supplier.image !== null){
            console.log("image",this.state.supplier);
            const splitPath = this.state.supplier.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img className="circle_image" src={`${frontendUrl}/images/supplier/${path}`} alt=""/>)
        }else{
            return (<img src={img1} alt="" className="circle_image" />)
        }
    };

    render() {
        const {supplier} = this.state;

        if (supplier.length === 0){
            return  (
                <h1>No Supplier</h1>
            )
        }
        else{
            return (
                <>
                    <Breadcrumbs title="Supplier"/>
                    <div className="main_content">
                        <div className="section">
                            <div className="container">
                                <h1 className="text-center">{supplier.name}</h1>
                                <div className="row pt-4">
                                    <div className="col-md-4">
                                        {this.renderSupplierImage()}
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
                                <div className="row pt-4 ">
                                    <div className="tab-style3" style={{width: "100%"}}>
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}
                                                >
                                                    Contact
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}
                                                >
                                                    Products
                                                </NavLink>
                                            </NavItem>

                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab} className="tab-content shop_info_tab">
                                            <TabPane tabId="1">
                                                <Row>
                                                    {this.loadEmployee()}
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    {this.loadProducts()}
                                                </Row>
                                            </TabPane>

                                        </TabContent>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            );
        }

    }
}

export default ViewSupplier