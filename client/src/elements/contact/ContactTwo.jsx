import React, { Component } from "react";
import ContactForm from "./ContactForm";

class ContactTwo extends Component {
    render() {
        return (
            <div className="contact-form--1">
                <div className="container">
                    <div className="row row--35 align-items-start">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="section-title text-left mb--50">
                                <h2 className="title">Contact Us</h2>
                                <p className="description">Have questions or inquiries? Feel free to reach out to us. We're here to assist you with any queries. </p>
                            </div>

                            <div className="contact-form-wrapper">
                                <ContactForm />
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <div className="thumbnail mb_md--30 mb_sm--30">
                                <img src="/assets/images/about/about-6.jpg" alt="Zeevoc" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactTwo;