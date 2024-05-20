import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { signUp } from "../../api/index.js"; // Import the signUp function from your API file
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUpForm.css"; // Import your custom CSS file
import { FcGoogle } from "react-icons/fc";

const googleSuccess = async (res) => {
  const profileObj = res.profileObj;
  const tokenId = res.tokenId;

  try {
    localStorage.setItem('token', tokenId);
    showToastMessage("Logged in successfully!", false);
    // history.push("/");
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

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the signUp function from API file with form data
      const response = await signUp({
        email: email,
        password: password,
      });

      // Show a success toast message
      toast.success("Signed up successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate.push("/"); // Navigate to the home page on successful signup
    } catch (error) {
      // Handle error
      toast.error("Failed to sign up!", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
                <h2 className="title">Sign Up</h2>
                <p className="description">Sign Up to explore more </p>
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
                          Sign up with Google
                        </button>
                      )}
                    />
                  </div>
                </form>
                <p style={{ color: 'black', marginTop: '20px' }}>
                  Already a Member? <Link to="/login" style={{ color: "#f9004d", fontWeight: 'bold' }}>Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignUpForm;
