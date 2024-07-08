import React from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useTheme } from "../../context/ThemeContext";

const TermsAndConditions = () => {
  const { isDarkTheme } = useTheme();
  return (
    <React.Fragment>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Terms and Conditions" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* Start Breadcrumb Area */}
        <Breadcrumb title={"Terms and Conditions"} />
        {/* End Breadcrumb Area */}

        {/* Start Terms and Conditions Area  */}
        <div className="rn-terms-area ptb--120 bg_color--1">
          <div className="rn-terms-wrapper">
            <div className="container">
              <div className="row row--35 align-items-center">
                <div className="col-lg-12">
                  <div className="terms-inner inner">
                    <div className="section-title">
                      <h2 className="title">Terms and Conditions</h2>
                      <p className="description">
                        By using this website, you agree to be bound by these terms and conditions. If you do not agree, please do not use this website. We reserve the right to alter and change these terms occasionally, and your continued use of the website represents an agreement to be bound by the amended terms.
                      </p>
                      <p className="description">
                        The website and its content are provided "as is" without any warranties. We do not guarantee the accuracy or completeness of the information on the website and are not liable for any damages that result from its use. You must ensure that your access to this website is legal and does not expose you to risks.
                      </p>
                      <p className="description">
                        All design and intellectual property on this website is owned by Zeevoc Digital. Customers who purchase our Magento 2 extensions are permitted to use them for any of their needs, including commercial purposes on their own websites. Redistribution, sharing, or reselling of our extensions without written permission is strictly prohibited.
                      </p>
                      <p className="description">
                        You agree to indemnify us against all actions arising from your use of this website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Terms and Conditions Area  */}

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

export default TermsAndConditions;
