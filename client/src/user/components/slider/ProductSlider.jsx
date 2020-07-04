import React,{Component} from "react";
//slick slider
import Slider from "react-slick";

import axios from 'axios';
import {apiUrl} from "../../../config/config";
import ProductTemplateTwo from "../../widgets/Product/productTemplateTwo";

class ProductSlider extends Component {

    state = {
        products : []
    };

    componentDidMount() {
        axios.get(`${apiUrl}/product`)
            .then(response => {
                this.setState({
                    products : response.data.output
                })
            })
    }

    loadProducts = () => {
        return this.state.products.map((product,key) => {
            return <ProductTemplateTwo product={product} key={key}/>
        })
    };

    render() {
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
        console.log(this.state.product);
        return (
            <Slider {...settings} className="product_slider carousel_slider owl-carousel owl-theme nav_style1">
                {/*<SliderTemplate data={this.state.product}/>*/}
                {this.loadProducts()}
            </Slider>
        )
    }
}

export default ProductSlider;