import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { signIn } from "../../api/index.js"; // Import the signIn function from your API file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // New state to store Google user data

  // Handle Google login success
  const googleSuccess = async (res) => {
    const profileObj = res?.profileObj;
    const tokenId = res?.tokenId;

    try {
      // Store the token in local storage
      localStorage.setItem('token', tokenId);
      showToastMessage("Logged in successfully!", false);
      // Redirect to the '/' page after successful login
      history.push("/");

      // Log the Google login response
      console.log("Google login response:", res);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Google login failure
  const googleError = () => {
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  // Function to show toast message
  const showToastMessage = (message, error) => {
    if (error) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000, // Will close after 5 seconds
      });
    } else {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000, // Will close after 5 seconds
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the signIn function from API file with form data
      const response = await signIn({
        email: email,
        password: password,
      });
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      showToastMessage("Logged in successfully!", false);
      // Redirect to the '/' page after successful login
      history.push("/");
    } catch (error) {
      // Handle error
      showToastMessage(error.response.data.message, true);
    }
  };

  return (
    <GoogleOAuthProvider clientId="168821784143-d0q7nugflesop4nh6rbdp3f95sr6o9c8.apps.googleusercontent.com">
      <div className="contact-form--1">
        <ToastContainer />
        <div className="container">
          <div className="row row--35 align-items-start">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--50">
                <h2 className="title">Login</h2>
                <p className="description">Login to explore more!! </p>
              </div>
              <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="item02">
                    <input
                      type="text"
                      name="email"
                      id="item02"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </label>
                  <label htmlFor="item04">
                    <input
                      type="password"
                      id="item04"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </label>
                  <p style={{ color: 'black', marginTop: '0px' }}>
                    Does't have an Account ? <Link to="/signup" style={{ color: "#f9004d", fontWeight: 'bold' }}>Sign Up</Link>
                  </p>
                  <button
                    className="rn-button-style--2 btn-solid"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                  >
                    Submit
                  </button>


                  <GoogleLogin
                    clientId="168821784143-d0q7nugflesop4nh6rbdp3f95sr6o9c8.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy={'single_host_origin'}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginForm;
