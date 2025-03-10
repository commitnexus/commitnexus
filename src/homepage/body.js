import React from "react";
import Head from "./header";
import Footer from "./footer";
import "./Header.css";
import "./body.css";
import aiImage from "../homepage/ai.png";

const Body = () => {
  return (
    <>
      <Head />
      <div className="deepak">
        <div className="div">
          <div className="div3 content-div">
            <h1>AI-Assisted File Management & Cloud Backup</h1>
            <p className="heading3">
              Our platform simplifies data transfer between devices with secure, fast, and reliable transfers. 
              Powered by AI, it automatically recovers missing files and ensures all your data is securely 
              backed up in the cloud. Easy, efficient, and worry-free data management.
            </p>
            <button className="button">Get Started &gt;</button>
          </div>
          <div className="div4">
            <img src={aiImage} alt="AI Illustration" className="image-style" />
          </div>
        </div>

        <h1 className="heading">Key Features:</h1><br/>

        <h1 className="heading2">Seamless Data Transfer</h1>
        <div className="div">
          <div className="div4">
          <img src={aiImage} alt="AI Illustration" className="image-style" />

          </div>
          <div className="div3">
            <p className="heading3">
              Transferring data between devices has never been easier! Our platform ensures fast, seamless, and secure 
              file sharing across all your devices, whether it's a phone, tablet, or computer. With AI-powered 
              optimization, your files are transferred without interruptions, maintaining their original quality. 
              Enjoy real-time sync, offline transfer options, and end-to-end encryption, ensuring your data stays 
              private and protected. No more worrying about lost files or slow transfers—experience lightning-fast, 
              reliable, and hassle-free data sharing today!
            </p>
          </div>
        </div>
        <button className="button2 databutton">Transfer data &gt;</button>

        <h1 className="heading2">AI-Powered File Recovery</h1>
        <div className="div">
          <div className="div3">
            <p className="heading3">
              Losing important files can be frustrating, but our AI-powered file recovery ensures you never have to 
              worry again! Our advanced AI scans your storage, identifies missing or corrupted files, and intelligently 
              restores them from backups or alternative sources.
              <br />
              🔹 Automated Detection – AI instantly finds missing or damaged files.<br />
              🔹 Smart Restoration – Recovers lost data using cloud backups and predictive algorithms.<br />
              🔹 No Manual Effort Needed – AI handles recovery in the background.<br />
              🔹 File Integrity Protection – Ensures files are restored in their original quality.<br />
              With AI-driven recovery, your data remains secure, complete, and always accessible, saving you time and effort!
            </p>
          </div>
          <div className="div4">
          <img src={aiImage} alt="AI Illustration" className="image-style" />

          </div>
        </div>
        <button className="button2 databutton">AI file restoring &gt;</button>

        <h1 className="heading2">Secure Cloud Backup</h1>
        <div className="div">
          <div className="div4">
          <img src={aiImage} alt="AI Illustration" className="image-style" />

          </div>
          <div className="div3">
            <p className="heading3">
              Store your files safely with our secure cloud storage, ensuring easy access anytime, anywhere. Our platform 
              automatically backs up your data, protecting it from accidental loss, device failures, or cyber threats.
              <br />
              🔹 End-to-End Encryption – Your files remain private and fully secure.<br />
              🔹 Automatic & Real-Time Backup – Never worry about losing important data.<br />
              🔹 Access Anywhere – Retrieve your files from any device, anytime.<br />
              🔹 Scalable Storage – Choose a plan that fits your needs, from personal to enterprise-level storage.<br />
              With our AI-enhanced cloud storage, your data is safe, organized, and always available whenever you need it!
            </p>
          </div>
        </div>
        <button className="button2 databutton">Cloud storage &gt;</button>
      </div>
      <Footer />
    </>
  );
};

export default Body;