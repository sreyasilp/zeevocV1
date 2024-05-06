import React from 'react'
import AdminBlock from "./admin/Admin";
import TeamTwo from "./team/TeamTwo";

import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

const Admin = () => {
    return (
        <>
            <PageHelmet pageTitle='Dashboard' />
            {/* Start Header Area  */}
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            {/* End Header Area  */}

            {/* Start Breadcrump Area */}
            <Breadcrumb title={'Dashboard'}   />
            {/* End Breadcrump Area */}

            {/* Start Page Wrapper  */}
            <main className="page-wrapper">
                {/* Start Team Area  */}
                <div className="rn-team-wrapper ptb--120 bg_color--1">
                    <div className="rn-team-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center mb--30">
                                        <h2>Manage Data</h2>
                                    </div>
                                </div>
                            </div>
                            <AdminBlock column="col-lg-3" teamStyle="team-style--bottom" item="8" />
                        </div>
                    </div>
                </div>
                {/* End Team Area  */}


                

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

export default Admin