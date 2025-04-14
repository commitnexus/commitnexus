import React from 'react';
import './terms.css';
import Head from '../homepage/header';
import Footer from '../homepage/footer';

const TermsAndConditions = () => {
  return (
    <>
      <Head />
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>Last updated: April 14, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to CommitNexus. These Terms and Conditions govern your use of our website, mobile application, and all related services (collectively referred to as “Platform”). By accessing or using the Platform, you agree to be bound by these terms. If you do not agree, please do not use the Platform.
        </p>

        <h2>2. Use of Services</h2>
        <p>
          You agree to use CommitNexus only for lawful purposes. You are responsible for any activity conducted under your account, including file sharing, uploading, or accessing data via QR codes, links, or folder codes. You may not use our services to transmit or store illegal, harmful, or copyrighted content without permission.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features, you may be required to create an account. You must provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and are liable for all activities under your account.
        </p>

        <h2>4. File Uploads & Sharing</h2>
        <p>
          By uploading content, you confirm you have the necessary rights and permissions. CommitNexus is not liable for any user-uploaded content. We provide tools like 4-digit folder codes, QR sharing, and direct URLs for simplified sharing. However, we do not guarantee perpetual availability of shared content.
        </p>

        <h2>5. AI File Restoration & Auto-Organizing</h2>
        <p>
          Our AI features may automatically restore deleted files or sort files into organized folders. While we strive for accuracy, CommitNexus is not responsible for unintended file movements or failed restorations. Users are encouraged to back up critical data.
        </p>

        <h2>6. Data Security & Cloud Storage</h2>
        <p>
          We implement industry-standard encryption and security protocols to protect your data. However, we cannot guarantee absolute security. You agree to use the platform at your own risk and acknowledge that no system is completely immune from unauthorized access.
        </p>

        <h2>7. Termination of Access</h2>
        <p>
          We may suspend or terminate your account or access to CommitNexus at any time, without prior notice, if you violate these Terms or engage in harmful behavior. Upon termination, your access to uploaded content may be restricted or removed.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          CommitNexus is provided “as is” and “as available.” We do not guarantee uninterrupted service, error-free operation, or complete accuracy of content. In no event shall CommitNexus or its affiliates be liable for indirect or consequential damages.
        </p>

        <h2>9. Modifications</h2>
        <p>
          We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the Platform after changes signifies acceptance of the updated Terms.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions or concerns about these Terms and Conditions, please contact us at: <a href="mailto:support@commitnexus.com">support@commitnexus.com</a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
