import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn, signUp } from "../../api/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttonGroupRef = useRef(null);

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
      console.log(response);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successfull!");
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const googleSuccess = async (res) => {
    try {
      console.log("Google login response:", res);
      const accessToken = res.access_token;

      // Fetch user info from Google API
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
      const profileObj = await response.json();
      console.log("User profile:", profileObj);

      // Proceed with signup using profileObj
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
    try {
      const response = await signIn({
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      navigate("/");
    } catch (error) {
      console.log("Sign-in error:", error);
    }
  };

  return (
    <div className="contact-form--1">
      <ToastContainer />
      <div className="profile-container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="form-card">
              <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                  <div className="section-title-zv text-center mb--10">
                    <h4 className="title">Welcome Back!</h4>
                    <p className="description">Log in to continue your journey with us!</p>
                  </div>
                  <label htmlFor="item02">
                    <input
                      type="text"
                      name="email"
                      id="item02"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
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
                      required
                    />
                  </label>
                  <p className="signup-link">
                    Doesn't have an Account?{" "}
                    <Link to="/signup" className="highlight-link">
                      Sign Up
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
    </div>
  );
}

export default LoginForm;
