import React,{Component} from "react";
import shopBanner1 from "../assets/images/shop_banner_img3.jpg";
import shopBanner2 from "../assets/images/shop_banner_img4.jpg";
import shopBanner3 from "../assets/images/shop_banner_img5.jpg";

//slider
import ProductSlider from '../components/slider/ProductSlider';
import ExclusiveProductSlider from "../components/slider/ExclusiveProductSlider";
import FeaturedProductSlider from "../components/slider/FeaturedProductSlider";
import Banner from "../components/slider/banner";

import axios from "axios";
import {apiUrl, frontendUrl} from "../../config/config";

class Home extends Component {

    state = {
        advertises : []
    };

    async componentDidMount() {
        await axios.get(`/api/advertise`)
            .then(res => {
                this.setState({
                    advertises: res.data.output
                })
            }).catch(error => {
                alert(error)
            })
    }

    afterLatestProductBanner = () => {
       return this.state.advertises.map((advertise,key) => {
           if (advertise.position === "after-latest-products"){
               const splitPath = advertise.image.split("\\");
               const path = splitPath[splitPath.length - 1];
               return (
                   <div className="col-md-12 mt-2" key={key}>
                       <div className="sale_banner">
                           <a className="hover_effect1" href="/#">
                               <img src={`/images/advertise/${path}`} alt=""/>
                           </a>
                       </div>
                   </div>
               )
           }
       });
    };

    afterExclusiveProductBanner = () => {
        let addvert = this.state.advertises.filter(advertise => {
            return advertise.position.includes("after-exclusive-products")
        });
        return addvert.map((advertise,key) => {
            const splitPath = advertise.image.split("\\");
            const path = splitPath[splitPath.length - 1];
            return (
                <div className="col-md-4">
                    <div className="sale_banner">
                        <a className="hover_effect1" href="/#">
                            <img src={`/images/advertise/${path}`} alt=""/>
                        </a>
                    </div>
                </div>
            )
        })
    };

    afterFeaturedProductBanner = () => {
        return this.state.advertises.map((advertise,key) => {
            if (advertise.position === "after-featured-products"){
                const splitPath = advertise.image.split("\\");
                const path = splitPath[splitPath.length - 1];
                return (
                    <div className="col-md-12 mt-2" key={key}>
                        <div className="sale_banner">
                            <a className="hover_effect1" href="/#">
                                <img src={`/images/advertise/${path}`} alt=""/>
                            </a>
                        </div>
                    </div>
                )
            }
        });
    };

    render () {
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
                            <div className="row">
                                {this.afterLatestProductBanner()}
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
                                        {/*<ProductSlider/>*/}
                                        <ExclusiveProductSlider/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* END SECTION SHOP */}

                    {/* START SECTION BANNER */}
                    <div className="section pb_20 small_pt">
                        <div className="container-fluid px-2">
                            <div className="row no-gutters">
                                {this.afterExclusiveProductBanner()}
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
                                        <FeaturedProductSlider/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {this.afterFeaturedProductBanner()}
                            </div>
                        </div>
                    </div>
                    {/* END SECTION SHOP */}

                </div>
            </>
        )
    }

}
    export default Home;