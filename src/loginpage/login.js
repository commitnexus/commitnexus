import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email,
      password,
    };
  
    try {
      const response = await fetch("https://commitnexusdatabase.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("User Info:", data.user);
  
        // Optional: Store token/user data
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }
  
        // Redirect or navigate to dashboard
        window.location.href = "/features/file-sharing"; 
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
