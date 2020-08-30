import React from "react";

const About = () => {
    return (
        <div>
            {/* START SECTION BREADCRUMB */}
            <div className="breadcrumb_section bg_gray page-title-mini">
                <div className="container">
                    {/* STRART CONTAINER */}
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="page-title">
                                <h1>About Us</h1>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb justify-content-md-end">
                                <li className="breadcrumb-item">
                                    <a href="/#">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="/#">Pages</a>
                                </li>
                                <li className="breadcrumb-item active">About</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* END CONTAINER*/}
            </div>
            {/* END SECTION BREADCRUMB */}
            {/* START MAIN CONTENT */}
            <div className="main_content">
                {/* STAT SECTION ABOUT */}
                <div className="section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about_img scene mb-4 mb-lg-0">
                                    <img src="assets/images/about_img.jpg" alt="about_img" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="heading_s1">
                                    <h2>Who We are</h2>
                                </div>
                                <p>
                                    Dadavi is an ecommerce platform where we focus on building communication between supplier and customers.
                                    We ensure best supplier with the valid good products. Which will save your money and time. On the other hand
                                    its a big platform for the suppliers who are new to business with quality products.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
                {/* END SECTION ABOUT */}

                {/* START SECTION SHOP INFO */}
                <div className="section pb_70">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-lg-4">
                                <div className="icon_box icon_box_style1">
                                    <div className="icon">
                                        <i className="flaticon-shipped" />
                                    </div>
                                    <div className="icon_box_content">
                                        <h5>Best Merchant</h5>
                                        <p>
                                            We have so far the best Merchants.Which will help in your business
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="icon_box icon_box_style1">
                                    <div className="icon">
                                        <i className="flaticon-money-back" />
                                    </div>
                                    <div className="icon_box_content">
                                        <h5>Easy Communication</h5>
                                        <p>
                                            You can easily communicate with our suppliers for your respective business
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="icon_box icon_box_style1">
                                    <div className="icon">
                                        <i className="flaticon-support" />
                                    </div>
                                    <div className="icon_box_content">
                                        <h5>27/4 Support</h5>
                                        <p>
                                            We are ready to help you any time for any problem
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END SECTION SHOP INFO */}

            </div>
            {/* END MAIN CONTENT */}
        </div>
)
};
export default About