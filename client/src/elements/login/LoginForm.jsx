import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { signIn } from "../../api/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.css"; // Make sure to create and import your custom CSS file

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const googleSuccess = async (res) => {
    const profileObj = res.profileObj;
    const tokenId = res.tokenId;

    try {
      localStorage.setItem('token', tokenId);
      showToastMessage("Logged in successfully!", false);
      history.push("/");
      console.log("Google login response:", res);
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  const showToastMessage = (message, error) => {
    if (error) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({
        email: email,
        password: password,
      });
      localStorage.setItem('token', response.data.token);
      showToastMessage("Logged in successfully!", false);
      history.push("/");
    } catch (error) {
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
                  <p style={{ color: 'black', marginTop: '0px' }}>
                    Doesn't have an Account? <Link to="/signup" style={{ color: "#f9004d", fontWeight: 'bold' }}>Sign Up</Link>
                  </p>
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
                    <span>OR</span> {/* Added "or" text here */}
                    <GoogleLogin
                      onSuccess={googleSuccess}
                      onFailure={googleError}
                      cookiePolicy={'single_host_origin'}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="google-button"
                        >
                          <FcGoogle size="1.5em" style={{ marginRight: "8px" }} />
                          Sign in with Google
                        </button>
                      )}
                    />
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
