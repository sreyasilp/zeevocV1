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
import "./order.css"; // Import custom CSS for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkTheme } = useTheme();

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
                  <div className="order-card" key={order._id}>
                    <div className="order-header">
                      <div>
                        <h3>Order ID {index + 1}</h3>
                        <p>Placed On {moment(order.createdAt).format('MMMM Do YYYY')}</p>
                      </div>
                      <a href={`/order/${order._id}`} className="view-details">View Details</a>
                    </div>
                    <div className="order-details">
                      <div>
                        <h4>{order.orderItems[0].title}</h4>
                        <p>Qty: {order.orderItems[0].quantity}</p>
                        <p>${order.totalPrice.toFixed(2)} via {order.paymentMethod}</p>
                        <p>Tracking Status: {moment(order.updatedAt).format('h:mm a, MMMM Do YYYY')}</p>
                      </div>
                      <img src="https://picsum.photos/200/300/?blur" alt={order.orderItems[0].title} style={{ width: '100px', height: '100px' }} />
                    </div>
                    <div className="order-actions">
                      <button>Download Extension</button>
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
