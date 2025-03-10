import { FaShareAlt, FaCloud, FaMagic, FaLock, FaSync, FaFolderOpen } from "react-icons/fa";
import "./services.css";
import Head from "../homepage/header";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Data Sharing", icon: <FaShareAlt />, description: "Seamless file transfer between devices.", path: "/data-sharing" },
  { title: "AI File Restoring", icon: <FaMagic />, description: "Automatically restore and organize your files.", path: "/ai-file-restoring" },
  { title: "Secure Cloud Storage", icon: <FaCloud />, description: "Encrypted cloud storage for maximum security.", path: "/secure-cloud-storage" },
  { title: "End-to-End Encryption", icon: <FaLock />, description: "Your data remains private and secure.", path: "/end-to-end-encryption" },
  { title: "Auto File Syncing", icon: <FaSync />, description: "Sync files across multiple devices effortlessly.", path: "/auto-file-syncing" },
  { title: "Easy File Access", icon: <FaFolderOpen />, description: "Access your files anytime, anywhere.", path: "/easy-file-access" },
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Head/>

      <div className="features-container">
        <h1 className="features-title">Commit Nexus
          <p className="about-subtext">
            Commit to efficiency, connect without limits – welcome to CommitNexus.
          </p>
        </h1>

        <div className="features-grid">
          {features.map((feature, index) => (
            <button key={index} className="feature-card" onClick={() => handleClick(feature.path)}>
              <div className="feature-icon">{feature.icon}</div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}