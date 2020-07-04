import React,{Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import parse from "html-react-parser";
import {apiUrl, frontendUrl} from "../../config/config";
import ReactImageZoom from 'react-image-zoom';

class ProductDetails extends Component{

    state = {
        product : [],
        activeTab : '1',
        zoomImage : null,
        zoomProperty : {
            width: 540,
            height: 450,
            zoomWidth: 500,
            img: null
        }
    };

    componentDidMount() {
        const id = this.props.match.params.productId;
        this.loadProduct(id);
    }

    loadProduct = async (id) => {
       await axios.get(`${apiUrl}/product/get/${id}`)
            .then(response => {
                if (response.data.success){
                    // console.log(response.data.output)
                    this.setState({
                        product : response.data.output
                    })
                }else{
                    alert("error")
                }

            }).catch(error => {
                alert(error)
            });

        const imagePath = JSON.parse(this.state.product.images);
        const splitPath = imagePath[0].split("\\");
        const path = splitPath[splitPath.length - 1];
        await this.setState({
                    zoomProperty : {...this.state.zoomProperty, img :`${frontendUrl}/images/products/${path}`}
                })
    };

    toggle = tab => {
        if (this.state.activeTab !== tab){
            this.setState({
                activeTab : tab
            })
        }
    };

    zoomImageHandler = (path) => {
        this.setState({
            zoomProperty : {...this.state.zoomProperty, img :path}
        })
    };

    productImages = () => {
        const imagePath = JSON.parse(this.state.product.images);
        return imagePath.map((image,key) => {
            const splitPath = image.split("\\");
            const path = splitPath[splitPath.length - 1];
            return (
                <div className="item col-md-3" key={key}>
                    <span
                        className="product_gallery_item active"
                        onClick={()=>this.zoomImageHandler(`${frontendUrl}/images/products/${path}`)}
                    >
                        <img style={{width : "60px", height : "60px"}} src={`${frontendUrl}/images/products/${path}`} alt=""/>
                    </span>
                </div>
            )
        });
    };


    render() {
        if (this.state.product.length === 0){
            return (
                <h1>Loading</h1>
            )
        }else{
            const {product} = this.state;
            return (
                <>
                    <Breadcrumbs title="Product Details"/>
                    <div className="main_content">
                        {/* START SECTION SHOP */}
                        <div className="section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                                        <div className="product-image">
                                            <div className="product_details_img_box">
                                                {
                                                    this.state.zoomProperty.img !== null ?
                                                        <ReactImageZoom {...this.state.zoomProperty} /> : ''
                                                }

                                            </div>
                                            <div className="product_gallery_item">
                                                <div className="row">
                                                    {this.productImages()}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="pr_detail">
                                            <div className="product_description">
                                                <h4 className="product_title">
                                                    <a href="/#">{product.name}</a>
                                                </h4>
                                                <div className="d-block" style={{ width: "100%" , height: "70px"}}>
                                                    <div className="product_price">
                                                        <span className="price">৳ {product.price}</span>
                                                    </div>
                                                    <div className="rating_wrap">
                                                <span
                                                    className = {
                                                        product.supplier.status === "Platinum" ? "badge badge-success"
                                                            : product.supplier.status === "Gold" ? "badge badge-warning"
                                                            : product.supplier.status === "Verified" ? "badge badge-danger"
                                                                : product.supplier.status === "Silver" ? "badge badge-primary"
                                                                    : "badge badge-dark"
                                                    }
                                                >{product.supplier.status}</span>
                                                    </div>
                                                </div>
                                                <div className="pr_desc">
                                                    { parse(product.description) }
                                                </div>
                                                <div className="product_sort_info">
                                                    <ul>
                                                        <li>
                                                            <i className="linearicons-shield-check" /> {product.supplier.name}
                                                        </li>
                                                        <li>
                                                            <i className="linearicons-tag" />{product.model}
                                                        </li>

                                                    </ul>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className="cart_extra">

                                                <div className="cart_btn">
                                                    <Link
                                                        className="btn btn-fill-out btn-addtocart"
                                                        // type="button"
                                                        to={`/viewSupplier/${product.supplier.id}`}

                                                    >
                                                        <i className="icon-user-following" /> Supplier
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <ul className="product-meta">
                                                <li>
                                                    Category: <Link to={`/subCategory/${product.subCategory.id}`}>{product.subCategory.name}</Link>
                                                </li>

                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="large_divider clearfix" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="tab-style3">
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '1' ? "nav-link active" : "nav-link"}
                                                    onClick={() => { this.toggle('1'); }}
                                                >
                                                    Description
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '2' ? "nav-link active" : "nav-link"}
                                                    onClick={() => { this.toggle('2'); }}
                                                >
                                                    Specification
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab} className="tab-content shop_info_tab">
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        { parse(product.description) }
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        { parse(product.specification) }
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="small_divider" />
                                        <div className="divider" />
                                        <div className="medium_divider" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* END SECTION SHOP */}

                    </div>
                </>



            )
        }


    }
}

export default ProductDetails