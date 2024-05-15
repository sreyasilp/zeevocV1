import React from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import TeamTwo from "../../blocks/team/TeamTwo";

const About = () => {
  return (
    <React.Fragment>
      <div className="active-white">
        <PageHelmet pageTitle="About" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* Start Breadcrump Area */}
        <Breadcrumb title={"About"} />
        {/* End Breadcrump Area */}

        {/* Start About Area  */}
        <div className="rn-about-area ptb--120 bg_color--1">
          <div className="rn-about-wrapper">
            <div className="container">
              <div className="row row--35 align-items-center">
                <div className="col-lg-5">
                  <div className="thumbnail">
                    <img
                      className="w-100"
                      src="/assets/images/about/about-3.jpg"
                      alt="About Images"
                    />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="about-inner inner">
                    <div className="section-title">
                      <h2 className="title">About Us</h2>
                      <p className="description">We are a team of skilled engineers from diverse disciplines, passionate about solving problems. Our expertise lies in web development, specializing in e-commerce, Magento 2 extension development, electrical and IoT projects. We leverage the MERN stack to create robust solutions for our clients.</p>
                    </div>
                    <div className="row mt--30">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="about-us-list">
                          <h3 className="title">Who We Are</h3>
                          <p>We are skilled engineers from diverse disciplines, passionate about solving problems. Our expertise lies in web development, specializing in e-commerce, Magento 2 extension development, electrical and IoT projects. We leverage the MERN stack to create robust solutions for our clients.</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="about-us-list">
                          <h3 className="title">What We Do</h3>
                          <p>We specialize in website development using Node.js and React. Need an e-commerce site? We offer Magento 2 and Adobe Commerce solutions, along with custom feature development. Additionally, we assist with electrical/electronics college projects.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End About Area  */}

        {/* Start Team Area  */}
        <div className="rn-team-wrapper ptb--120 bg_color--5">
          <div className="rn-team-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb--30">
                    <h2>Our Skilled Team</h2>
                    <p>We are a team of skilled engineers with diverse backgrounds, united by our passion for problem-solving and creating innovative solutions for our clients.</p>
                  </div>
                </div>
              </div>
              <TeamTwo column="col-lg-3" teamStyle="" item="4" />
            </div>
          </div>
        </div>
        {/* End Team Area  */}

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

export default About;
