import React, { useState, useEffect } from "react";
import { FiClock, FiUser, FiMessageCircle, FiHeart, FiCopy } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import ModalVideo from 'react-modal-video';
import PageHelmet from "../../component/common/Helmet";
import { getBlogById } from "../../api";
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-sql.min.js';

const BlogDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [blogData, setBlogData] = useState({});
    const { blogId } = useParams();
    const [copyButtonText, setCopyButtonText] = useState("Copy");

    const openModal = () => {
        setIsOpen(true);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyButtonText("Copied!");
            setTimeout(() => setCopyButtonText("Copy"), 5000);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBlogById(blogId);
                setBlogData(response.data);
                Prism.highlightAll();
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchData();
    }, [blogId]);

    return (
        <React.Fragment>
            <PageHelmet pageTitle={blogData.title} />
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            {/* Start Breadcrump Area */}
            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--7" data-black-overlay="7">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-single-page-title text-center pt--100">
                                <h2 className="title theme-gradient">{blogData.title}</h2>
                                <ul className="blog-meta d-flex justify-content-center align-items-center">
                                    <li><FiClock />May 18, 2024</li>
                                    <li><FiUser />Zeevoc Team</li>
                                    <li><FiMessageCircle />1 Comments</li>
                                    <li><FiHeart />Like</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrump Area */}

            {/* Start Blog Details */}
            <div className="rn-blog-details pt--110 pb--70 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-wrapper">
                                <div className="inner">
                                    <h3 className="title">Steps to Install Magento on Ubuntu</h3>
                                    <p>Magento is a powerful and flexible open-source e-commerce platform that provides a wide range of features and customization options. Installing Magento correctly ensures a stable and secure online store. Follow the steps below to install Magento on your server.</p>
                                    <div className="thumbnail">
                                        <img src="/assets/images/blog/bl-big-01.jpg" alt="Blog Images" />
                                    </div>
                                    <p className="mt--40">Before you begin, ensure your server meets the necessary system requirements for running Magento, such as the correct PHP version, required PHP extensions, and appropriate server settings.</p>
                                    <blockquote className="rn-blog-quote">"Setting up Magento correctly from the start is crucial for the performance and security of your online store."</blockquote>
                                    <p>Magento requires a database to store all its data. You can create a new database for Magento using your hosting control panel or via the command line interface.</p>

                                    {/* Magento Installation Steps */}
                                    <div className="installation-steps">
                                        <h3 className="title">Steps to Install Magento</h3>
                                        <ol>
                                            <li>
                                                <h4 className="step-title">Step 1: System Requirements</h4>
                                                <p>Ensure your server meets the system requirements for Magento. This includes having the correct PHP version, necessary extensions, and appropriate server settings.</p>
                                            </li>
                                            <li>
                                                <h4 className="step-title">Step 2: Download Magento</h4>
                                                <p>Download the Magento software from the official website or via Composer. Use the following command to download Magento via Composer:</p>
                                                <div className="code-snippet">
                                                    <pre>
                                                        <code>composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.4.3</code>
                                                    </pre>
                                                    <button className="copy-button" onClick={() => copyToClipboard('composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.4.3')}>
                                                        <FiCopy /> {copyButtonText}
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <h4 className="step-title">Step 3: Set Up Database</h4>
                                                <p>Create a new database for Magento to use. You can do this via your hosting control panel or by using the command line:</p>
                                                <div className="code-snippet">
                                                    <pre>
                                                        <code>CREATE DATABASE magento;</code>
                                                    </pre>
                                                    <button className="copy-button" onClick={() => copyToClipboard('CREATE DATABASE magento;')}>
                                                        <FiCopy /> {copyButtonText}
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <h4 className="step-title">Step 4: Configure Magento</h4>
                                                <p>Run the Magento setup wizard or use the command line to configure Magento. Ensure you provide the necessary database and admin user information. Example command:</p>
                                                <div className="code-snippet">
                                                    <pre>
                                                        <code>bin/magento setup:install --base-url=http://your-domain.com/ --db-host=localhost --db-name=magento --db-user=root --db-password=yourpassword --admin-firstname=Admin --admin-lastname=User --admin-email=admin@your-domain.com --admin-user=admin --admin-password=admin123</code>
                                                    </pre>
                                                    <button className="copy-button" onClick={() => copyToClipboard('bin/magento setup:install --base-url=http://your-domain.com/ --db-host=localhost --db-name=magento --db-user=root --db-password=yourpassword --admin-firstname=Admin --admin-lastname=User --admin-email=admin@your-domain.com --admin-user=admin --admin-password=admin123')}>
                                                        <FiCopy /> {copyButtonText}
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <h4 className="step-title">Step 5: Finalize Installation</h4>
                                                <p>Set the correct file permissions and deploy static content. Example commands:</p>
                                                <div className="code-snippet">
                                                    <pre>
                                                        <code>
                                                            {`find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} + && \\
find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} + && \\
chown -R :www-data . && chmod u+x bin/magento\nbin/magento setup:static-content:deploy -f`}
                                                        </code>
                                                    </pre>
                                                    <button className="copy-button" onClick={() => copyToClipboard(`find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} + && \nfind var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} + && \nchown -R :www-data . && chmod u+x bin/magento\nbin/magento setup:static-content:deploy -f`)}>
                                                        <FiCopy /> {copyButtonText}
                                                    </button>
                                                </div>
                                            </li>
                                        </ol>
                                    </div>

                                    <p className="mt--25 mt_sm--5">Once the installation is complete, you can access the Magento admin panel by navigating to your store's base URL followed by /admin. From there, you can begin setting up your store, adding products, and configuring settings to meet your business needs.</p>
                                    <div className="video-wrapper position-relative mb--40">
                                        <div className="thumbnail">
                                            <img src="/assets/images/blog/bl-big-01.jpg" alt="Blog Images" />
                                        </div>
                                        <button className="video-popup position-top-center" onClick={openModal}><span className="play-icon"></span></button>
                                    </div>
                                    <p className="mb--0">Magento's flexibility and scalability make it a popular choice for businesses of all sizes. With a large community of developers and a wide range of extensions available, Magento can be tailored to suit the specific needs of your online store.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Blog Details */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}

            <Footer />
        </React.Fragment>
    );
};

export default BlogDetails;
