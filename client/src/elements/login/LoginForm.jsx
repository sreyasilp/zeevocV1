import React, { useState } from "react";
// import { Background } from "react-parallax";
import { signIn } from "../../api/index.js"; // Import the signIn function from your API file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useHistory, Link } from "react-router-dom";

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const showToastMessage = (message, error) => {
      if (error) {
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000, // Will close after 5 seconds
        });
      } else {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000, // Will close after 5 seconds
        });
      }
    };
    try {
      // Call the signIn function from API file with form data
      const response = await signIn({
        email: email,
        password: password,
      });
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      setTimeout(function () {
        showToastMessage("Logged in successfully!", false);
      }, 3000);

      // Navigate to the '/' page
      history.push("/");
    } catch (error) {
      // Handle error
      showToastMessage(error.response.data.message, true);
    }
  };

  return (
    <div className="contact-form--1">
      <ToastContainer />
      <div className="container">
        <div className="row row--35 align-items-start">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="section-title text-left mb--50">
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
                <p style={{ color: 'black', marginTop: '0px' }}>
                  Not a Member ? <Link to="/signup" style={{ color: "#f9004d", fontWeight: 'bold' }}>Sign Up</Link>
                </p>
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
export default LoginForm;
