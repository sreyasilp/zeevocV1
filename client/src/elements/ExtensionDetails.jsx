import React, { useState } from "react";
import PageHelmet from "../component/common/Helmet";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import axios from "axios";
import dotenv from 'dotenv'; //to fix this latrr
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
dotenv.config();

const ExtensionDetails = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const displayRazorpay = async () => {
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
            const payOptions = {
                amount: 1000, // amount in smallest currency unit
                currency: "INR",
                receipt: "101",
            };
            const result = await axios.post("http://localhost:4444/payment/orders", payOptions);

            if (!result) {
                toast.error("Server error. Are you online?");
                return;
            }
            toast.success("Order successful!");

            const { amount, id: order_id, currency } = result.data;
            var test = process.env.RAZORPAY_KEY_ID; //TODO
            const options = {

                key: "rzp_test_PtZ63SYmWjwy8t", //TODO
                amount: amount.toString(),
                currency: currency,
                name: "Sreyas",
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await axios.post("http://localhost:4444/payment/success", data);

                    alert(result.data.msg);
                },
                prefill: {
                    name: "Sreyas",
                    email: "sreyastp444@gmailc.com",
                    contact: "7403563990",
                },
                notes: {
                    address: "Sreyas TP Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error occurred:", error);
            toast.error("Error occurred. Please try again later.");
        }
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    return (
        <React.Fragment>
            <PageHelmet pageTitle='Portfolio Details' />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            {/* Start Breadcrump Area */}
            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--4" data-black-overlay="7">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="rn-page-title text-center pt--100">
                                <h2 className="title theme-gradient">Getting tickets to the big show</h2>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrump Area */}

            {/* Start Portfolio Details */}
            <div className="rn-portfolio-details ptb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-details">
                                <div className="inner">
                                    <h2>Zeevoc</h2>
                                    <p className="subtitle">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commod viverra maecenas accumsan lacus vel facilisis. ut labore et dolore magna aliqua. </p>

                                    <div className="portfolio-view-list d-flex flex-wrap">
                                        <div className="port-view">
                                            <span>Branch</span>
                                            <h4>Ability</h4>
                                        </div>

                                        <div className="port-view">
                                            <span>Project Types</span>
                                            <h4>Website</h4>
                                        </div>

                                        <div className="port-view">
                                            <span>Program</span>
                                            <h4>View Project</h4>
                                        </div>
                                    </div>

                                    <button className="App-link" onClick={displayRazorpay}>
                                        Pay ₹500
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Portfolio Details */}


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

export default ExtensionDetails;
