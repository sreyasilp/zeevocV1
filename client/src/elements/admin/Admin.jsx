import React from 'react';
import AdminBlock from './AdminBlock';
import { Container } from 'react-bootstrap';
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../../elements/common/Breadcrumb";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

const Admin = () => {
    return (
        <>
            <PageHelmet pageTitle='Admin' />
            {/* Start Header Area  */}
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            {/* End Header Area  */}

            {/* Start Breadcrumb Area */}
            <Breadcrumb title={'Admin'} />
            {/* End Breadcrumb Area */}

            {/* Start Page Wrapper */}
            <Container fluid className="page-wrapper">
                <main className="rn-team-wrapper bg_color--1">
                    <div className="rn-team-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center mb--30">
                                       
                                    </div>
                                </div>
                            </div>
                            <AdminBlock />
                        </div>
                    </div>
                </main>
            </Container>
            {/* End Page Wrapper */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}

            {/* Start Footer Area */}
            <Footer />
            {/* End Footer Area */}
        </>
    );
};

export default Admin;
