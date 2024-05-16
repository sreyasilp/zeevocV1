import React from "react";
import PageHelmet from "../../component/common/Helmet";
import { FiHeadphones, FiMail, FiMapPin, FiChevronUp } from "react-icons/fi";
import GoogleMapReact from 'google-map-react';
import ContactTwo from "./ContactTwo";
import Breadcrumb from "../common/Breadcrumb";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import ScrollToTop from 'react-scroll-up';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    return (
        <React.Fragment>
            <PageHelmet pageTitle='Contact' />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            <Breadcrumb title={'Contact Us'} />

            {/* Start Contact Top Area  */}
            <div className="rn-contact-top-area ptb--120 bg_color--5">
                <div className="container">
                    <div className="row">
                        {/* Start Single Address  */}
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="rn-address">
                                <div className="icon">
                                    <FiHeadphones />
                                </div>
                                <div className="inner">
                                    <h4 className="title">Contact With Phone Number</h4>
                                    <p><a href="tel:+057 254 365 456">+91 7403563990</a></p>
                                    <p><a href="tel:+856 325 652 984">+91 9746080576</a></p>
                                </div>
                            </div>
                        </div>
                        {/* End Single Address  */}

                        {/* Start Single Address  */}
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_mobile--50">
                            <div className="rn-address">
                                <div className="icon">
                                    <FiMail />
                                </div>
                                <div className="inner">
                                    <h4 className="title">Email Address</h4>
                                    <p><a href="mailto:zeevocdigital@gmail.com">zeevocdigital@gmail.com</a></p>
                                    <p><a href="mailto:sreyastp444@gmail.com">sreyastp444@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                        {/* End Single Address  */}

                        {/* Start Single Address  */}
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_md--50 mt_sm--50">
                            <div className="rn-address">
                                <div className="icon">
                                    <FiMapPin />
                                </div>
                                <div className="inner">
                                    <h4 className="title">Location</h4>
                                    <p>Moolepadam Rd, Kairali Nagar, Kalamassery, Ernakulam, Kerala</p>
                                </div>
                            </div>
                        </div>
                        {/* End Single Address  */}
                    </div>
                </div>
            </div>
            {/* End Contact Top Area  */}

            {/* Start Contact Page Area  */}
            <div className="rn-contact-page ptb--120 bg_color--1">
                <ContactTwo />
            </div>
            {/* End Contact Page Area  */}

            {/* Start Contact Map  */}
            <div className="rn-contact-map-area position-relative">
                <div style={{ height: '650px', width: '100%' }}>
                    <GoogleMapReact
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        bootstrapURLKeys={{ key: "" }} // Add your API key here
                    >
                        <AnyReactComponent
                            lat={10.052131027349821}
                            lng={76.32506296413644}
                            text="Location"
                        />
                    </GoogleMapReact>
                </div>
            </div>
            {/* End Contact Map  */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}

            <Footer />
        </React.Fragment>
    );
};

export default Contact;
