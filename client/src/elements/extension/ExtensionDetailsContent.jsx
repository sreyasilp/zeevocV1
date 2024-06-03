import React from "react";

const ExtensionDetailsContent = ({
    selectedImage,
    images,
    setSelectedImage,
    extensionData,
    selectedCurrency,
    setSelectedCurrency,
    exchangeRates,
    getConvertedPrice,
    displayRazorpay,
}) => {
    return (
        <div className="extension-area ptb--20 bg_color--5">
            <div className="extension-carousel-inner">
                <div className="container">
                    <div className="extension-header">
                        <img src="https://picsum.photos/seed/picsum/600/400" alt="Meta Logo" className="extension-logo" />
                        <div className="extension-header-content">
                            <h1>Facebook & Instagram Extension</h1>
                            <span>by Meta</span>
                        </div>
                        <div className="extension-rating">
                            <span className="extension-stars">★★★★☆</span>
                            <span className="extension-reviews">4.0 (13)</span>
                        </div>
                    </div>

                    <div className="extension-main-content">
                        <div className="extension-image-gallery">
                            <img src={selectedImage} alt="Meta Main" className="extension-main-image" />
                            <div className="extension-thumbnails">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => setSelectedImage(img)}
                                        className={selectedImage === img ? 'extension-active' : ''}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="extension-details">
                            <div className="extension-select-box">
                                <label>Edition</label>
                                <select>
                                    <option>Magento Open Source</option>
                                </select>
                            </div>
                            <div className="extension-select-box">
                                <label>Your store version</label>
                                <select>
                                    <option>Choose Adobe Commerce Store version</option>
                                </select>
                            </div>
                            <div className="extension-info-box">
                                <p>This is an Integration with a Third Party Service. Other charges and fees may be required to use this extension on your Store</p>
                            </div>
                            <div className="extension-price-box">
                                <div className="extension-price">
                                    <span>PRODUCT</span>
                                    <span>${getConvertedPrice()} {selectedCurrency}</span>
                                </div>
                                <div className="extension-total">
                                    <span>TOTAL:</span>
                                    <span>${getConvertedPrice()} {selectedCurrency}</span>
                                </div>
                            </div>
                            <div className="extension-select-box">
                                <label htmlFor="currency">Choose Currency:</label>
                                <select id="currency" value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                                    {Object.keys(exchangeRates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="extension-contact-vendor" onClick={displayRazorpay}>Purchase Now</button>
                        </div>

                        <div className="extension-bottom-section">
                            <aside className="extension-sidebar">
                                <ul>
                                    <li><a href="#">Overview</a></li>
                                    <li><a href="#">Technical Specifications</a></li>
                                    <li><a href="#">Release Notes</a></li>
                                    <li><a href="#">Support</a></li>
                                </ul>
                            </aside>
                            <div className="extension-content">
                                <h2>Overview</h2>
                                <p><strong>The official extension from Meta.</strong> Seamlessly manage your Facebook & Instagram presence from one place.</p>
                                <p>Meta builds technologies that help people connect, find communities and grow businesses. The Facebook & Instagram Extension enables users to set up Conversions API, Pixel, Catalog, and enables Adobe Commerce (on-prem) and Magento Open Source users to create and manage a checkout-enabled Shop on Facebook & Instagram.</p>
                                <h2>Tech Specs</h2>
                                <p><strong>The official extension from Meta.</strong> Seamlessly manage your Facebook & Instagram presence from one place.</p>
                                <p>Meta builds technologies that help people connect, find communities and grow businesses. The Facebook & Instagram Extension enables users to set up Conversions API, Pixel, Catalog, and enables Adobe Commerce (on-prem) and Magento Open Source users to create and manage a checkout-enabled Shop on Facebook & Instagram.</p>
                                <h2>Release Notes</h2>
                                <p><strong>The official extension from Meta.</strong> Seamlessly manage your Facebook & Instagram presence from one place.</p>
                                <p>Meta builds technologies that help people connect, find communities and grow businesses. The Facebook & Instagram Extension enables users to set up Conversions API, Pixel, Catalog, and enables Adobe Commerce (on-prem) and Magento Open Source users to create and manage a checkout-enabled Shop on Facebook & Instagram.</p>
                                <h2>Support</h2>
                                <p><strong>The official extension from Meta.</strong> Seamlessly manage your Facebook & Instagram presence from one place.</p>
                                <p>Meta builds technologies that help people connect, find communities and grow businesses. The Facebook & Instagram Extension enables users to set up Conversions API, Pixel, Catalog, and enables Adobe Commerce (on-prem) and Magento Open Source users to create and manage a checkout-enabled Shop on Facebook & Instagram.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtensionDetailsContent;
