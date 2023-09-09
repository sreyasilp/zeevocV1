import React, { useState } from "react";
import { Background } from "react-parallax";
import { signUp } from "../../api/index.js"; // Import the signUp function from your API file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useHistory, Link } from "react-router-dom";

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
    } catch (error) {
      // Handle error
      toast.error("Failed to sign up!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    navigate("/signup");

  };

  return (
    <div className="contact-form--1">
      <ToastContainer />
      <div className="container">
        <div className="row row--35 align-items-start">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="section-title text-left mb--50">
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
                  />
                </label>
                <button
                  className="rn-button-style--2 btn-solid"
                  type="submit"
                  value="submit"
                  name="submit"
                  id="mc-embedded-subscribe"
                >
                  Submit
                </button>
              </form>
              <p style={{ color: 'white' }}>
                Already a Member? <Link to="/login">Sign Up</Link>
              </p>
            </div>
          </div>
          {/* <div className="col-lg-6 order-1 order-lg-2">
                    <div className="thumbnail mb_md--30 mb_sm--30">
                        <img src={`${this.props.contactImages}`} alt="Zeevoc"/>
                    </div>
                </div> */}
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
