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
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const { isDarkTheme } = useTheme();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const userDetails = await getUserDetails();
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

    const handleDateChange = (date) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            dateOfBirth: date,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profileImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };    

    const validateForm = () => {
        const errors = {};
        if (!profile.firstName) errors.firstName = "First name is required";
        else if (profile.firstName.length > 20) errors.firstName = "First name cannot exceed 20 characters";

        if (!profile.lastName) errors.lastName = "Last name is required";
        else if (profile.lastName.length > 20) errors.lastName = "Last name cannot exceed 20 characters";

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

        if (!profile.address_line_one) errors.address_line_one = "Address line 1 is required";
        else if (profile.address_line_one.length > 30) errors.address_line_one = "Address line 1 cannot exceed 30 characters";

        if (profile.address_line_two && profile.address_line_two.length > 30) {
            errors.address_line_two = "Address line 2 cannot exceed 30 characters";
        }
        if (!profile.pincode) {
            errors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(profile.pincode)) {
            errors.pincode = "Pincode must be 6 digits";
        }

        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateForm();
        console.log(Object.keys(errors))

        if (Object.keys(errors).length === 0) {
            try {
                console.log('fccg')
                const formData = {
                    email: profile.email,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    phoneNumber: profile.phoneNumber,
                    sex: profile.sex,
                    address_line_one: profile.address_line_one,
                    address_line_two: profile.address_line_two,
                    city: profile.city,
                    country: profile.country,
                    pincode: profile.pincode,
                    profileImage: profile.profileImage, // Add the Base64 image here
                };

                await updateProfile(profile.email, formData);
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

                <div className="profile-details pt--60 pb--60 bg_color--1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {loading ? (
                                   <LoadingSpinner/>
                                ) : (
                                    <div className="profile-card">
                                        <div className="profile-header">
                                            <div className="profile-image">
                                                {profile.profileImage ? (
                                                    <img src={profile.profileImage} alt="Profile" />
                                                ) : (
                                                    <img src="https://picsum.photos/id/237/200/300" alt="Profile" />
                                                )}
                                                {isEditing && (
                                                    <div className="image-upload">
                                                        <label htmlFor="file-upload" className="custom-file-upload">
                                                            Choose File
                                                        </label>
                                                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="profile-info">
                                                {isEditing ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={profile.firstName}
                                                            onChange={handleInputChange}
                                                            placeholder="First Name"
                                                            className="profile-form-control"
                                                            maxLength="30"
                                                        />
                                                        <span className="error-message">{validationErrors.firstName}</span>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={profile.lastName}
                                                            onChange={handleInputChange}
                                                            placeholder="Last Name"
                                                            className="profile-form-control"
                                                            maxLength="30"
                                                        />
                                                        <span className="error-message">{validationErrors.lastName}</span>
                                                        <input
                                                            type="text"
                                                            name="phoneNumber"
                                                            value={profile.phoneNumber}
                                                            onChange={handleInputChange}
                                                            placeholder="Phone Number"
                                                            className="profile-form-control"
                                                            maxLength="10"
                                                        />
                                                        <span className="error-message">{validationErrors.phoneNumber}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3>{profile.firstName} {profile.lastName}</h3>
                                                        <p>{profile.email}</p>
                                                        <p>{profile.phoneNumber}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="profile-content">
                                            <div className="profile-item">
                                                <div className="profile-label">Gender:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <>
                                                            <select
                                                                name="sex"
                                                                value={profile.sex}
                                                                onChange={handleInputChange}
                                                                className="profile-form-control"
                                                            >
                                                                <option value="">Select...</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                            <span className="error-message">{validationErrors.sex}</span>
                                                        </>
                                                    ) : (
                                                        profile.sex
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Date of Birth:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <Datetime
                                                            value={moment(profile.dateOfBirth)}
                                                            onChange={handleDateChange}
                                                            dateFormat="DD-MM-YYYY"
                                                            timeFormat={false}
                                                            className="profile-form-control"
                                                        />
                                                    ) : (
                                                        moment(profile.dateOfBirth).format("DD-MM-YYYY")
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Street Address:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                name="address_line_one"
                                                                value={profile.address_line_one}
                                                                onChange={handleInputChange}
                                                                className="profile-form-control"
                                                                maxLength="100"
                                                            />
                                                            <span className="error-message">{validationErrors.address_line_one}</span>
                                                        </>
                                                    ) : (
                                                        profile.address_line_one
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">City/State/Suburb</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                name="address_line_two"
                                                                value={profile.address_line_two}
                                                                onChange={handleInputChange}
                                                                className="profile-form-control"
                                                                maxLength="100"
                                                            />
                                                            <span className="error-message">{validationErrors.address_line_two}</span>
                                                        </>
                                                    ) : (
                                                        profile.address_line_two
                                                    )}
                                                </div>
                                            </div>
                                            <div className="profile-item">
                                                <div className="profile-label">Pincode:</div>
                                                <div className="profile-value">
                                                    {isEditing ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                name="pincode"
                                                                value={profile.pincode}
                                                                onChange={handleInputChange}
                                                                className="profile-form-control"
                                                                maxLength="6"
                                                            />
                                                            <span className="error-message">{validationErrors.pincode}</span>
                                                        </>
                                                    ) : (
                                                        profile.pincode
                                                    )}
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="profile-actions">
                                            {isEditing ? (
                                                <button className="rn-button-style--2 btn-solid" onClick={handleSubmit}>
                                                    <FiSave /> Save
                                                </button>
                                            ) : (
                                                <button className="rn-button-style--2 btn-solid" onClick={() => setIsEditing(true)}>
                                                    <FiEdit2 /> Edit
                                                </button>
                                            )}
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
