import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { signUp } from "../../api/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonGroupRef = useRef(null);

  // Added state variables for error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const googleSignUp = async (profileObj) => {
    const generatedPassword = generatePassword();
    try {
      const response = await signUp({
        email: profileObj.email,
        firstName: profileObj.given_name,
        lastName: profileObj.family_name,
        password: generatedPassword,
      });
      if (response.data.isExist == true) {
        toast.success("Login successful!");
      } else {
        toast.success("Signed up successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const googleSuccess = async (res) => {
    try {
      console.log("Google login response:", res);
      const accessToken = res.access_token;

      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
      const profileObj = await response.json();
      localStorage.setItem("googleLogin", true);
      localStorage.setItem("token", res.access_token);
      await googleSignUp(profileObj);
    } catch (error) {
      console.error("Google Sign In was unsuccessful:", error);
    }
  };

  const googleError = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleSuccess,
    onError: googleError,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Reset error state variables
    setEmailError("");
    setPasswordError("");

    // Trim spaces and convert email to lowercase
    const trimmedEmail = email.trim().toLowerCase();

    // Validate email
    if (!trimmedEmail) {
      errors.email = "Email is required";
      setEmailError("Email is required"); // Set email error message
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      errors.email = "Email address is invalid";
      setEmailError("Email address is invalid"); // Set email error message
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required";
      setPasswordError("Password is required"); // Set password error message
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      setPasswordError("Password must be at least 8 characters long"); // Set password error message
    } else if (!/[A-Za-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one letter and one special character";
      setPasswordError("Password must contain at least one letter and one special character"); // Set password error message
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await signUp({
          email: trimmedEmail, // Use the trimmed and lowercased email
          password: password,
        });
        localStorage.setItem("token", response.data.token);
        toast.success("Signed up successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        navigate("/");
      } catch (error) {
        console.error("Sign-up error:", error);
        toast.error("Failed to sign up!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } else {
      // Display validation errors
      Object.entries(errors).forEach(([key, value]) => {
        toast.error(value, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      });
    }
  };

  return (
    <div className="contact-form--1">
      <ToastContainer />
      <div className="profile-container">
        <div className="row row--35 justify-content-center">
          <div className="col-lg-5 order-2 order-lg-1">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit}>
                <div className="section-title-zv text-center mb--10">
                  <h4 className="title">Join Us Today!</h4>
                  <p className="description">Sign up to get started.</p>
                </div>
                <label htmlFor="item02">
                  <input
                    type="text"
                    name="email"
                    id="item02"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} // Trim and convert to lowercase
                    placeholder="Email"
                    required
                  />
                  {/* Render email error message */}
                  {emailError && <div className="error-message">{emailError}</div>}
                </label>
                <label htmlFor="item04">
                  <input
                    type="password"
                    id="item04"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  {/* Render password error message */}
                  {passwordError && <div className="error-message">{passwordError}</div>}
                </label>
                <p className="signup-link">
                  Already have an Account?{" "}
                  <Link to="/login" className="highlight-link">
                    Log In
                  </Link>
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </p>
                <div className="button-group" ref={buttonGroupRef}>
                  <button
                    className="rn-button-style--3 btn-solid"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => googleLogin()}
                    type="button"
                    className="rn-button-style--6 btn-solid google-button"
                  >
                    <FcGoogle size="1.5em" className="google-icon" />
                    Google
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
