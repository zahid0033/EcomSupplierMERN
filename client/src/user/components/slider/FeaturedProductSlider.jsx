import React,{Component} from "react";
import axios from "axios";
import {apiUrl} from "../../../config/config";
import ProductTemplateTwo from "../../widgets/Product/productTemplateTwo";
import Slider from "react-slick";

class FeaturedProductSlider extends Component{
    state = {
        products : [],
        featuredProducts : []
    };

    async componentDidMount() {
        await axios.get(`${apiUrl}/product`)
            .then(response => {
                this.setState({
                    products : response.data.output
                })
            }).catch(error => {
                alert(error)
            });
        var featuredProducts = this.state.products.filter(product => {
            return product.featured === "yes" && product.supplier.status !== "Non-Verified"
        });
        this.setState({
            featuredProducts : featuredProducts
        });
    }

    loadProducts = () => {
        return this.state.featuredProducts.map((product,key) => {
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
        console.log("exclusive",this.state.exclusiveProducts);
        return (
            <Slider {...settings} className="product_slider carousel_slider owl-carousel owl-theme nav_style1">
                {/*<SliderTemplate data={this.state.product}/>*/}
                {this.loadProducts()}
            </Slider>
        )
    }
}

export default FeaturedProductSlider