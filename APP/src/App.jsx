import "./App.css";

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
      
      navigate("/Dashboard/homePage");
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
      // Handle success or error based on response
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  }
  return (
    <form className="form" action="" method="POST">
      <h3 className="header">
        <span>Authentication</span>
      </h3>
      <span className="auth">Username</span>
      <input
        className="textInput"
        name="username"
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <span className="auth">Password</span>
      <input
        className="textInput"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="btn">
        <button className="signin" type="button" onClick={handleSignIn}>
          Sign in
        </button>
        <button className="signup" type="button" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
    </form>
  );
}

export default App;

