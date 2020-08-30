import React,{Component} from "react";
import axios from "axios";
import {apiUrl, frontendUrl} from "../../config/config";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import parse from "html-react-parser";

class ViewProductsDetails extends Component{

    state = {
        product : [],
        activeTab : '1'
    };

    componentDidMount() {
        const id = this.props.match.params.productId;
        this.loadProducts(id);
    }

    toggle = tab => {
        if (this.state.activeTab !== tab){
            this.setState({
                activeTab : tab
            })
        }
    };

    loadProducts = async (id) => {
        await axios.get(`/api/product/get/${id}`)
            .then(response => {
                if (response.data.success){
                    this.setState({
                        product : response.data.output
                    })
                }else{
                    alert("error")
                }

            }).catch(error => {
                alert(error)
            })
    };

    productImages = () => {
        const imagePath = JSON.parse(this.state.product.images);
        return imagePath.map((image,key) => {
            const splitPath = image.split("\\");
            const path = splitPath[splitPath.length - 1];
            return (
                <div className="item col-md-3" key={key}>
                        <img style={{width : "100%", height : "120px"}} src={`/images/products/${path}`} alt=""/>
                </div>
            )
        });
    };

    render() {
        const {product} = this.state;
        if (this.state.product.length === 0){
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col md="12">
                                <Card>
                                    <h1>Loading</h1>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col md="1"></Col>
                            <Col md="10">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title text-center">{product.name}</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="6">
                                                <p><b>Supplier : </b><span className="mr-3">{product.supplier.name}</span>
                                                    <span
                                                        className = {
                                                            product.supplier.status === "Platinum" ? "badge badge-success"
                                                                : product.supplier.status === "Gold" ? "badge badge-warning"
                                                                : product.supplier.status === "Verified" ? "badge badge-danger"
                                                                    : product.supplier.status === "Silver" ? "badge badge-primary"
                                                                        : "badge badge-dark"
                                                        }
                                                    > {product.supplier.status} </span>
                                                </p>
                                                <p><b>Price : </b>৳ {product.price}</p>
                                                <p><b>Model : </b>{product.model}</p>
                                            </Col>
                                            <Col md="6">
                                                <Row>
                                                    {this.productImages()}
                                                </Row>
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
                                                                Specification
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === '2' ? "nav-link active" : "nav-link"}
                                                                onClick={() => { this.toggle('2'); }}
                                                            >
                                                                Description
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                    <TabContent activeTab={this.state.activeTab} className="tab-content shop_info_tab">
                                                        <TabPane tabId="1">
                                                            <Row>
                                                                <Col sm="12">
                                                                    {parse(product.specification)}
                                                                </Col>
                                                            </Row>
                                                        </TabPane>
                                                        <TabPane tabId="2">
                                                            <Row className="mt-3">
                                                                <Col sm="12">
                                                                    {parse(product.description)}
                                                                </Col>
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

export default ViewProductsDetails