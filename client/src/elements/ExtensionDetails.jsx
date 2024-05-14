import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PageHelmet from "../component/common/Helmet";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import axios from "axios";
import dotenv from 'dotenv'; //to fix this latrr
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getExtensionById } from "../api";
dotenv.config();

const ExtensionDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [extensionData, setExtensionData] = useState({});
    const { extensionId } = useParams();

    const openModal = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        const fetchExtensionData = async () => {
            try {
                const response = await getExtensionById(extensionId);
                setExtensionData(response.data);
            } catch (error) {
                console.error("Error fetching extension data:", error);
                toast.error("Error fetching extension data. Please try again later.");
            }
        };

        fetchExtensionData();
    }, [extensionId]);


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
            <PageHelmet pageTitle={extensionData.title} />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            {/* Start Breadcrump Area */}
            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--4" data-black-overlay="7">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="rn-page-title text-center pt--100">
                                <h2 className="title theme-gradient">{extensionData.title}</h2>
                                <p>{extensionData.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrump Area */}

            {/* Start Extension Details */}
            <div className="rn-portfolio-details ptb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-details">
                                <div className="inner">
                                    {/* <h2>{extensionData.name}</h2> */}
                                    <h2>Import Export Extension</h2>
                                    <p className="subtitle">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commod viverra maecenas accumsan lacus vel facilisis. ut labore et dolore magna aliqua. </p>

                                    <p className="subtitle">{extensionData.subtitle}</p>
                                    <p>{extensionData.description}</p>

                                    {/* Features */}
                                    <div className="extension-features">
                                        <h3>Key Features:</h3>
                                        <ul>
                                            {/* {extensionData.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))} */}
                                        </ul>
                                    </div>

                                    {/* Benefits */}
                                    <div className="extension-benefits">
                                        <h3>Benefits:</h3>
                                        {/* <ul>
                                            {extensionData.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul> */}
                                    </div>

                                    {/* Pricing */}
                                    <div className="extension-pricing">
                                        <h3>Pricing:</h3>
                                        <p>{extensionData.pricing}</p>
                                    </div>

                                    {/* Compatibility */}
                                    <div className="extension-compatibility">
                                        <h3>Compatibility:</h3>
                                        <p>{extensionData.compatibility}</p>
                                    </div>

                                    {/* Customer Reviews */}
                                    <div className="extension-reviews">
                                        <h3>Customer Reviews:</h3>
                                        {/* <ul>
                                            {extensionData.reviews.map((review, index) => (
                                                <li key={index}>
                                                    <strong>{review.user}</strong>: {review.comment}
                                                </li>
                                            ))}
                                        </ul> */}
                                    </div>

                                    {/* Button for Purchase */}
                                    <div className="view-more-btn mt--60">
                                        <a
                                            className="rn-button-style--2 btn-solid"
                                            onClick={displayRazorpay}
                                        >
                                            <span>Purchase Now</span>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Extension Details */}



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
