import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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

  // useEffect(()=>{
  //   const firstDiv = buttonGroupRef.current.querySelector('div');
  //   if(firstDiv)
  //  { const element =   firstDiv.firstElementChild;
  //   // const iframe = document.querySelector('iframe[title="Sign in with Google Button"]');
  //   console.log(element,firstDiv)}
  // },[buttonGroupRef.current])

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (buttonGroupRef.current) {
  //       const firstDiv = buttonGroupRef.current.querySelector('div');
      
  //       if (firstDiv) {
  //         if (window.innerWidth > 768) {
  //           firstDiv.style.width = "980px";
  //           firstDiv.style.marginLeft = "540px";
  //         } else {
  //           firstDiv.style.width = "";
  //           firstDiv.style.marginLeft = "";
  //         }
  //       }
  //     }
  //   };

  //   handleResize(); // Initial check
  //   window.addEventListener("resize", handleResize); // Add event listener

  //   return () => {
  //     window.removeEventListener("resize", handleResize); // Clean up event listener
  //   };
  // }, []);

  return (
    <GoogleOAuthProvider clientId="168821784143-d0q7nugflesop4nh6rbdp3f95sr6o9c8.apps.googleusercontent.com">
      <div className="contact-form--1">
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="form-card">

                <div className="form-wrapper">
                  <form onSubmit={handleSubmit}>
                    <div className="section-title-zv text-center mb--10">
                      <h4 className="title">Login</h4>
                      <p className="description">Login to explore more!!</p>
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

                      <GoogleLogin
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy={"single_host_origin"}
                        useOneTap
                        width={1000}
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

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginForm;
