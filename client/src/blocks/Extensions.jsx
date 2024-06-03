import React from "react";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import Slider from "react-slick";
import PortfolioList from "../elements/portfolio/PortfolioList";
import { slickDot, portfolioSlick2 } from "../page-demo/script";
import Extensions from "../elements/extension/Extensions"
import { useTheme } from "../context/ThemeContext";

const Extension = () => {
  const { isDarkTheme } = useTheme();
  return (
    <>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Extensions" />

        {/* Start Header Area  */}
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* End Header Area  */}

        {/* Start Breadcrump Area */}
        <Breadcrumb title={"Extensions"} />
        {/* End Breadcrump Area */}

        {/* Start Page Wrapper  */}
        <main className="page-wrapper">
          {/* Start Extension Area */}
          <div className="portfolio-area ptb--50 bg_color--5">
            <div className="portfolio-sacousel-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center service-style--3 mb--10">
                      <h2 className="title">All Extensions</h2>
                      <p>
                        Elevate your Magento site with our efficient extensions. Streamline operations and boost sales effortlessly. Explore now!
                      </p>
                    </div>
                  </div>
                </div>
                {/* Start Designer Extension  */}

                <Extensions column="col-lg-4 col-md-6 col-sm-6 col-12" />

                {/* End Designer Extension for later use */}
                {/* <div className="row">
                  <div className="col-lg-12">
                    <div className="view-more-btn mt--60 text-center">
                      <a
                        className="rn-button-style--2 btn-solid"
                        href="/extensions"
                      >
                        <span>View More Extensions</span>
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* End Extension Area */}
        </main>
        {/* End Page Wrapper  */}

        {/* Start Back To Top */}
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>
        {/* End Back To Top */}

        {/* Start Footer Area  */}
        <Footer />
        {/* End Footer Area  */}
      </div>
    </>
  );
};

export default Extension;
