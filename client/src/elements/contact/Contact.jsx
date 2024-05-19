import React from "react";
import PageHelmet from "../../component/common/Helmet";
import { FiHeadphones, FiMail, FiMapPin, FiChevronUp } from "react-icons/fi";
import ContactTwo from "./ContactTwo";
import Breadcrumb from "../common/Breadcrumb";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import ScrollToTop from 'react-scroll-up';

const Contact = () => {
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
            <div className="rn-contact-map-area position-relative text-center">
                <iframe
                    title='Google Maps'
                    src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1528.4551660067987!2d76.32428091867902!3d10.052047630970423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDAzJzA3LjYiTiA3NsKwMTknMzAuMiJF!5e0!3m2!1sen!2sin!4v1716004333170!5m2!1sen!2sin'
                    frameBorder=''
                    style={{ border: 0, width: '98%', height: '500px' }}
                    allowFullScreen
                ></iframe>
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
