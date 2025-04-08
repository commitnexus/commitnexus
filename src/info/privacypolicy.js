import React from "react";
import "./PrivacyPolicy.css"; // Import the CSS

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> April 7, 2025</p>
      <p>
        Welcome to <strong>CommitNexus</strong> (https://commitnexus.onrender.com). Your privacy is important to us.
        This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We do not collect personal information. However, we may collect:
      </p>
      <ul>
        <li>Device & usage data</li>
        <li>Encrypted uploaded files</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Provide/improve services</li>
        <li>Enhance performance and security</li>
      </ul>

      <h2>3. Cookies</h2>
      <p>
        We use cookies to enhance your experience. You can disable cookies in your browser settings.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        We may use services like Google AdSense that collect anonymous data under their policies.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We use encryption and access controls to secure data.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this policy. Changes will appear here with a new date.
      </p>

      <h2>7. Contact</h2>
      <p>
        Reach out via our <a href="/contact">Contact Page</a> if you have questions.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
