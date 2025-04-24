import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    if (!agree) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }
  
    const userData = {
      username: fullName,
      email,
      password,
    };
  
    try {
      const response = await fetch("https://commitnexusdatabase.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Signup successful!");
        // Redirect to login or another page if needed
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="terms">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              required
            />
            <label>
              I agree to the <a href="/terms">Terms & Conditions</a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        {/* Already have an account */}
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
