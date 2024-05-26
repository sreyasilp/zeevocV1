// ResetPasswordForm.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/index.js"; // Adjust the path as needed


function ResetPasswordForm() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ token, newPassword });
            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Error resetting password.");
        }
    };

    return (


        <div className="contact-form--1">
            <div className="container">
                <div className="row row--35 justify-content-center">
                    <div className="col-lg-5 order-2 order-lg-1">
                        <div className="form-wrapper">
                            <form onSubmit={handleResetPassword}>
                                <div className="section-title-zv text-center mb--10">
                                    <h4 className="title">Reset Password</h4>
                                    <p className="description">Reset password to get back... </p>
                                </div>

                                <label htmlFor="item04">
                                    <input
                                        type="password"
                                        id="item04"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
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
        </div>);
}

export default ResetPasswordForm;

