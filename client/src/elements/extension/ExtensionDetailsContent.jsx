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
        <div className="main-content">
            <div className="image-gallery">
                <img src={selectedImage} alt="Meta Main" className="main-image" />
                <div className="thumbnails">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(img)}
                            className={selectedImage === img ? 'active' : ''}
                        />
                    ))}
                </div>
            </div>
            <div className="details">
                <div className="select-box">
                    <label>Edition</label>
                    <select>
                        <option>Magento Open Source</option>
                    </select>
                </div>
                <div className="select-box">
                    <label>Your store version</label>
                    <select>
                        <option>Choose Adobe Commerce Store version</option>
                    </select>
                </div>
                <div className="info-box">
                    <p>This is an Integration with a Third Party Service. Other charges and fees may be required to use this extension on your Store</p>
                </div>
                <div className="price-box">
                    <div className="price">
                        <span>PRODUCT</span>
                        <span>${getConvertedPrice()} {selectedCurrency}</span>
                    </div>
                    <div className="total">
                        <span>TOTAL:</span>
                        <span>${getConvertedPrice()} {selectedCurrency}</span>
                    </div>
                </div>
                <div className="select-box">
                    <label htmlFor="currency">Choose Currency:</label>
                    <select id="currency" value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                        {Object.keys(exchangeRates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="contact-vendor" onClick={displayRazorpay}>Purchase</button>
            </div>

            <div className="bottom-section">
                <aside className="sidebar">
                    <ul>
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Technical Specifications</a></li>
                        <li><a href="#">Release Notes</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </aside>
                <div className="content">
                    <h2>Overview</h2>
                    <p><strong>The official extension from Meta.</strong> Seamlessly manage your Facebook & Instagram presence from one place.</p>
                    <p>Meta builds technologies that help people connect, find communities and grow businesses. The Facebook & Instagram Extension enables users to set up Conversions API, Pixel, Catalog, and enables Adobe Commerce (on-prem) and Magento Open Source users to create and manage a checkout-enabled Shop on Facebook & Instagram.</p>
                </div>
            </div>
        </div>
    );
};

export default ExtensionDetailsContent;
