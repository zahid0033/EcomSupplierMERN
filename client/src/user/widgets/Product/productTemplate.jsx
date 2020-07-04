import React,{Component} from "react";
import {Link} from "react-router-dom";
import parse from "html-react-parser";
import {frontendUrl} from "../../../config/config";

class ProductTemplate extends Component{
    render() {
        const product = this.props.product;
        let description  = parse(product.description);

        const imagePath = JSON.parse(product.images);
        const splitPath = imagePath[0].split("\\");
        const path = splitPath[splitPath.length - 1];

        return (
            <div className="col-md-4 col-6">
                <div className="product">
                    {/*<span className="pr_flash bg-success">{product.supplier.status}</span>*/}
                    <span
                        className ={
                              product.supplier.status === "Platinum" ? "pr_flash bg-success"
                            : product.supplier.status === "Gold" ? "pr_flash bg-warning"
                            : product.supplier.status === "Verified" ? "pr_flash bg-danger"
                            : product.supplier.status === "Silver" ? "pr_flash bg-primary"
                            : "pr_flash bg-dark"
                        }
                    >{product.supplier.status}</span>


                    <div className="product_img">
                        <Link
                            // href="shop-product-detail.html"
                            to={`/productDetails/${product.id}`}
                        >
                            <img
                                src={`${frontendUrl}/images/products/${path}`} alt={product.name} style={{height: "270px"}}
                            />
                        </Link>
                    </div>
                    <div className="product_info">
                        <h6 className="product_title">
                            <Link to={`/productDetails/${product.id}`}>{product.name}</Link>
                        </h6>
                        <div className="product_price">
                            <span className="price">৳ {product.price}</span>

                        </div>
                        <div className="rating_wrap">
                            {/*<span className="rating_num">*/}
                                <span
                                    className ={
                                        product.supplier.status === "Platinum" ? "rating_num badge badge-success"
                                            : product.supplier.status === "Gold" ? "rating_num badge badge-warning"
                                            : product.supplier.status === "Verified" ? "rating_num badge badge-danger"
                                                : product.supplier.status === "Silver" ? "rating_num badge badge-primary"
                                                    : "rating_num bg-dark"
                                    }
                                >{product.supplier.status}</span>
                            {/*</span>*/}
                        </div>
                        <div className="pr_desc">
                            { description.length > 60 ? description.substring(0,60) + " ......" : description}
                        </div>
                        <div className="product_sort_info">
                            <ul>
                                <li>
                                    <i className="linearicons-tag" /> {product.model}
                                </li>
                                <li>
                                    <i className="linearicons-shield-check" /> {product.supplier.name}
                                </li>
                            </ul>
                        </div>

                        <div className="list_product_action_box">
                            <ul className="list_none pr_action_btn">
                                <li className="add-to-cart">
                                    <Link to={`/productDetails/${product.id}`}>
                                        <i className="icon-magnifier-add" /> Details
                                    </Link>
                                </li>
                                <li className="add-to-cart">
                                    <Link to={`/viewSupplier/${product.supplier.id}`}>
                                        <i className="icon-user-following" /> Supplier
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductTemplate