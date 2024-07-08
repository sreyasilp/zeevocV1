import React from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useTheme } from "../../context/ThemeContext";

const PrivacyPolicy = () => {
  const { isDarkTheme } = useTheme();
  return (
    <React.Fragment>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Privacy Policy" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* Start Breadcrumb Area */}
        <Breadcrumb title={"Privacy Policy"} />
        {/* End Breadcrumb Area */}

        {/* Start Privacy Policy Area  */}
        <div className="rn-privacy-area ptb--120 bg_color--1">
          <div className="rn-privacy-wrapper">
            <div className="container">
              <div className="row row--35 align-items-center">
                <div className="col-lg-12">
                  <div className="privacy-inner inner">
                    <div className="section-title">
                      <h3 className="title">Privacy Policy</h3>
                      <p className="description">
                        We recognize that your personal information is important to you, and we are committed to protecting your privacy. This policy outlines the type of information collected by Zeevoc Digital, how we use it, and how we protect it.
                      </p>
                      <p className="description">
                        By using this website, you agree to accept the terms of our current privacy policy. If you do not agree, you may not use our website. We collect personal information such as your name, address, email, and phone number when you inquire about our products or services. This information is used to respond to your inquiries, process your purchases, and send you information about our products and services.
                      </p>
                      <p className="description">
                        We do not share your personal information with third parties except where they are directly involved in delivering or selling a product on our website. We take reasonable precautions to keep your information secure and ensure it is accurate and up to date.
                      </p>
                      <p className="description">
                        You have the right to access and correct your personal information, and any complaints about privacy breaches will be investigated promptly. We reserve the right to change this privacy policy at our discretion, and changes will be posted on our website. We encourage you to review the policy regularly to stay informed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Privacy Policy Area  */}

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

export default PrivacyPolicy;
