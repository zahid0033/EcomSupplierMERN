import React from "react";
import {Link} from "react-router-dom";
import { Card, CardImg, CardBody} from 'reactstrap';
import {frontendUrl} from "../../../config/config";
import img1 from "../../assets/images/product_img1.jpg";

const SupplierTemplate = (props) => {

    const renderSupplierImage = () => {
        if(props.supplier.image !== null){
            const splitPath = props.supplier.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img style={{width : "100%", height : "150px", borderRadius : "100%"}} src={`${frontendUrl}/images/supplier/${path}`} alt=""/>)
        }else{
            return (<img src={img1} alt=""/>)
        }
    };

    const renderProducts = () => {
                return props.supplier.products.map((product,key) => {
                    const imagePath = JSON.parse(product.images);
                    const splitPath = imagePath[0].split("\\");
                    const path = splitPath[splitPath.length - 1];

                    return (
                        <div className="col-md-3" key={key}>
                            <Card>
                                <CardImg top width="100%" height="150px" src={`${frontendUrl}/images/products/${path}`} alt={product.name} />
                                <CardBody>
                                    <p className="product_title text-center"><b><Link to={`/productDetails/${product.id}`}>{product.name}</Link></b></p>
                                    <span className="price">৳ {product.price}</span><br/>
                                    <span ><b>Model : </b> {product.model}</span>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })
          };

    return (
        <div className="col-md-12 col-12 mb-4">
            <Card>
                <CardBody>
                    <div className="row mb-3">
                        <div className="col-md-2">
                            {renderSupplierImage()}
                        </div>
                        <div className="col-md-10">
                            <h3 className="product_title">
                                <Link to={`/viewSupplier/${props.supplier.id}`} style={{color: "#FF324D"}}>{props.supplier.name}</Link>
                                <span
                                    style={{marginLeft: "25px", fontSize: "15px"}}
                                    className = {
                                        props.supplier.status === "Platinum" ? "badge badge-success"
                                            : props.supplier.status === "Gold" ? "badge badge-warning"
                                            : props.supplier.status === "Verified" ? "badge badge-danger"
                                                : props.supplier.status === "Silver" ? "badge badge-primary"
                                                    : "badge badge-dark"
                                    }
                                >{props.supplier.status}</span>
                            </h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="supplier_sort_info ">
                                        <ul>
                                            <li><i className="linearicons-map-marker"/><b>Address : </b>{props.supplier.address}</li>
                                            <li><i className="linearicons-envelope"/><b>Email : </b>{props.supplier.email}</li>
                                            <li><i className="linearicons-smartphone"/><b>Phone : </b>{props.supplier.phone}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="supplier_sort_info ">
                                        <ul>
                                            <li><i className="linearicons-map-marker"/><b>Business Type : </b>{props.supplier.businessType}</li>
                                            <li><i className="linearicons-envelope"/><b>Ownership : </b>{props.supplier.ownership}</li>
                                            <li><i className="linearicons-smartphone"/><b>Country : </b>{props.supplier.country}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <h3 className="text-center p-3">Products</h3>
                    <div className="row">

                        {renderProducts()}
                    </div>
                </CardBody>
            </Card>
        </div>
    );

};

export default SupplierTemplate