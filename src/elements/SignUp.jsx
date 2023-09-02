import React from 'react'
import PageHelmet from "../component/common/Helmet";
import BreadcrumbLogin from './common/LoginBreadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import SignUpForm from './signup/SignUpForm';

const SignUp = () => {
    return (
        <>
            <PageHelmet pageTitle='Contact Form' />

            {/* Start Header Area  */}
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            {/* End Header Area  */}
            
            {/* Start Breadcrump Area */}
            <BreadcrumbLogin title={'Contact Form'}   />
            {/* End Breadcrump Area */}

            {/* Start Page Wrapper  */}
            <main className="page-wrapper">

                {/* Start Contact Form  */}
                <div className="rn-contact-form-area ptb--120 bg_color--1">
                    <SignUpForm contactTitle="Login" contactImages="/assets/images/about/about-6.jpg" />
                </div>
                {/* Start Contact Form  */}

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

        </>
        
    )
}

export default SignUp;