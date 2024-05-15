import React, { useState, useEffect } from "react";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../common/Breadcrumb";
import { FiChevronUp, FiEdit2, FiSave } from "react-icons/fi"; // Import FiEdit2 and FiSave icons for edit and save actions
import ScrollToTop from "react-scroll-up";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { getProfile, updateProfile } from "../../api"; // Import updateProfile API function

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Hardcoded email for now
                const email = "sreyastp444@gmail.com"; // Replace with actual email
                const response = await getProfile(email);
                setProfile(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        // Update the profile state when input fields change
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!profile.firstName) {
            errors.firstName = "First name is required";
        }
        if (!profile.lastName) {
            errors.lastName = "Last name is required";
        }
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
        if (!profile.sex) {
            errors.sex = "Sex is required";
        }
        if (!profile.address_line_one) {
            errors.address = "Address line 1 is required";
        }
        if (!profile.city) {
            errors.address = "City is required";
        }
        if (!profile.country) {
            errors.address = "Country is required";
        }
        if (!profile.pincode) {
            errors.address = "Pincode is required";
        } else if (!/^\d{6}$/.test(profile.pincode)) {
            errors.address = "Pincode must be 6 digits";
        }
        // Add validation checks for other fields as needed
        return errors;
    };


    const handleSubmit = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await updateProfile(profile.email, profile);
                console.log(response.data);
                setIsEditing(false);
                setValidationErrors({});
                // Optionally, handle success or show a success message
            } catch (error) {
                console.error("Error updating profile:", error);
                // Optionally, handle error or show an error message
            }
        } else {
            setValidationErrors(errors);
        }
    };


    return (
        <React.Fragment>
            <div className="active-white">
                <PageHelmet pageTitle="Profile" />
                <Header
                    headertransparent="header--transparent"
                    colorblack="color--black"
                    logoname="logo.png"
                />

                {/* Start Breadcrump Area */}
                <Breadcrumb title={"Profile"} />
                {/* End Breadcrump Area */}

                {/* Start Profile Details */}
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
                                        <table className="profile-table">
                                            <tbody>
                                                <tr>
                                                    <td className="profile-label">Name:</td>
                                                    <td className="profile-value">
                                                        {isEditing ? (
                                                            <React.Fragment>
                                                                <input
                                                                    type="text"
                                                                    name="firstName"
                                                                    value={profile.firstName}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <span className="error-message">{validationErrors.firstName}</span>
                                                                <input
                                                                    type="text"
                                                                    name="lastName"
                                                                    value={profile.lastName}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                                                                {profile.firstName}
                                                                {profile.lastName}
                                                            </React.Fragment>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="profile-label">Email:</td>
                                                    <td className="profile-value">
                                                        {isEditing ? (
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={profile.email}
                                                                onChange={handleInputChange}
                                                                disabled
                                                            />
                                                        ) : (
                                                            profile.email
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="profile-label">Phone Number:</td>
                                                    <td className="profile-value">
                                                        {isEditing ? (
                                                            <React.Fragment>
                                                                <input
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    value={profile.phoneNumber}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <span className="error-message">{validationErrors.phoneNumber}</span>
                                                            </React.Fragment>
                                                        ) : (
                                                            profile.phoneNumber
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="profile-label">Sex:</td>
                                                    <td className="profile-value">
                                                        {isEditing ? (
                                                            <React.Fragment>
                                                                <input
                                                                    type="text"
                                                                    name="sex"
                                                                    value={profile.sex}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <span className="error-message">{validationErrors.sex}</span>
                                                            </React.Fragment>
                                                        ) : (
                                                            profile.sex
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="profile-label">Address:</td>
                                                    <td className="profile-value">
                                                        {isEditing ? (
                                                            <React.Fragment>
                                                                <input
                                                                    type="text"
                                                                    name="address_line_one"
                                                                    value={profile.address_line_one}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <input
                                                                    type="text"
                                                                    name="address_line_two"
                                                                    value={profile.address_line_two}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <input
                                                                    type="text"
                                                                    name="city"
                                                                    value={profile.city}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <input
                                                                    type="text"
                                                                    name="country"
                                                                    value={profile.country}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <input
                                                                    type="text"
                                                                    name="pincode"
                                                                    value={profile.pincode}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <br />
                                                                <span className="error-message">{validationErrors.address}</span>
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                                                                {profile.address_line_one}, {profile.address_line_two}, {profile.city}, {profile.country}, {profile.pincode}
                                                            </React.Fragment>
                                                        )}
                                                    </td>
                                                </tr>
                                               
                                                {/* Add more profile details as needed */}
                                            </tbody>
                                        </table>

                                        {/* Button to toggle editing mode and submit changes */}
                                        <div className="profile-actions text-center">
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Profile Details */}

                {/* Start Back To Top */}
                <div className="backto-top">
                    <ScrollToTop showUnder={160}>
                        <FiChevronUp />
                    </ScrollToTop>
                </div>
                {/* End Back To Top */}

                <Footer />
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
