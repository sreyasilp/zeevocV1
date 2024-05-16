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
import { useTheme } from "../context/ThemeContext";

const list = [
  {
    image: "image-1",
    category: "Development",
    title: "Getting tickets to the big show",
  },
  {
    image: "image-2",
    category: "Development",
    title: "Getting tickets to the big show",
  },
  {
    image: "image-3",
    category: "Development",
    title: "Getting tickets to the big show",
  },
  {
    image: "image-4",
    category: "Development",
    title: "Getting tickets to the big show",
  },
  {
    image: "image-3",
    category: "Development",
    title: "Getting tickets to the big show",
  },
  {
    image: "image-4",
    category: "Development",
    title: "Getting tickets to the big show",
  },
];

const PortfolioList2 = [
  {
    image: "image-1",
    category: "Development",
    title: " Getting tickets to the big show",
  },
  {
    image: "image-2",
    category: "Development",
    title: " Getting tickets to the big show",
  },
  {
    image: "image-3",
    category: "Development",
    title: " Getting tickets to the big show",
  },
  {
    image: "image-4",
    category: "Development",
    title: " Getting tickets to the big show",
  },
  {
    image: "image-3",
    category: "Development",
    title: " Getting tickets to the big show",
  },
  {
    image: "image-4",
    category: "Development",
    title: " Getting tickets to the big show",
  },
];

const Products = () => {
  const { isDarkTheme } = useTheme();
  return (
    <>
      <div className={isDarkTheme ? "active-dark" : "active-white"}>
        <PageHelmet pageTitle="Products" />

        {/* Start Header Area  */}
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* End Header Area  */}

        {/* Start Breadcrump Area */}
        <Breadcrumb title={"Products"} />
        {/* End Breadcrump Area */}

        {/* Start Page Wrapper  */}
        <main className="page-wrapper">
          {/* Start Portfolio Area not using */}
          {/* <div className="portfolio-area pt--90 pb--140 bg_color--1">
            <div className="rn-slick-dot">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="slick-space-gutter--15 slickdot--20">
                      <Slider {...slickDot}>
                        {list.map((value, index) => (
                          <div className="portfolio" key={index}>
                            <div className="thumbnail-inner">
                              <div className={`thumbnail ${value.image}`}></div>
                              <div
                                className={`bg-blr-image ${value.image}`}
                              ></div>
                            </div>
                            <div className="content">
                              <div className="inner">
                                <p>{value.category}</p>
                                <h4>
                                  <a href="/portfolio-details">{value.title}</a>
                                </h4>
                                <div className="portfolio-button">
                                  <a
                                    className="rn-btn"
                                    href="/portfolio-details"
                                  >
                                    Case Study
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* End Portfolio Area */}

          {/* Start Portfolio Area */}
          <div className="portfolio-area ptb--120 bg_color--5">
            <div className="portfolio-sacousel-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center service-style--3 mb--30">
                      <h2 className="title">All Products</h2>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <PortfolioList
                    styevariation="text-left mt--40"
                    column="col-lg-4 col-md-6 col-sm-6 col-12"
                    item="6"
                  />
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="view-more-btn mt--60 text-center">
                      <a
                        className="rn-button-style--2 btn-solid"
                        href="/portfolio"
                      >
                        <span>View More Products</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Portfolio Area */}

          {/* Start Portfolio Area  not using*/}
          {/* <div className="portfolio-area ptb--120 bg_color--1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center service-style--3 mb--30">
                    <h2 className="title">All Works</h2>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper portfolio-sacousel-inner mb--55">
              <div className="portfolio-slick-activation mt--70 mt_sm--40">
                <Slider {...portfolioSlick2}>
                  {PortfolioList2.map((value, index) => (
                    <div className="portfolio" key={index}>
                      <div className="thumbnail-inner">
                        <div className={`thumbnail ${value.image}`}></div>
                        <div className={`bg-blr-image ${value.image}`}></div>
                      </div>
                      <div className="content">
                        <div className="inner">
                          <p>{value.category}</p>
                          <h4>
                            <a href="/portfolio-details">{value.title}</a>
                          </h4>
                          <div className="portfolio-button">
                            <a className="rn-btn" href="/portfolio-details">
                              Case Study
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div> */}
          {/* End Portfolio Area */}
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

export default Products;
