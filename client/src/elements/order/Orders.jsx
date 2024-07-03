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
import { useNavigate } from 'react-router-dom';
import "./order.css";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userDetails = await getUserDetails(); // Await here
        if (userDetails) {
          console.log(userDetails);
          const response = await getOrdersByUserId(userDetails.id);
          setOrders(response.data);
        } else {
          console.error("No user details found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleDownload = async (orderId) => {
    try {
      // const response = await downloadOrder(orderId);
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'order-details.pdf');
      // document.body.appendChild(link);
      // link.click();
    } catch (error) {
      console.error("Error downloading order:", error);
    }
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
                <LoadingSpinner />
              ) : (
                orders.map((order) => (
                  <div
                    className="order-card"
                    key={order._id}
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div className="order-top">
                      <div className="order-info">
                        <h4 className="order-title">{order.orderItems[0].title}</h4>
                        <p className="order-id">Order #: 0000001</p>
                        <p className="order-date">Purchase Date: {moment(order.createdAt).format('MMMM D, YYYY')}</p>
                      </div>
                      <img src="https://picsum.photos/200/300/?blur" alt={order.orderItems[0].title} className="order-image" />
                    </div>
                    <div className="order-details">
                      <p>Total: ${order.totalPrice.toFixed(2)}</p>
                      <p>Status: {order.status}</p>
                      <button onClick={(e) => { e.stopPropagation(); handleDownload(order._id); }} className="order-download-button">Download</button>
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
