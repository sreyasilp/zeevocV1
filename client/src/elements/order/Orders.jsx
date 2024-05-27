import React, { useState, useEffect } from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import { FiChevronUp } from "react-icons/fi";
import ScrollToTop from "react-scroll-up";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { getOrdersByUserId } from "../../api";
import { useTheme } from "../../context/ThemeContext";
import { getUserDetails } from "../../auth/authUtils";
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "./order.css"; // Import custom CSS for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userDetails = getUserDetails();
        const response = await getOrdersByUserId(userDetails.id);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <React.Fragment>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Orders" />
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        <Breadcrumb title={"Orders"} />

        <div className="orders-container pt--90 pb--120 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center mb--30">
                  <h2>My Orders</h2>
                </div>
              </div>
            </div>
            <div className="orders-grid">
              {loading ? (
                <p>Loading...</p>
              ) : (
                orders.map((order, index) => (
                  <div
                    className="order-card"
                    key={order._id}
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div className="order-header">
                      <div>
                        <h4>{order.orderItems[0].title}</h4>
                      </div>
                    </div>
                    <div className="order-details">
                      <div>
                        <p>Placed On {moment(order.createdAt).format('MMMM Do YYYY')}</p>
                        <p>${order.totalPrice.toFixed(2)} via {order.paymentMethod}</p>
                        <p className="payment-status">Status: {order.status}</p>
                      </div>
                      <img src="https://picsum.photos/200/300/?blur" alt={order.orderItems[0].title} style={{ width: '100px', height: '100px' }} />
                    </div>
                    <div className="order-actions">
                      <button>Download</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Orders;
