import React, { useState, useEffect } from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import { FiChevronUp, FiEdit2, FiSave } from "react-icons/fi";
import ScrollToTop from "react-scroll-up";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { getProfile, updateProfile } from "../../api";
import { useTheme } from "../../context/ThemeContext";
import { getUserDetails } from "../../auth/authUtils";
import "./UserProfile.css"; // Import CSS for custom styles

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { isDarkTheme } = useTheme();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const userDetails = getUserDetails();
            const email = userDetails.email;
            const response = await getProfile(email);
            setProfile(response.data.user);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!profile.firstName) errors.firstName = "First name is required";
        if (!profile.lastName) errors.lastName = "Last name is required";
        if (!profile.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
            errors.email = "Email address is invalid";
        }
        if (!profile.phoneNumber) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(profile.phoneNumber)) {
            errors.phoneNumber = "Phone number must be 10 digits";
        }
        if (!profile.sex) errors.sex = "Sex is required";
        if (!profile.address_line_one) errors.address = "Address line 1 is required";
        if (!profile.city) errors.address = "City is required";
        if (!profile.country) errors.address = "Country is required";
        if (!profile.pincode) {
            errors.address = "Pincode is required";
        } else if (!/^\d{6}$/.test(profile.pincode)) {
            errors.address = "Pincode must be 6 digits";
        }
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                await updateProfile(profile.email, profile);
                setIsEditing(false);
                setValidationErrors({});
                fetchProfile();
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        } else {
            setValidationErrors(errors);
        }
    };

    return (
        <React.Fragment>
            <div className={isDarkTheme ? "active-dark" : "active-white"}>
                <PageHelmet pageTitle="Profile" />
                <Header
                    headertransparent="header--transparent"
                    colorblack="color--black"
                    logoname="logo.png"
                />

                <Breadcrumb title={"Profile"} />

                <div className="profile-details pt--90 pb--120 bg_color--1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center mb--30">
                                    <h2>User Profile</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="profile-card">
                                        <div className="profile-header">
                                            <div className="profile-image">
                                                <img src="https://picsum.photos/id/237/200/300" alt="Profile" />
                                            </div>
                                            <div className="profile-info">
                                                <h3>{profile.firstName} {profile.lastName}</h3>
                                                <p>{profile.email}</p>
                                                <p>{profile.phoneNumber}</p>
                                            </div>
                                            <div className="profile-actions">
                                                {isEditing ? (
                                                    <button className="rn-button-style--2 btn-solid" onClick={handleSubmit}>
                                                        <FiSave /> Save Changes
                                                    </button>
                                                ) : (
                                                    <button className="rn-button-style--2 btn-solid" onClick={() => setIsEditing(true)}>
                                                        <FiEdit2 /> Edit Profile
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="profile-content">
                                            <div className="profile-item">
                                                <div className="profile-label">Gender:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <React.Fragment>
                                                            <select
                                                                name="sex"
                                                                value={profile.sex}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Select...</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                            <br />
                                                            <span className="error-message">{validationErrors.sex}</span>
                                                        </React.Fragment>
                                                    ) : (
                                                        profile.sex
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Date of Birth:</div>
                                                <div className="profile-value">{profile.dateOfBirth}</div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Address Line 1:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <React.Fragment>
                                                            <input
                                                                type="text"
                                                                name="address_line_one"
                                                                value={profile.address_line_one}
                                                                onChange={handleInputChange}
                                                            />
                                                            <br />
                                                            <span className="error-message">{validationErrors.address}</span>
                                                        </React.Fragment>
                                                    ) : (
                                                        profile.address_line_one
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Address Line 2:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            name="address_line_two"
                                                            value={profile.address_line_two}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        profile.address_line_two
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Pincode:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            name="pincode"
                                                            value={profile.pincode}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        profile.pincode
                                                    )}
                                                </div>
                                            </div>
                                     
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="backto-top">
                    <ScrollToTop showUnder={160}>
                        <FiChevronUp />
                    </ScrollToTop>
                </div>

                <Footer />
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
