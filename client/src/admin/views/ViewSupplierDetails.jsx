/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{Component} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col, Table, Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";
import axios from "axios";
import {tbody} from "../variables/general";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/config";
import authHeader from "../adminServices/authHeader";

class ViewSupplierDetails extends Component {
    state = {
        supplier : [],
        activeTab : '1',
        status : "Platinum",
        statusEdit : true
    };

    toggle = tab => {
        if (this.state.activeTab !== tab){
            this.setState({
                activeTab : tab
            })
        }
    };

    componentDidMount() {
        const id = this.props.match.params.supplierId;
        this.loadSupplier(id);
    }

    loadSupplier = async (id) => {
        await axios.get(`http://localhost:8000/supplier/get/${id}`)
            .then(response => {
                if (response.data.success){
                    // console.log(response.data.output)
                    this.setState({
                        supplier : response.data.output[0]
                    })
                }else{
                    alert("error")
                }

            }).catch(error => {
                alert(error)
            })
    };

    loadEmployee = () => {
        return this.state.supplier.employees.map((employee,key) => {
            return (
                <Card key={key}>
                    <CardBody>
                        {employee.name}
                    </CardBody>
                </Card>
            )
        })
    };

    loadProducts = () => {
        return this.state.supplier.products.map((product,key) => {
            return (
                <Col md="4" key={key}>
                    <Card>
                        <CardBody>
                            <h4><b>Name : </b>{product.name}</h4>
                            <p><b>Price : </b>৳ {product.price}</p>
                            <p><b>Category : </b>৳ {product.price}</p>
                            <Link to={`/productDetails/${product.id}`}>Details</Link>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    };

    statusEditHandle = () => {
        this.setState({
            statusEdit : !this.state.statusEdit
        })
    };

    sendSave = async () => {
        await axios.post(`${apiUrl}/supplier/statusUpdate`,{status : this.state.status,id: this.state.supplier.id},{headers : {"x-access-token" : authHeader()}})
                .then(res => {
                    this.loadSupplier(this.state.supplier.id);
                    this.statusEditHandle();
                    this.props.handleNotification("tr","Status Successfully Updated");
                })
                .catch(error => {
                    if (error.response.data.isAuth === false){
                        this.props.handleNotification("tr",error.response.data.message);
                        this.statusEditHandle();
                    }
                })
    };

    render() {
        if (this.state.supplier.length === 0){
            return (
                <h1>Loading</h1>
            )
        }else{
            const {supplier} = this.state;
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col md="1"></Col>
                            <Col md="10">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title text-center">{supplier.name}</h5>
                                        <p className="text-center">{supplier.description}</p>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="8">
                                                <Table striped borderless responsive>
                                                    <tbody>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>
                                                        {
                                                            this.state.statusEdit ?
                                                                <>
                                                                    <div className="row">
                                                                        <div className="col-md-9">
                                                                            {supplier.status}
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <span className="badge badge-primary" onClick={this.statusEditHandle}><i className="now-ui-icons loader_gear"></i></span>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                                :
                                                                <div className="form-row pt-2">
                                                                    <div className="form-group col-md-6">
                                                                        <select id="inputState" className="form-control"
                                                                                onChange={(value) => this.setState({status: value.target.value})}>
                                                                            <option>Choose...</option>
                                                                            <option value="Platinum">Platinum</option>
                                                                            <option value="Gold">Gold</option>
                                                                            <option value="Silver">Silver</option>
                                                                            <option value="Verified">Verified</option>
                                                                            <option value="Non-Verified">Non-Verified</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-4">
                                                                        <button type="submit" className="btn btn-primary"
                                                                                onClick={() => this.sendSave()}>Save
                                                                        </button>
                                                                    </div>
                                                                    <div className="form-group col-md-2">
                                                                        <span className="badge badge-danger" onClick={this.statusEditHandle}><i className="now-ui-icons ui-1_simple-remove"></i></span>
                                                                    </div>

                                                                </div>
                                                        }
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th>Address</th>
                                                        <td>{supplier.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone </th>
                                                        <td>{supplier.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email </th>
                                                        <td>{supplier.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Ownership </th>
                                                        <td>{supplier.ownership}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Business Type </th>
                                                        <td>{supplier.businessType}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Country </th>
                                                        <td>{supplier.country}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>

                                            </Col>
                                            <Col md="4">
                                                <img
                                                    alt=".."
                                                    className="supplier_img border-gray"
                                                    src={require("../assets/img/mike.jpg")}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="tab-style3">
                                                    <Nav tabs>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === '1' ? "nav-link active" : "nav-link"}
                                                                onClick={() => { this.toggle('1'); }}
                                                            >
                                                                Employees
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === '2' ? "nav-link active" : "nav-link"}
                                                                onClick={() => { this.toggle('2'); }}
                                                            >
                                                                Products
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                    <TabContent activeTab={this.state.activeTab} className="tab-content shop_info_tab">
                                                        <TabPane tabId="1">
                                                            <Row>
                                                                <Col sm="12">
                                                                    {this.loadEmployee()}
                                                                </Col>
                                                            </Row>
                                                        </TabPane>
                                                        <TabPane tabId="2">
                                                            <Row className="mt-3">
                                                                {this.loadProducts()}
                                                            </Row>
                                                        </TabPane>
                                                    </TabContent>
                                                </div>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="1"></Col>
                        </Row>
                    </div>
                </>
            );
        }

    }
}

export default ViewSupplierDetails;
