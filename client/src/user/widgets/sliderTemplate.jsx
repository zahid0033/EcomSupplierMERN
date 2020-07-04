import React from "react";

//slick slider
import Slider from "react-slick";
import {frontendUrl} from "../../config/config";
import {Link} from "react-router-dom";

const SliderTemplate = (props) => {
    let settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        }]
    };
    const template = props.data.map( (item,key) => {
        const imagePath = JSON.parse(item.images);
        const splitPath = imagePath[0].split("\\");
        const path = splitPath[splitPath.length - 1];
        return (
                <div className="item" key={key}>
                    <div className="product">
                        <div className="product_img">
                            <a href="/#">
                                <img
                                    src={`${frontendUrl}/images/products/${path}`}
                                    alt={item.name}
                                    style={{height: "295px"}}
                                />
                            </a>
                            <div className="product_action_box">
                                <ul className="list_none pr_action_btn">
                                    <li className="add-to-cart">
                                        <a href="/#">
                                            <i className="icon-basket-loaded" /> Add To Cart
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//bestwebcreator.com/shopwise/demo/shop-compare.html"
                                            className="popup-ajax"
                                        >
                                            <i className="icon-shuffle" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//bestwebcreator.com/shopwise/demo/shop-quick-view.html"
                                            className="popup-ajax"
                                        >
                                            <i className="icon-magnifier-add" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="icon-heart" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="product_info">
                            <h6 className="product_title">
                                <Link to={`productDetails/${item.id}`}>
                                    {item.name}
                                </Link>
                            </h6>
                            <div className="product_price">
                                <span className="price">৳{item.price}</span>
                            </div>

                        </div>
                    </div>
                </div>

        )
    });



    return (
        <Slider {...settings} className="product_slider carousel_slider owl-carousel owl-theme nav_style1">
            {template}
        </Slider>
    )
};

export default SliderTemplate

