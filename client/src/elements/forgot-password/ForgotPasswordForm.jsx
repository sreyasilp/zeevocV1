import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../api/index.js"; // You need to implement this API call
import "./ForgotPassword.css";

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      toast.success("Password reset link sent!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      navigate("/login");
    } catch (error) {
      toast.error("Error sending password reset link", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      console.error("Forgot password error:", error);
    }
  };

  return (
      <div className="contact-form--1">
        <ToastContainer />
        <div className="container">
          <div className="row row--35 align-items-start">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--10">
                <h2 className="title">Forgot Password</h2>
                <p className="description">Enter your email to receive a password reset link.</p>
              </div>
              <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
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
                  </div>
                </form>
                <p className="login-link">
                  Remember your password?{" "}
                  <Link to="/login" className="highlight-link">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ForgotPasswordForm;
