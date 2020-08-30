import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg_gray">
            <div className="footer_top small_pt pb_20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="widget">
                                <div className="footer_logo">
                                    <a href="/#">
                                        <img src="assets/images/logo_dark.png" alt="logo" />
                                    </a>
                                </div>
                                <p className="mb-3">
                                    Grow your business with us
                                </p>
                                <ul className="contact_info">
                                    <li>
                                        <i className="ti-location-pin" />
                                        <p>45 Bijoynagar,Palton,Shaiham Skyview Tower,Dhaka-1000</p>
                                    </li>
                                    <li>
                                        <i className="ti-email" />
                                        <a href="mailto:info@sitename.com">dadavib2b@gmail.com</a>
                                    </li>
                                    <li>
                                        <i className="ti-mobile" />
                                        <p>01709958949</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">

                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="widget">
                                <h6 className="widget_title">Useful Links</h6>
                                <ul className="widget_links">
                                    <li>
                                        <Link to="/about">About Us</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">

                        </div>
                    </div>
                </div>
            </div>
            <div className="middle_footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="shopping_info">
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="icon_box icon_box_style2">
                                            <div className="icon">
                                                <i className="flaticon-shipped" />
                                            </div>
                                            <div className="icon_box_content">
                                                <h5>Free Delivery</h5>
                                                <p>
                                                    Phasellus blandit massa enim elit of passage varius nunc.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="icon_box icon_box_style2">
                                            <div className="icon">
                                                <i className="flaticon-money-back" />
                                            </div>
                                            <div className="icon_box_content">
                                                <h5>30 Day Returns Guarantee</h5>
                                                <p>
                                                    Phasellus blandit massa enim elit of passage varius nunc.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="icon_box icon_box_style2">
                                            <div className="icon">
                                                <i className="flaticon-support" />
                                            </div>
                                            <div className="icon_box_content">
                                                <h5>27/4 Online Support</h5>
                                                <p>
                                                    Phasellus blandit massa enim elit of passage varius nunc.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom_footer border-top-tran">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <p className="mb-lg-0 text-center">
                                © 2020 All Rights Reserved by Dadavi
                            </p>
                        </div>
                        <div className="col-lg-4 order-lg-first">
                            <div className="widget mb-lg-0">
                                <ul className="social_icons text-center text-lg-left">
                                    <li>
                                        <a href="https://www.facebook.com/dadavib2b" className="sc_facebook">
                                            <i className="ion-social-facebook" />
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://www.instagram.com/dadavib2b" className="sc_instagram">
                                            <i className="ion-social-instagram-outline" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">

                        </div>
                    </div>
                </div>
            </div>
        </footer>
)
};
export default Footer;