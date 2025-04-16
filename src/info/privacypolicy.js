import React from "react";
import "./PrivacyPolicy.css";
import Head from "../homepage/header";
import Footer from "../homepage/footer";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="privacy-policy">
        <Head />
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> April 14, 2025</p>
        <p>
          Welcome to <strong>CommitNexus</strong> (<a href="https://commitenexus.xyz" target="_blank" rel="noopener noreferrer">https://commitnexus.onrender.com</a>). We respect your privacy and are committed to protecting it through this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We do not collect personal information unless explicitly provided by you. However, we may collect the following:
        </p>
        <ul className="info-list">
          <li>Device information (e.g., browser type, IP address, OS)</li>
          <li>Usage data (pages visited, time spent)</li>
          <li>Uploaded files (stored in encrypted form)</li>
          <li>Cookies and local storage information</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul className="info-list">
          <li>To operate and maintain our services</li>
          <li>To improve performance and enhance security</li>
          <li>To analyze usage patterns and user interactions</li>
        </ul>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to personalize content and improve user experience.
          You can disable cookies through your browser settings.
        </p>

        <h2>4. Google AdSense and Third-Party Services</h2>
        <p>
          We may display ads served by Google AdSense. These third-party vendors, including Google, use cookies
          (such as DART cookies) to serve ads based on your prior visits to this and other websites.
        </p>
        <p>
          <strong>You can opt out of personalized advertising by visiting:</strong> <br />
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
        </p>
        <p>
          For more information, please refer to Google’s advertising policies: <br />
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            https://policies.google.com/technologies/ads
          </a>
        </p>

        <h2>5. Data Security</h2>
        <p>
          We use encryption, access control, and secure servers to protect your data. However, no system is 100% secure, and we cannot guarantee absolute protection.
        </p>

        <h2>6. Children’s Privacy</h2>
        <p>
          CommitNexus is not intended for children under 13. We do not knowingly collect personal data from children. If you believe we have unintentionally collected such data, please contact us for removal.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy at any time. Changes will be posted here with an updated date. Continued use of the website after changes signifies acceptance of the new terms.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at: <br />
          <a href="mailto:support@commitnexus.com">support@commitnexus.com</a> or visit our <a href="/contact">Contact Page</a>.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
