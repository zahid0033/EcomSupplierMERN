import React from "react";
import shopBanner1 from "../assets/images/shop_banner_img3.jpg";
import shopBanner2 from "../assets/images/shop_banner_img4.jpg";
import shopBanner3 from "../assets/images/shop_banner_img5.jpg";

//slider
import ProductSlider from '../components/slider/ProductSlider';
import Banner from "../components/slider/banner";


const Home = () => {

    return (
        <>
            <Banner/>

            <div className="main_content mt-4">
            {/* START SECTION SHOP */}
            <div className="section small_pb">
                <div className="container">
                    {/* Latest Product */}
                    <div className="row">
                        <div className="col-12">
                            <div className="heading_tab_header">
                                <div className="heading_s2">
                                    <h2>Latest Products</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tab_slider">
                                <ProductSlider/>
                            </div>
                        </div>
                    </div>
                    {/* Exclusive Product */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="heading_tab_header">
                                <div className="heading_s2">
                                    <h2>Exclusive Products</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tab_slider">
                                <ProductSlider/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* END SECTION SHOP */}
            {/* START SECTION BANNER */}
            <div className="section pb_20 small_pt">
                <div className="container">
                    <div className="row">
                        {/*<div className="col-md-6">*/}
                        {/*    <div className="single_banner">*/}
                        {/*        <img*/}
                        {/*            src={img2}*/}
                        {/*            alt="shop_banner_img1"*/}
                        {/*        />*/}
                        {/*        <div className="single_banner_info">*/}
                        {/*            <h5 className="single_bn_title1">Super Sale</h5>*/}
                        {/*            <h3 className="single_bn_title">New Collection</h3>*/}
                        {/*            <a href="shop-left-sidebar.html" className="single_bn_link">*/}
                        {/*                Shop Now*/}
                        {/*            </a>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-6">*/}
                        {/*    <div className="single_banner">*/}
                        {/*        <img*/}
                        {/*            src="assets/images/shop_banner_img2.jpg"*/}
                        {/*            alt="shop_banner_img2"*/}
                        {/*        />*/}
                        {/*        <div className="single_banner_info">*/}
                        {/*            <h3 className="single_bn_title">New Season</h3>*/}
                        {/*            <h4 className="single_bn_title1">Sale 40% Off</h4>*/}
                        {/*            <a href="shop-left-sidebar.html" className="single_bn_link">*/}
                        {/*                Shop Now*/}
                        {/*            </a>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            {/* END SECTION BANNER */}


            {/* START SECTION BANNER */}
            <div className="section pb_20 small_pt">
                <div className="container-fluid px-2">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <div className="sale_banner">
                                <a className="hover_effect1" href="/#">
                                    <img
                                        src={shopBanner1}
                                        alt="shop_banner_img3"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="sale_banner">
                                <a className="hover_effect1" href="/#">
                                    <img
                                        src={shopBanner2}
                                        alt="shop_banner_img4"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="sale_banner">
                                <a className="hover_effect1" href="/#">
                                    <img
                                        src={shopBanner3}
                                        alt="shop_banner_img5"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END SECTION BANNER */}
            {/* START SECTION SHOP */}
            <div className="section small_pt pb_20">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading_tab_header">
                                <div className="heading_s2">
                                    <h2>Featured Products</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tab_slider">
                                <ProductSlider/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END SECTION SHOP */}
            {/* START SECTION CLIENT LOGO */}
            <div className="section small_pt">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading_tab_header">
                                <div className="heading_s2">
                                    <h2>Our Brands</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="client_logo carousel_slider owl-carousel owl-theme nav_style3"
                                data-dots="false"
                                data-nav="true"
                                data-margin={30}
                                data-loop="true"
                                data-autoplay="true"
                                data-responsive='{"0":{"items": "2"}, "480":{"items": "3"}, "767":{"items": "4"}, "991":{"items": "5"}}'
                            >
                                <div className="item">
                                    <div className="cl_logo">
                                        <img src="assets/images/cl_logo1.png" alt="cl_logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="cl_logo">
                                        <img src="assets/images/cl_logo2.png" alt="cl_logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="cl_logo">
                                        <img src="assets/images/cl_logo3.png" alt="cl_logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="cl_logo">
                                        <img src="assets/images/cl_logo4.png" alt="cl_logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="cl_logo">
                                        <img src="assets/images/cl_logo5.png" alt="cl_logo" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="cl_logo">
                                        <img src="assets/images/cl_logo6.png" alt="cl_logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END SECTION CLIENT LOGO */}
            {/* START SECTION SUBSCRIBE NEWSLETTER */}
            <div className="section bg_dark small_pt small_pb">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="heading_s1 mb-md-0 heading_light">
                                <h3>Subscribe Our Newsletter</h3>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="newsletter_form">
                                <form>
                                    <input
                                        type="text"
                                        required
                                        className="form-control rounded-0"
                                        placeholder="Enter Email Address"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-fill-out rounded-0"
                                        name="submit"
                                        value="Submit"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* START SECTION SUBSCRIBE NEWSLETTER */}
        </div>
        </>
    )
}
    export default Home;