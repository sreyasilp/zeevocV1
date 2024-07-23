import React, { useState } from "react";
import PageHelmet from "../../component/common/Helmet";
import ModalVideo from 'react-modal-video';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(true);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const handlePasswordSubmit = () => {
        const galleryPassword = process.env.REACT_APP_GALLERY_PASSWORD;
        if (password === galleryPassword) {
            setIsAuthenticated(true);
            setIsPasswordModalOpen(false);
        } else {
            toast.error('Incorrect password');
        }
    };

    const galleryData = [
        {
            type: 'landscape',
            title: "Beautiful Landscape",
            description: "A breathtaking view of the mountains during sunset.",
            imgSrc: "/assets/images/portfolio/extensionaa.png"
        },
        {
            type: 'landscape',
            title: "Beautiful Landscape",
            description: "A breathtaking view of the mountains during sunset.",
            imgSrc: "/assets/images/portfolio/extensionaa.png"
        },
        {
            type: 'landscape',
            title: "Beautiful Landscape",
            description: "A breathtaking view of the mountains during sunset.",
            imgSrc: "/assets/images/portfolio/extensionaa.png"
        },
        {
            type: 'portrait',
            title: "City Lights",
            description: "The vibrant lights of the city at night.",
            imgSrc: "/assets/images/service/service-01.png"
        },
        {
            type: 'portrait',
            title: "Forest Path",
            description: "A serene path through the dense forest.",
            imgSrc: "/assets/images/service/service-01.png"
        },
        {
            type: 'portrait',
            title: "Forest Path",
            description: "A serene path through the dense forest.",
            imgSrc: "/assets/images/service/service-01.png"
        }
    ];

    return (
        <React.Fragment>
            {/* Start Pagehelmet  */}
            <PageHelmet pageTitle='Gallery' />
            {/* End Pagehelmet  */}

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            {/* Password Modal */}
            <Modal
                isOpen={isPasswordModalOpen}
                onRequestClose={() => setIsPasswordModalOpen(false)}
                contentLabel="Password Modal"
                ariaHideApp={false}
                className="password-modal"
                overlayClassName="password-modal-overlay"
            >
                <div className="password-modal-content">
                    <h2>Enter Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button onClick={handlePasswordSubmit}>Submit</button>
                </div>
            </Modal>

            {isAuthenticated && (
                <React.Fragment>
                    <ToastContainer />
                    {/* Start Gallery Area */}
                    <div className="rn-page-title-area pt--10 pb--190 bg_image bg_image--1" data-black-overlay="5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="rn-page-title text-center pt--100">
                                        <h2 className="title theme-gradient">Gone but not Forgotten.</h2>
                                        <p>Gone for good.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Gallery Area */}

                    {/* Start Gallery Wrapper */}
                    <div className="rn-gallery-details ptb--10 bg_color--1">
                        <div className="container">
                            <div className="row section-heading">
                                <div className="col-12">
                                    <h3 className="title">Landscapes</h3>
                                    <p>This is a small paragraph between the landscapes and the portraits.</p>
                                </div>
                            </div>
                            <div className="row">
                                {galleryData.filter(item => item.type === 'landscape').map((item, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 col-12">
                                        <div className="gallery-item">
                                            <div className="thumb">
                                                <img className="w-100" src={item.imgSrc} alt={item.title} />
                                            </div>
                                            {/* <div className="details mt_md--60 mt_sm--30">
                                                <h4 className="title">{item.title}</h4>
                                                <p>{item.description}</p>
                                            </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row section-heading">
                                <div className="col-12">
                                    <h3 className="title">Portraits</h3>
                                    <p>This is a small paragraph between the landscapes and the portraits.</p>
                                </div>
                            </div>
                            <div className="row">
                                {galleryData.filter(item => item.type === 'portrait').map((item, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 col-12">
                                        <div className="gallery-item">
                                            <div className="thumb">
                                                <img className="w-100" src={item.imgSrc} alt={item.title} />
                                            </div>
                                            {/* <div className="details mt_md--30 mt_sm--30">
                                                <h4 className="title">{item.title}</h4>
                                                <p>{item.description}</p>
                                            </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* End Gallery Wrapper */}

                    {/* Start Back To Top */}
                    <div className="backto-top">
                        <ScrollToTop showUnder={160}>
                            <FiChevronUp />
                        </ScrollToTop>
                    </div>
                    {/* End Back To Top */}

                    <Footer />

                    {/* Modal Video */}
                    <ModalVideo
                        channel='youtube'
                        isOpen={isOpen}
                        videoId='ZOoVOfieAF8'
                        onClose={() => setIsOpen(false)}
                    />
                    {/* End Modal Video */}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Gallery;
