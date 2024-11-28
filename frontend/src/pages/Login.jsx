import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useLogin from "../hooks/useLogin";
import axios from 'axios';


const Login = () => {
  const [email, setemail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const { login, loading, error } = useLogin(); // Use the custom hook
  const navigate = useNavigate(); // useNavigate for navigation


  // Handle the login request using the custom hook
  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login(email, password); // Pass email and password

    if (result.success) {
      // Redirect to dashboard on successful login
      window.location.reload();
    } else {
      // If login fails, the error will be handled by the hook
      console.error("Login failed:", result.message);
    }
  };

  // Navigate to Signup page
  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>} {/* Show error from the hook */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup-container">
          <p>
            Don’t have an account?{" "}
          </p>
          <button onClick={navigateToSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;