import React from "react";
import {Link} from "react-router-dom";
import {frontendUrl} from "../../../config/config";

const ProductTemplateTwo = (props) => {
    const product = props.product;

    const imagePath = JSON.parse(product.images);
    const splitPath = imagePath[0].split("\\");
    const path = splitPath[splitPath.length - 1];

    return (
        <>
            <div className="product">
                {props.showStatus ?
                    <span
                        className ={
                            product.supplier.status === "Platinum" ? "rating_num badge badge-success"
                                : product.supplier.status === "Gold" ? "rating_num badge badge-warning"
                                : product.supplier.status === "Verified" ? "rating_num badge badge-danger"
                                    : product.supplier.status === "Silver" ? "rating_num badge badge-primary"
                                        : "rating_num bg-dark"
                        }
                    >{product.supplier.status}</span>
                    : ''
                }

                <div className="product_img">
                    <a href="shop-product-detail.html">
                        <img
                            src={`${frontendUrl}/images/products/${path}`}
                            alt={product.name}
                            style={{width: "100%",height: "270px"}}
                        />
                    </a>
                    <div className="product_action_box">
                        <ul className="list_none pr_action_btn">
                            <li>
                                <Link
                                    to={`/productDetails/${product.id}`}
                                    className="popup-ajax"
                                >
                                    <i className="icon-magnifier-add" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="product_info">
                    <h6 className="product_title">
                        <Link to={`/productDetails/${product.id}`}>{product.name}</Link>
                    </h6>
                    <div className="product_price">
                        <span className="price">৳ {product.price}</span>
                    </div>
                    <div className="product_sort_info">
                        <ul>
                            {
                                props.showStatus ?
                                    <li>
                                        <i className="linearicons-shield-check" /> {product.supplier.name}
                                    </li>
                                    : ''
                            }

                            <li>
                                <i className="linearicons-tag" />{product.model}
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProductTemplateTwo