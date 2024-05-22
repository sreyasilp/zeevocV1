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
// import "./order.css"; // Import custom CSS for styling
import moment from 'moment'; // Import moment for date formatting

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

        {/* Start Breadcrump Area */}
        <Breadcrumb title={"Orders"} />
        {/* End Breadcrump Area */}

        {/* Start Orders Table */}
        <div className="orders-table pt--90 pb--120 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center mb--30">
                  <h2>My Orders</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order No.</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={order._id}>
                            <td>{index + 1}</td> {/* Display a sequential order number */}
                            <td>{order.user.firstName} {order.user.lastName}</td>
                            <td>
                              {order.orderItems.map((item) => (
                                <div key={item.product._id}>
                                  {item.quantity} x {item.title}
                                </div>
                              ))}
                            </td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm a')}</td> {/* Format the date using moment */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* End Orders Table */}

        {/* Start Back To Top */}
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>
        {/* End Back To Top */}

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Orders;
