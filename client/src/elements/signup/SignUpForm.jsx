import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../api/index.js"; // Import the signUp function from your API file
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const googleSuccess = async (res) => {
  const profileObj = res.profileObj;
  const tokenId = res.tokenId;

  try {
    localStorage.setItem('token', tokenId);
    showToastMessage("Logged in successfully!", false);
    // navigate("/");
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
  const navigate = useNavigate();
  const buttonGroupRef = useRef(null);

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
      navigate("/"); // Navigate to the home page on successful signup
    } catch (error) {
      // Handle error
      toast.error("Failed to sign up!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (buttonGroupRef.current) {
        const firstDiv = buttonGroupRef.current.querySelector('div');

        if (firstDiv) {
          const isIpad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;

          if (isIpad) {
            firstDiv.style.width = "750px";
            firstDiv.style.marginLeft = "320px";
          } else if (window.innerWidth > 768) {
            firstDiv.style.width = "980px";
            firstDiv.style.marginLeft = "540px";
          } else {
            firstDiv.style.width = "";
            firstDiv.style.marginLeft = "-20px";
          }

        }
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="168821784143-d0q7nugflesop4nh6rbdp3f95sr6o9c8.apps.googleusercontent.com">
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignUpForm;
