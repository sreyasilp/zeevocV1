import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../api/index.js"; // You need to implement this API call

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim spaces and convert email to lowercase
    const trimmedEmail = email.trim().toLowerCase();

    try {
      await forgotPassword({ email: trimmedEmail });
      toast.success("Password reset link sent!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      } else {
        toast.error("Error sending password reset link", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
      console.error("Forgot password error:", error);
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
                  <h4 className="title">Restore Account</h4>
                  <p className="description">Enter your email to receive a password reset link.</p>
                </div>
                <label htmlFor="email">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} // Trim and convert to lowercase
                    placeholder="Email"
                    required
                  />
                </label>
                <p className="signup-link">
                  Remember your password?{" "}
                  <Link to="/login" className="highlight-link">
                    Login
                  </Link>
                </p>
                <div className="button-group">
                  <button
                    className="rn-button-style--3 btn-solid"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                  >
                    Submit
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

export default ForgotPasswordForm;
