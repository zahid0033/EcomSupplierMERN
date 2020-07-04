import React from "react";

const TopBar = () => {
    return (
        <div className="top-header d-none d-md-block">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="header_topbar_info">
                            <div className="header_offer">
                                <span>Free Ground Shipping Over $250</span>
                            </div>
                            <div className="download_wrap">
                                <span className="mr-3">Download App</span>
                                <ul className="icon_list text-center text-lg-left">
                                    <li>
                                        <a href="/#">
                                            <i className="fab fa-apple" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="fab fa-android" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="fab fa-windows" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-4">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                            <div className="widget mb-lg-0">
                                <ul className="social_icons text-center text-lg-left">
                                    <li>
                                        <a href="/#" className="sc_facebook">
                                            <i className="ion-social-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#" className="sc_twitter">
                                            <i className="ion-social-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#" className="sc_google">
                                            <i className="ion-social-googleplus" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#" className="sc_youtube">
                                            <i className="ion-social-youtube-outline" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#" className="sc_instagram">
                                            <i className="ion-social-instagram-outline" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default TopBar