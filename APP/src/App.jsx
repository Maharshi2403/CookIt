import "./App.css";
import { Link } from "react-router-dom";
import emailIcon from "./resources/Email.png";
import lockIcon from "./resources/Lock.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
let token =
  "eyJhbGciOiJIUzI1NiJ9.e30.Picf4CVBhMiIfxch0azadAqgQO4yDXBrRWORPGVHkYc";
function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSignIn() {
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      const data = await response.json();
      token = data.token;
      console.log("Sign-in response:", data);

      navigate("/Dashboard");
      console.log("control reaches here!!");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  async function handleSignUp() {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      const data = await response.json();
      token = data.token;
      console.log("Sign-up response:", data);
      navigate("/Dashboard");
      // Handle success or error based on response
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  }
  return (
    <>
      <div className="login-container">
        {/* Login Form */}
        <div className="login-wrapper">
          <h1>Log In</h1>
          <form action="" method="POST">
            {/* Email Field */}
            <div className="input-container">
              <img src={emailIcon} className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="input-container">
              <img src={lockIcon} className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button type="button" onClick={handleSignIn}>
              Log In
            </button>
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          </form>

          {/* Forgot Password */}
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
