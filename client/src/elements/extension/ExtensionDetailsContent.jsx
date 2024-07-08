import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";

const ExtensionDetailsContent = ({
    extensionData,
    selectedCurrency,
    setSelectedCurrency,
    exchangeRates,
    getConvertedPrice,
    displayRazorpay,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (extensionData && extensionData.imageName) {
            const baseImageName = extensionData.imageName;
            const imageCount = 3;
            const loadedImages = Array.from({ length: imageCount }, (_, i) => `/assets/images/extensions/product-import-export/${baseImageName}-${i + 1}.webp`);
            setImages(loadedImages);
        }
    }, [extensionData]);

    useEffect(() => {
        if (images.length > 0 && !imageLoaded) {
            setSelectedImage(images[0]);
            setImageLoaded(true);
        }
    }, [images, imageLoaded]);

    const handleNextImage = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    const handlePreviousImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    if (!extensionData) {
        return <LoadingSpinner />
    }
    return (
        <div className="extension-area ptb--20 bg_color--5">
            <div className="extension-carousel-inner">
                <div className="container">
                    <div className="extension-header">
                        <img src={`/assets/images/extensions/product-import-export/${extensionData.imageName}-thumbnail.jpg`} alt="Meta Logo" className="extension-logo" />
                        <div className="extension-header-content">
                            <h1>{extensionData.title}</h1>
                            <span>by Zeevoc Digital</span>
                        </div>
                        <div className="extension-rating">
                            <span className="extension-stars">★★★★☆</span>
                            <span className="extension-reviews">4.0 (13)</span>
                        </div>
                    </div>

                    <div className="extension-main-content">
                        <div className="extension-image-gallery">
                            <img src={selectedImage} alt="Meta Main" className="extension-main-image" />
                            <div className="image-navigation">
                                <button className="nav-button prev-button" onClick={handlePreviousImage}>
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button className="nav-button next-button" onClick={handleNextImage}>
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </div>
                            <div className="extension-thumbnails">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => { setCurrentIndex(index); setSelectedImage(img); }}
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
                                    <option>Magento 2.4 On Premise</option>
                                    <option>Magento 2.4 Cloud </option>
                                </select>
                            </div>
                            <div className="extension-select-box">
                                <label>Your store version</label>
                                <select>
                                    <option>Choose Adobe Commerce Store version</option>
                                    <option>Magento 2.4</option>
                                </select>
                            </div>
                            <div className="extension-info-box">
                                <p>Please note that all sales are final. Once a purchase is made, there are no refunds or cancellations available.</p>
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
                        <div className="extension-bottom-section" dangerouslySetInnerHTML={{ __html: extensionData.contentHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtensionDetailsContent;
