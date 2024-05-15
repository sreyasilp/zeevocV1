import React, { useState, useEffect } from "react";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import { FiChevronUp } from "react-icons/fi";
import ScrollToTop from "react-scroll-up";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { getAllOrders } from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
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
      <div className="active-white">
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
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.user.email}</td>
                          <td>
                            {order.orderItems.map((item) => (
                              <div key={item.product._id}>
                                {item.quantity} x {item.title}
                              </div>
                            ))}
                          </td>
                          <td>${order.totalPrice}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
