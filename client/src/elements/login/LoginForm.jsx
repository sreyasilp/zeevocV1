import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { signIn, signUp } from "../../api/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(response)
      localStorage.setItem("token", response.data.token);
      toast.success("Signed up successfully!");
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const googleSuccess = async (res) => {
    const decodedToken = jwt_decode(res.credential);  
    const profileObj = {
      email: decodedToken.email,
      given_name: decodedToken.given_name,
      family_name: decodedToken.family_name,
    };

    try {
      await googleSignUp(profileObj);
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

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
    <GoogleOAuthProvider clientId="168821784143-d0q7nugflesop4nh6rbdp3f95sr6o9c8.apps.googleusercontent.com">
      <div className="contact-form--1">
        <ToastContainer />
        <div className="container">
          <div className="row row--35 align-items-start">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--10">
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
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                  <div className="button-group">
                    <button
                      className="rn-button-style--2 btn-solid"
                      type="submit"
                      value="submit"
                      name="submit"
                      id="mc-embedded-subscribe"
                    >
                      Submit
                    </button>
                    <span>OR</span>
                    <GoogleLogin
                      onSuccess={googleSuccess}
                      onFailure={googleError}
                      cookiePolicy={"single_host_origin"}
                      useOneTap
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="google-button"
                        >
                          <FcGoogle size="1.5em" className="google-icon" />
                          Sign in with Google
                        </button>
                      )}
                    />
                    <p className="signup-link">
                      Doesn't have an Account?{" "}
                      <Link to="/signup" className="highlight-link">
                        Sign Up
                      </Link>
                    </p>
                  </div>
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
