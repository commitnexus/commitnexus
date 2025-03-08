import React from "react";
import "./About.css"; // Import the CSS file
import Head from "../homepage/header";

const About = () => {
  return (
    <div className="about-container">
        <Head/>
      {/* Heading Section */}
      <h1 className="about-heading">About DataHubAra</h1>
      <p className="about-subtext">
        Secure, AI-powered data transfer and cloud storage made simple.
      </p>

      {/* Features Section */}
      <div className="about-grid">
        {/* Feature 1 */}
        <div className="about-box">
          <h3 className="about-title">Seamless Data Transfer</h3>
          <p className="about-text">
            Easily transfer files between devices with high-speed, encrypted sharing.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="about-box">
          <h3 className="about-title">AI-Powered File Recovery</h3>
          <p className="about-text">
            Our AI detects and restores missing files automatically, ensuring no data loss.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="about-box">
          <h3 className="about-title">Secure Cloud Storage</h3>
          <p className="about-text">
            Store and manage files securely with cloud-based backup and encryption.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-cta">
        <a href="/" className="about-button">
          Get Started Today
        </a>
      </div>
    </div>
  );
};

export default About;
