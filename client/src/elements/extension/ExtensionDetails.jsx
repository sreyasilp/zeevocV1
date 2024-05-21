import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import PageHelmet from "../../component/common/Helmet";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import axios from "axios";
import dotenv from 'dotenv';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getExtensionById, createPaymentOrder, getProfile, createOrder } from "../../api";
import { getUserDetails } from "../../auth/authUtils";
dotenv.config();

const ExtensionDetails = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [extensionData, setExtensionData] = useState({});
    const [profileData, setProfileData] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
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

        const fetchUserData = async () => {
            try {
                const user = await getUserDetails();
                if (user.email) {
                    fetchProfileData(user.email);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data. Please try again later.");
            }
        };

        const fetchProfileData = async (email) => {
            try {
                const response = await getProfile(email);
                setProfileData(response.data.user);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                toast.error("Error fetching profile data. Please try again later.");
            }
        };

        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
                setExchangeRates(response.data.rates);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
                toast.error("Error fetching exchange rates. Please try again later.");
            }
        };

        fetchExtensionData();
        fetchUserData();
        fetchExchangeRates();
    }, [extensionId]);

    const getConvertedPrice = () => {
        console.log(extensionData.price)
        const basePrice = extensionData.price; // Assuming price is in USD
        const rate = exchangeRates[selectedCurrency];
        return rate ? (basePrice * rate).toFixed(2) : basePrice;
    };

    const displayRazorpay = async () => {
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                toast.error("Razorpay SDK failed to load. Are you online?");
                return;
            }
            // Generate a unique receipt ID including user ID and extension ID
            const receipt = `${extensionId}-${Date.now()}`; // Concatenates
            const payOptions = {
                amount: getConvertedPrice() * 100, // amount in smallest currency unit
                currency: selectedCurrency,
                receipt: receipt,
            };
            const result = await createPaymentOrder(payOptions);
            if (!result) {
                toast.error("Server error. Are you online?");
                return;
            }

            const { amount, id: order_id, currency } = result.data;
            const options = {
                key: process.env.RAZORPAY_KEY_ID || "rzp_test_PtZ63SYmWjwy8t", // use environment variable
                amount: amount.toString(),
                currency: currency,
                name: profileData.firstName,
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    // const result = await axios.post("http://localhost:4444/payment/success", data);
                    // Redirect to /orders page after successful payment
                    history.push('/orders');
                    toast.success("Order Placed successfully!");
                },
                prefill: {
                    name: `${profileData.firstName} ${profileData.lastName}`,
                    email: profileData.email,
                    contact: profileData.phoneNumber,
                },
                notes: {
                    address: `${profileData.address_line_one}, ${profileData.address_line_two}, ${profileData.city}`,
                },
                theme: {
                    color: "#f81f01",
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

    // if (!profileData || !exchangeRates) {
    //     return <div>Loading...</div>;
    // }

    return (
        <React.Fragment>
            <PageHelmet pageTitle={extensionData.title} />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

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

            <div className="rn-portfolio-details ptb--120 bg_color--1">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-details">
                                <div className="inner">
                                    <h2>Import Export Extension</h2>
                                    <p className="subtitle">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commod viverra maecenas accumsan lacus vel facilisis. ut labore et dolore magna aliqua. </p>

                                    <p className="subtitle">{extensionData.subtitle}</p>
                                    <p>{extensionData.description}</p>

                                    <div className="extension-features">
                                        <h3>Key Features:</h3>
                                        <ul>
                                            {/* {extensionData.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))} */}
                                        </ul>
                                    </div>

                                    <div className="extension-benefits">
                                        <h3>Benefits:</h3>
                                        {/* <ul>
                                            {extensionData.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul> */}
                                    </div>

                                    <div className="extension-pricing">
                                        <h3>Pricing:</h3>
                                        <p>{getConvertedPrice()} {selectedCurrency}</p>
                                    </div>

                                    <div className="currency-switcher">
                                        <label htmlFor="currency">Choose Currency:</label>
                                        <select id="currency" value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                                            {Object.keys(exchangeRates).map((currency) => (
                                                <option key={currency} value={currency}>
                                                    {currency}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="extension-compatibility">
                                        <h3>Compatibility:</h3>
                                        <p>{extensionData.compatibility}</p>
                                    </div>

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

            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>

            <Footer />
        </React.Fragment>
    );
};

export default ExtensionDetails;
