import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PageHelmet from "../../component/common/Helmet";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import axios from "axios";
import dotenv from 'dotenv';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getExtensionByUrlKey, createPaymentOrder, getProfile, createOrder, postPaymentSuccess } from "../../api";
import { getUserDetails } from "../../auth/authUtils";
import "./extension.css";
import ExtensionDetailsContent from "./ExtensionDetailsContent";
import { useTheme } from "../../context/ThemeContext";

dotenv.config();

const ExtensionDetails = () => {
    const navigate = useNavigate();
    const { urlKey } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [extensionData, setExtensionData] = useState({});
    const [profileData, setProfileData] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [selectedImage, setSelectedImage] = useState('https://picsum.photos/seed/picsum/600/400');
    const { isDarkTheme } = useTheme();

    const images = [
        'https://picsum.photos/seed/picsum/600/400',
        'https://picsum.photos/seed/picsum/200/300',
        'https://picsum.photos/seed/picsum/200/301',
        'https://picsum.photos/seed/picsum/200/302',
        'https://picsum.photos/seed/picsum/200/303',
    ];

    useEffect(() => {
        const fetchExtensionData = async () => {
            try {
                const response = await getExtensionByUrlKey(urlKey);
                setExtensionData(response.data);
            } catch (error) {
                console.error("Error fetching extension data:", error);
                toast.error("Error fetching extension data. Please try again later.");
            }
        };
        const fetchUserData = async () => {
            try {
                const user = await getUserDetails(); // Wait for the promise to resolve
                console.log(user); // Log the resolved user details
                if (user && user.email) {
                    fetchProfileData(user.email);
                } else {
                    // Redirect to login if user is not authenticated
                    navigate('/login');
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
    }, [urlKey, navigate]);

    const getConvertedPrice = () => {
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
            const receipt = `${urlKey}-${Date.now()}`; // Concatenates
            const payOptions = {
                amount: getConvertedPrice() * 100, // amount in smallest currency unit
                currency: selectedCurrency,
                receipt: receipt,
            };
            const paymentOrder = await createPaymentOrder(payOptions);
            if (!paymentOrder) {
                toast.error("Server error. Are you online?");
                return;
            }

            // Prepare order data to create the order before payment
            const orderItems = [
                {
                    title: extensionData.title,
                    quantity: 1,
                    price: extensionData.price,
                    product: extensionData._id
                }
            ];

            const orderData = {
                user: profileData._id,
                orderItems: orderItems,
                paymentMethod: 'Razorpay',
                itemsPrice: extensionData.price,
                taxPrice: 0, // assuming no tax for simplicity
                totalPrice: extensionData.price
            };

            // Create the order
            const createdOrder = await createOrder(orderData);
            if (!createdOrder) {
                toast.error("Failed to create order. Please try again.");
                return;
            }

            const { amount, id: paymentOrderId, currency } = paymentOrder.data;
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: amount.toString(),
                currency: currency,
                name: profileData.firstName,
                description: "Test Transaction",
                order_id: paymentOrderId,
                handler: async function (response) {
                    const paymentSuccessData = {
                        orderCreationId: createdOrder.data._id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    try {
                        // Post payment success
                        const result = await postPaymentSuccess(paymentSuccessData);

                        if (result) {
                            toast.success("Order placed successfully!");
                            navigate('/orders');
                        } else {
                            toast.error("Payment success but failed to update order. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Error handling payment success:", error);
                        toast.error("Error occurred. Please try again later.");
                    }
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

    return (
        <React.Fragment>
            <div className={isDarkTheme ? "active-dark" : "active-white"}></div>
            <PageHelmet pageTitle={extensionData.title} />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--1" data-black-overlay="7">
                <div className="extension-container">
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

            <ExtensionDetailsContent
                setSelectedImage={setSelectedImage}
                extensionData={extensionData}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                exchangeRates={exchangeRates}
                getConvertedPrice={getConvertedPrice}
                displayRazorpay={displayRazorpay}
            />

            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>

            <Footer />
            <div />
        </React.Fragment>
    );
};

export default ExtensionDetails;
