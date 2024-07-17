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

    const renderProfileItem = (label, value, isEditing, inputProps) => {
        return (
            <div className="profile-item">
                <div className="profile-label">{label}:</div>
                <div className="profile-value">
                    {isEditing ? (
                        <input {...inputProps} value={value || ""} onChange={handleInputChange} />
                    ) : (
                        value || "Not provided"
                    )}
                </div>
            </div>
        );
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
                                                        {renderProfileItem(
                                                            "First Name",
                                                            profile.firstName,
                                                            isEditing,
                                                            {
                                                                type: "text",
                                                                name: "firstName",
                                                                placeholder: "First Name",
                                                                className: "profile-form-control",
                                                                maxLength: "30"
                                                            }
                                                        )}
                                                        <span className="error-message">{validationErrors.firstName}</span>
                                                        {renderProfileItem(
                                                            "Last Name",
                                                            profile.lastName,
                                                            isEditing,
                                                            {
                                                                type: "text",
                                                                name: "lastName",
                                                                placeholder: "Last Name",
                                                                className: "profile-form-control",
                                                                maxLength: "30"
                                                            }
                                                        )}
                                                        <span className="error-message">{validationErrors.lastName}</span>
                                                        {renderProfileItem(
                                                            "Phone Number",
                                                            profile.phoneNumber,
                                                            isEditing,
                                                            {
                                                                type: "text",
                                                                name: "phoneNumber",
                                                                placeholder: "Phone Number",
                                                                className: "profile-form-control",
                                                                maxLength: "10"
                                                            }
                                                        )}
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
                                            {renderProfileItem(
                                                "Gender",
                                                profile.sex,
                                                isEditing,
                                                {
                                                    type: "text",
                                                    name: "sex",
                                                    placeholder: "Gender",
                                                    className: "profile-form-control",
                                                }
                                            )}
                                            <span className="error-message">{validationErrors.sex}</span>
                                            {renderProfileItem(
                                                "Date of Birth",
                                                moment(profile.dateOfBirth).format("DD-MM-YYYY"),
                                                isEditing,
                                                {
                                                    type: "text",
                                                    name: "dateOfBirth",
                                                    placeholder: "Date of Birth",
                                                    className: "profile-form-control",
                                                }
                                            )}
                                            <span className="error-message">{validationErrors.dateOfBirth}</span>
                                            {renderProfileItem(
                                                "Street Address",
                                                profile.address_line_one,
                                                isEditing,
                                                {
                                                    type: "text",
                                                    name: "address_line_one",
                                                    placeholder: "Street Address",
                                                    className: "profile-form-control",
                                                    maxLength: "30"
                                                }
                                            )}
                                            <span className="error-message">{validationErrors.address_line_one}</span>
                                            {renderProfileItem(
                                                "City/State/Suburb",
                                                profile.address_line_two,
                                                isEditing,
                                                {
                                                    type: "text",
                                                    name: "address_line_two",
                                                    placeholder: "City/State/Suburb",
                                                    className: "profile-form-control",
                                                    maxLength: "30"
                                                }
                                            )}
                                            <span className="error-message">{validationErrors.address_line_two}</span>
                                            {renderProfileItem(
                                                "Pincode",
                                                profile.pincode,
                                                isEditing,
                                                {
                                                    type: "text",
                                                    name: "pincode",
                                                    placeholder: "Pincode",
                                                    className: "profile-form-control",
                                                    maxLength: "6"
                                                }
                                            )}
                                            <span className="error-message">{validationErrors.pincode}</span>
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
