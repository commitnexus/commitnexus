import React, { useEffect, useState } from "react";
import {
  FaShareAlt,
  FaCloud,
  FaMagic,
  FaLock,
  FaSync,
  FaFolderOpen,
} from "react-icons/fa";
import "./services.css";
import Head from "../homepage/header";
import { useNavigate } from "react-router-dom";
import Footer from "../homepage/footer";

// 👇 Feature list
const features = [
  {
    title: "Data Sharing",
    icon: <FaShareAlt />,
    description: "Seamless file transfer between devices.",
    path: "/data-sharing",
  },
  {
    title: "Easy File Access",
    icon: <FaFolderOpen />,
    description: "Access your files anytime, anywhere.",
    path: "/file-access",
  },
  {
    title: "Secure Cloud Storage",
    icon: <FaCloud />,
    description: "Encrypted cloud storage for maximum security.",
    path: "/secure-cloud-storage",
  },
  {
    title: "End-to-End Encryption",
    icon: <FaLock />,
    description: "Your data remains private and secure.",
    path: "/end-to-end-encryption",
  },
  
];

// 👇 Animated Counter Component
const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const incrementTime = Math.floor(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <h3>{count.toLocaleString()}</h3>;
};

export default function FeaturesPage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Head />
      {/* 🚀 hero Section */}
    

      {/* 🔧 Features Grid */}
      <div className="features-container">
        <h1 className="features-title">
          Commit Nexus
          <p className="feature-description2">
            Commit to efficiency, connect without limits – welcome to CommitNexus.
          </p>
        </h1>

        <div className="features-grid">
          {features.map((feature, index) => (
            <button
              key={index}
              className="feature-card"
              onClick={() => handleClick(feature.path)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 📚 Info Section */}
      <div className="extra-info-section fade-in">
        <h2>Why CommitNexus?</h2>
        <p>
          At CommitNexus, we're building the future of intelligent file
          management with a seamless, AI-powered experience.
        </p>

        <div className="info-grid">
          <div className="info-card fade-in delay-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
              alt="AI Powered"
            />
            <h3>AI Powered File Restoration</h3>
            <p>
              Our system uses machine learning models to recover corrupted or
              lost files with high precision.
            </p>
          </div>
          <div className="info-card fade-in delay-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4149/4149627.png"
              alt="Cloud Storage"
            />
            <h3>Secure Cloud Storage</h3>
            <p>
              Access your files anywhere with top-grade encryption and backup
              systems.
            </p>
          </div>
          <div className="info-card fade-in delay-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/809/809957.png"
              alt="Real-time Sync"
            />
            <h3>Real-time Sync</h3>
            <p>
              Work across devices with real-time file syncing and easy access,
              no matter where you are.
            </p>
          </div>
        </div>

        {/* 📊 Stats Section */}
        <div className="stats-section fade-in">
          <h2>Platform Activity</h2>
          <p className="quote">
            “Empowering your data journey, one file at a time.”
          </p>

          <div className="stats-grid with-divider">
            <div className="stat-card fade-in delay-1">
              <Counter target={5280} duration={250000} />
              <p>Daily Active Users</p>
            </div>

            <div className="vertical-divider" />

            <div className="stat-card fade-in delay-2">
              <Counter target={1340} duration={250000} />
              <p>GB Shared Daily</p>
            </div>

            <div className="vertical-divider" />

            <div className="stat-card fade-in delay-3">
              <Counter target={1750} duration={250000} />
              <p>Files Restored by AI</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
