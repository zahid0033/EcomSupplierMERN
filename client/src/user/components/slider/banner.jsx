import React,{Component} from "react";
import axios from 'axios'
import {apiUrl, frontendUrl} from "../../../config/config";
import Slider from 'react-slick';


class Banner extends Component{
    state = {
        banners : [],
    };

    componentDidMount() {
        axios.get(`${apiUrl}/banner`)
            .then(res => {
                this.setState({
                    banners : res.data.output
                })
            })
            .catch(error => {
                alert(error);
            });
    }

    renderBanners = () => {
        return this.state.banners.map((banner,key) => {
            const splitPath = banner.image.split("\\");
            const path = splitPath[splitPath.length - 1];
            return (
                <div className="carousel slide carousel-fade light_arrow" key={key}>
                        <div className="carousel-inner">
                            <div className="carousel-item active background_bg" >
                                <img style={{width : "100%", height : "600px"}} src={`${frontendUrl}/images/banner/${path}`} alt=""/>
                                <div className="banner_slide_content">
                                    <div className="container">
                                        {/* STRART CONTAINER */}
                                        <div className="row">
                                            <div className="col-lg-7 col-9">
                                                <div className="banner_content overflow-hidden">
                                                    <h2
                                                        className="staggered-animation"
                                                        data-animation="slideInLeft"
                                                        data-animation-delay="1s"
                                                    >
                                                        {banner.text}
                                                    </h2>
                                                    {/*<a*/}
                                                    {/*    className="btn btn-fill-out rounded-0 staggered-animation text-uppercase"*/}
                                                    {/*    href="shop-left-sidebar.html"*/}
                                                    {/*>*/}
                                                    {/*    Shop Now*/}
                                                    {/*</a>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END CONTAINER*/}
                                </div>
                            </div>
                        </div>
                </div>
            )
        })
    };

    render() {
        var setting = {
            dots: true,
            autoplay: true,
            infinite: true,
            speed: 500,
            arrow:true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="banner_section slide_medium shop_banner_slider staggered-animation-wrap" >
                <Slider  {...setting}>
                    {this.renderBanners()}
                </Slider>
            </div>
        );
    }
}

export default Banner