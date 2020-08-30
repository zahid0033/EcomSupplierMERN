import React from "react";

const TopBar = () => {
    return (
        <div className="top-header d-none d-md-block">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-8">

                    </div>
                    <div className="col-lg-6 col-md-4">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-end">
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
                    </div>

                </div>
            </div>
        </div>
    )
}
export default TopBar