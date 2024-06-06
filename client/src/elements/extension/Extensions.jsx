import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabPanel } from 'react-tabs';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { getAllExtensions } from '../../api'; // Import the API function


const TabStyleThree = ({ column }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tab1, setTab1] = useState(0);
    const [extensions, setExtensions] = useState([]); // State to store fetched data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllExtensions(); // Call the API function
                setExtensions(response.data); // Set fetched data to state
            } catch (error) {
                console.error('Error fetching extensions:', error);
            }
        };

        fetchData(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return (
        <div>
            <Tabs>
                <TabPanel className="row row--35">
                    {extensions.map((value, index) => (
                        <div className={`${column}`} key={index}>
                            {isOpen && (
                                <Lightbox
                                    mainSrc={extensions[tab1].bigImage}
                                    nextSrc={extensions[(tab1 + 1) % extensions.length].bigImage}
                                    prevSrc={extensions[(tab1 + extensions.length - 1) % extensions.length].bigImage}
                                    onCloseRequest={() => setIsOpen(false)}
                                    onMovePrevRequest={() => setTab1((tab1 + extensions.length - 1) % extensions.length)}
                                    onMoveNextRequest={() => setTab1((tab1 + 1) % extensions.length)}
                                    imageLoadErrorMessage='Image Loading ...'
                                    enableZoom={false}
                                />
                            )}
                            <div className="item-portfolio-static">
                                <div className="portfolio-static">
                                    <div className="thumbnail-inner">
                                        <div className="thumbnail">
                                            <a href={`/extension/${value.urlKey}`}>
                                                <img src={`/assets/images/portfolio/dp-portfolio-03.jpg`} alt="Portfolio Images" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="inner">
                                            <p><a href={`/extension/${value.urlKey}`}>{value.category}</a></p>
                                            <h4><a href={`/extension/${value.urlKey}`}>{value.title}</a></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabStyleThree;
