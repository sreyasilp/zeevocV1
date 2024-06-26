import React, { useState, useEffect } from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import { FiChevronUp, FiShoppingBag, FiShoppingCart, FiBookOpen, FiSettings, FiMonitor, FiCode } from "react-icons/fi";
import ScrollToTop from "react-scroll-up";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { getAllServices } from "../../api";
import { useTheme } from "../../context/ThemeContext";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <React.Fragment>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Services" />
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        {/* Start Breadcrump Area */}
        <Breadcrumb title={"Services"} />
        {/* End Breadcrump Area */}

        {/* Start Service Area */}
        <div className="service-area creative-service-wrapper pt--50 pb--90 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center mb--30">
                  <h2>Our Services</h2>
                  <p>
                    Our comprehensive services offer customized solutions crafted to suit your unique requirements,<br /> empowering your business to thrive and achieve remarkable success.
                  </p>
                </div>
              </div>
            </div>
            <div className="row creative-service">
              {loading ? (
                <LoadingSpinner />
              ) : (
                services.map((val, i) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
                    key={i}
                  >
                    {/* <a className="text-center" href={`/service/${val.urlKey}`}> */}
                    <a className="text-center">
                      <div className="service service__style--2">
                        <div className="icon">

                          {i === 0 && <FiShoppingBag />} {/* Magento Development */}
                          {i === 1 && <FiCode />} {/* Extension Development */}
                          {i === 2 && <FiShoppingCart />} {/* E-commerce Solutions */}
                          {i === 3 && <FiBookOpen />} {/* Academic Project Assistance */}
                          {i === 4 && <FiSettings />} {/* Website Maintenance */}
                          {i === 5 && <FiMonitor />} {/* Website Development */}

                        </div>
                        <div className="content">
                          <h3 className="title">{val.title}</h3>
                          <p>{val.description}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* End Service Area */}

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

export default Service;
