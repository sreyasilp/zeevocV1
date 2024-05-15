import React, { useState, useEffect } from "react";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import { FiChevronUp, FiEdit2, FiSave } from "react-icons/fi"; // Import FiEdit2 and FiSave icons for edit and save actions
import ScrollToTop from "react-scroll-up";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { getProfile, updateProfile } from "../api"; // Import updateProfile API function

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode

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

    const handleSubmit = async () => {
        // Submit updated profile data
        try {
            const response = await updateProfile(profile.email, profile);
            console.log(response.data); // Log the response
            setIsEditing(false); // Exit editing mode after successful update
            // Optionally, handle success or show a success message
        } catch (error) {
            console.error("Error updating profile:", error);
            // Optionally, handle error or show an error message
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
                                                            <input
                                                                type="text"
                                                                name="firstName"
                                                                value={profile.firstName}
                                                                onChange={handleInputChange}
                                                            />
                                                        ) : (
                                                            profile.firstName
                                                        )}{" "}
                                                        {isEditing ? (
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                value={profile.lastName}
                                                                onChange={handleInputChange}
                                                            />
                                                        ) : (
                                                            profile.lastName
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
                                                            <input
                                                                type="text"
                                                                name="phoneNumber"
                                                                value={profile.phoneNumber}
                                                                onChange={handleInputChange}
                                                            />
                                                        ) : (
                                                            profile.phoneNumber
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="profile-label">Sex:</td>
                                                    <td className="profile-value">
                                                        {isEditing ? (
                                                            <input
                                                                type="text"
                                                                name="sex"
                                                                value={profile.sex}
                                                                onChange={handleInputChange}
                                                            />
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
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                                                                {profile.address_line_one}, {profile.address_line_two},{" "}
                                                                {profile.city}, {profile.country}, {profile.pincode}
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
