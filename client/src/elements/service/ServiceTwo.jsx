import React, { useState, useEffect } from "react";
import { FiChevronUp, FiShoppingBag, FiShoppingCart, FiBookOpen, FiSettings, FiMonitor, FiCode } from "react-icons/fi";

import { getAllServices } from "../../api";

const ServiceTwo = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllServices();
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    let title = 'Services',
        description = 'Don\'t fall for the lies Our transparent approach ensures honesty and integrity in every aspect of your business.';

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-4 col-12">
                    <div className="section-title mt--30 mt_md--5 mt_mobile--5 mb_mobile--10">
                        <h2 className="title">{title}</h2>
                        <p>{description}</p>
                        <div className="service-btn">
                            <a className="btn-transparent rn-btn-dark" href="/services"><span className="text">View All Services</span></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-12 mt_md--50">
                    <div className="row service-one-wrapper">
                        {loading? (
                            <p>Loading...</p>
                        ) : (
                            services.slice(0, 4).map((service, index) => (
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <a href={`/service/${service.urlKey}`}>
                                        <div className="service service__style--2">
                                            <div className="icon">
                                                {index === 0 && <FiShoppingBag />} {/* Magento Development */}
                                                {index === 1 && <FiCode />} {/* Extension Development */}
                                                {index === 2 && <FiShoppingCart />} {/* E-commerce Solutions */}
                                                {index === 3 && <FiBookOpen />} {/* Academic Project Assistance */}
                                            </div>
                                            <div className="content">
                                                <h3 className="title">{service.title}</h3>
                                                <p>{service.description}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ServiceTwo;
