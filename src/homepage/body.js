import React from "react";
import Head from "./header";
import Footer from "./footer";
import "./Header.css";
import "./body.css";
import { Send, RefreshCw, ShieldCheck } from "lucide-react";
import ImageTextSlider from "./picslide";
import FAQ from "./faqpage";



// import homepage from "../homepage/Screenshot 2025-04-08 163452.png";
// import servicespage from "../homepage/Screenshot 2025-04-08 185626.png";
// import airestore from "../homepage/ai restore.png";
// import securestore from "../homepage/securestorage.png";


const Body = () => {

  const clickHandle = (path) => {
    window.location.href = path; // or use useNavigate() from react-router-dom
  };
  
  return (
    <>
      <Head />
      <div className="deepak">
        <div className="div">
        
  <div className="div3 content-div">
 
    <h1>Effortless Data Sharing</h1>
    <p className="heading3">
      Share files instantly across all your devices without any hassle or cables.
      <br className="hidden md:block" /> Enjoy seamless transfers, ensuring speed and security
    </p>
    <button className="button" onClick={() => clickHandle("/data-sharing")}>
      Get Started &gt;
    </button>
  </div>
        </div>
        <h1 className="heading">Powering Your Data Journey</h1><br />

        <div className="features-summary">
  <p className="heading3">
    At CommitNexus, we’ve combined cutting-edge AI, secure cloud technology, and seamless device communication to bring you a smarter, safer way to manage and share your files. Whether you're working across devices, or backing up important files, our platform is designed to keep everything efficient, automated, and protected.
  </p>
</div>

       <div className="feature-cards-row">
  <div className="feature-card">
    <Send className="card-icon" />
    <h2 className="heading2">Seamless Data Transfer</h2>
    <p className="heading3">
      Instantly transfer files across your devices with fast, secure, and reliable sharing. 
      Enjoy real-time sync, offline support, and encrypted transfers.
    </p>
  </div>

  <div className="feature-card">
    <RefreshCw className="card-icon" />
    <h2 className="heading2">AI-Powered File Recovery</h2>
    <p className="heading3">
      Our AI automatically detects and restores lost or corrupted files—no manual work needed. 
      Stay worry-free with smart, background recovery.
    </p>
  </div>

  <div className="feature-card">
    <ShieldCheck className="card-icon" />
    <h2 className="heading2">Secure Cloud Backup</h2>
    <p className="heading3">
      Your data is backed up in real-time with end-to-end encryption. 
      Access your files anytime, from any device, with complete peace of mind.
    </p>
  </div>
</div>
<h1 className="heading">How to Use CommitNexus</h1>

<div className="min-h-screen bg-white" >
      <ImageTextSlider />
    </div>
    <div>
      <FAQ />
    </div>

      </div>
      <Footer />
    </>
  );
};

export default Body;