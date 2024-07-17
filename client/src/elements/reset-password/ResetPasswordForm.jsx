import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/index.js"; // Adjust the path as needed

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long";
    } else if (!/[A-Za-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one letter and one special character";
    }
    return "";
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const trimmedPassword = newPassword.trim();
    const error = validatePassword(trimmedPassword);

    if (error) {
      setPasswordError(error);
      toast.error(error);
      return;
    }

    try {
      await resetPassword({ token, newPassword: trimmedPassword });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error resetting password.");
    }
  };

  return (
    <div className="contact-form--1">
      <div className="profile-container">
        <div className="row row--35 justify-content-center">
          <div className="col-lg-5 order-2 order-lg-1">
            <div className="form-wrapper">
              <form onSubmit={handleResetPassword}>
                <div className="section-title-zv text-center mb--10">
                  <h4 className="title">Set Password</h4>
                  <p className="description">Reset password to get back.</p>
                </div>

                <label htmlFor="item04">
                  <input
                    type="password"
                    id="item04"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Password"
                    required
                  />
                  {passwordError && <div className="error-message">{passwordError}</div>}
                </label>
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

export default ResetPasswordForm;
