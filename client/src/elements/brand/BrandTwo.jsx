import React from "react";

const BrandTwo = () => {
    return (
        <React.Fragment>
            <div className="section-title text-left">
                <h2>Our Clients</h2>
                <p className="client-description">We are honored to work with these esteemed clients.</p>
            </div>
            <ul className="brand-style-2 ptb-20">
                <li>
                    <a href="https://www.esquirebc.com/">
                        <img src="/assets/images/brand/brand-01.png" alt="Brand Image" />
                    </a>
                </li>
                <li>
                    <a href="https://paddyviewresort.com/">
                        <img src="/assets/images/brand/brand-02.png" alt="Brand Image" />
                    </a>
                </li>
                <li>
                    <a href="https://www.esquirebc.com/">
                        <img src="/assets/images/brand/brand-01.png" alt="Brand Image" />
                    </a>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default BrandTwo;
