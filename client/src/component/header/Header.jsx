import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";

const Header = (props) => {
    // State to hold the token
    const [token, setToken] = useState(localStorage.getItem('token'));
    const location = useLocation();

    // Effect to update the token in state when it changes in local storage
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    // Function to open the menu
    const menuTrigger = () => {
        document.querySelector(".header-wrapper").classList.toggle("menu-open");
    }

    // Function to close the menu
    const CLoseMenuTrigger = () => {
        document.querySelector(".header-wrapper").classList.remove("menu-open");
    }

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/";
    };

    var elements = document.querySelectorAll('.has-droupdown > a');
    for (var i in elements) {
        if (elements.hasOwnProperty(i)) {
            elements[i].onclick = function () {
                this.parentElement.querySelector('.submenu').classList.toggle("active");
                this.classList.toggle("open");
            }
        }
    }

    const { logo, color = 'default-color' } = props;
    let logoUrl;
    if (logo === 'light') {
        logoUrl = <img src="/assets/images/logo/logo-light.png" alt="Zeevoc" />;
    } else if (logo === 'dark') {
        logoUrl = <img src="/assets/images/logo/logo-dark.png" alt="Zeevoc" />;
    } else if (logo === 'symbol-dark') {
        logoUrl = <img src="/assets/images/logo/logo-symbol-dark.png" alt="Zeevoc" />;
    } else if (logo === 'symbol-light') {
        logoUrl = <img src="/assets/images/logo/logo-symbol-light.png" alt="Zeevoc" />;
    } else {
        logoUrl = <img src="/assets/images/logo/logo.png" alt="Zeevoc" />;
    }

    return (
        <header className={`header-area formobile-menu header--transparent ${color}`}>
            <div className="header-wrapper" id="header-wrapper">
                <div className="header-left">
                    <div className="logo">
                        <a href="/">
                            {logoUrl}
                        </a>
                    </div>
                </div>
                <div className="header-right">
                    <nav className="mainmenunav d-lg-block">
                        <ul className="mainmenu">
                            <li><Link to="/" >Home</Link></li>
                            <li><Link to="/service" >Service</Link></li>
                            <li><Link to="/blog" >Blog</Link></li>
                            <li><Link to="/extensions" >Extensions</Link></li>
                            <li><Link to="/contact" >Contact</Link></li>
                            <li><Link to="/about" >About</Link></li>
                            {(location.pathname !== '/login' && !token) && <li><Link to="/login">Login</Link></li>}
                            {token && <li onClick={logout} > <Link >Logout</Link></li>}
                        </ul>
                    </nav>

                    {/* Start Humberger Menu  */}
                    <div className="humberger-menu d-block d-lg-none pl--20">
                        <span onClick={menuTrigger} className="menutrigger text-white"><FiMenu /></span>
                    </div>
                    {/* End Humberger Menu  */}
                    <div className="close-menu d-block d-lg-none">
                        <span onClick={CLoseMenuTrigger} className="closeTrigger"><FiX /></span>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;