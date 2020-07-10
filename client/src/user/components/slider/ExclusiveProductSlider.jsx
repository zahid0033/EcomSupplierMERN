import React,{Component} from "react";
import axios from "axios";
import {apiUrl} from "../../../config/config";
import ProductTemplateTwo from "../../widgets/Product/productTemplateTwo";
import Slider from "react-slick";

class ExclusiveProductSlider extends Component{
    state = {
        products : [],
        exclusiveProducts : []
    };

    componentDidMount() {
       this.loadProducts();
    }

    loadProducts = async () => {
        await axios.get(`${apiUrl}/product`)
            .then(response => {
                this.setState({
                    products : response.data.output
                })
            }).catch(error => {
                alert(error)
            });
        let exclusiveProduct = this.state.products.filter(product => {
            return product.exclusive === "yes" && product.supplier.status !== "Non-Verified"
        });
        this.setState({
            exclusiveProducts : exclusiveProduct
        });
    };

    renderProducts = () => {
        return this.state.exclusiveProducts.map((product,key) => {
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
                {this.renderProducts()}
            </Slider>
        )
    }
}

export default ExclusiveProductSlider