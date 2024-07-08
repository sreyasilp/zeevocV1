import React from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useTheme } from "../../context/ThemeContext";

const RefundPolicy = () => {
  const { isDarkTheme } = useTheme();
  return (
    <React.Fragment>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Refund Policy" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* Start Breadcrumb Area */}
        <Breadcrumb title={"Refund Policy"} />
        {/* End Breadcrumb Area */}

        {/* Start Refund Policy Area  */}
        <div className="rn-refund-area ptb--120 bg_color--1">
          <div className="rn-refund-wrapper">
            <div className="container">
              <div className="row row--35 align-items-center">
                <div className="col-lg-12">
                  <div className="refund-inner inner">
                    <div className="section-title">
                      <h3 className="title">Refund Policy</h3>
                      <p className="description">
                        Please note that all sales are final. Once a purchase is made, there are no refunds or cancellations available.
                      </p>
                      <p className="description">
                        We recommend reviewing your order carefully before completing the purchase. If you have any questions or need further assistance, please contact our support team before making a purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Refund Policy Area  */}

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

export default RefundPolicy;
