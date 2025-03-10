import "./About.css";
import Head from "../homepage/header";

export default function AboutPage() {
  return (
    <>
      <Head />
      <div className="about-container">
        <h1 className="about-title">About CommitNexus</h1>
        <p className="about-description">
          CommitNexus is dedicated to revolutionizing file management through seamless data sharing,
          AI-powered file restoration, and secure cloud storage. Our mission is to enhance efficiency
          and data protection for users worldwide.
        </p>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We strive to provide an innovative platform where users can effortlessly manage, restore,
            and securely store their files with cutting-edge AI technology.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Secure end-to-end encrypted cloud storage</li>
            <li>AI-driven file management and restoration</li>
            <li>Effortless file sharing across multiple devices</li>
            <li>Seamless auto-syncing and accessibility</li>
          </ul>
        </div>
      </div>
    </>
  );
}