import React, { useState } from "react";
import axios from "axios"; 
import "./DataSharing.css";
import Head from "../homepage/header";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect } from "react";



import UploadIcon from "../homepage/images/upload logo.png" ;


const DataSharing = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [uploadStatus, setUploadStatus] = useState(""); 
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [uploadResponse, setUploadResponse] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");


  const handleCopy = () => {
    navigator.clipboard.writeText(uploadResponse.folderUrl);
    setCopied(true);

    // Hide the message after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    setError("");

    try {
      const response = await fetch(uploadResponse.qrCode);
      const blob = await response.blob();
      const file = new File([blob], "QRCode.png", { type: "image/png" });

      let shareMessage = `📂 Folder Code: ${uploadResponse.folderCode}\n🌍 Folder URL: ${uploadResponse.folderUrl}\n📄 Uploaded Files:\n`;

      if (uploadResponse.files?.length > 0) {
        uploadResponse.files.forEach((file, index) => {
          shareMessage += `${index + 1}. ${file.name}: ${file.url}\n`;
        });
      }

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Folder Share",
          text: shareMessage,
          files: [file], // Attach QR Code image
        });
      } else {
        setError("Sharing not supported on this device. Try downloading the image.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      setError("Failed to share the QR Code.");
    }
  };

  // File type icons
  const fileIcons = {
    html: "<>", css: "🎨", js: "⚡", jsx: "⚛️", ts: "TS", tsx: "TSX",
    py: "🐍", java: "☕", cpp: "C++", c: "C", cs: "C#", php: "🐘",
    swift: "🦊", go: "🐹", kotlin: "📱", ruby: "💎", json: "🗂️",
    django: "🐍", rs: "🦀", pl: "🚀", sh: "🛠️", node: "🟢", md: "📄",
    lisp: "🦜", dart: "🐦", sol: "🔗", r: "🎛️", default: "📁"
  };

  // Get icon based on file extension
  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    return fileIcons[ext] || "📄";
  };

  // Build folder tree
  const buildFolderTree = (files) => {
    const tree = {};
    files.forEach((file) => {
      const pathParts = file.webkitRelativePath.split("/");
      let currentLevel = tree;

      pathParts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = index === pathParts.length - 1 ? { name: file.name, type: "file" } : { children: {} };
        }
        currentLevel = currentLevel[part].children || {};
      });
    });
    return tree;
  };

  // Handle file selection (store files but don't upload)
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setSelectedFiles(files);
    setFolderStructure(buildFolderTree(files)); // Update folder structure
    setUploadStatus(""); // Reset upload status

  };

  // Toggle folder view
  const toggleFolder = (folderPath) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath],
    }));
  };

  // Render folder & file structure
  const renderFolderTree = (tree, parentPath = "") => {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
        {Object.entries(tree)
          .sort(([, a], [, b]) => {
            // Folders first, then files
            if (a.children && !b.children) return -1;
            if (!a.children && b.children) return 1;
            return a.name?.localeCompare(b.name);
          })
          .map(([key, value], index) => {
            const fullPath = parentPath ? `${parentPath}/${key}` : key;
            const isFolder = value.children !== undefined;
            const isExpanded = expandedFolders[fullPath];
  
            return (
              <li key={index} style={{ padding: "5px 0" }}>
                {/* Folder Display with Arrow Bullets */}
                {isFolder ? (
                  <div
                    onClick={() => toggleFolder(fullPath)}
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      textAlign: "left",
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>
                      {isExpanded ? "▼" : "▶"}
                    </span>
                    📁 {key}
                  </div>
                ) : null}
  
                {/* Expand Folder */}
                {isFolder && isExpanded && (
                  <div style={{ paddingLeft: "1.5rem", textAlign: "left" }}>
                    {renderFolderTree(value.children, fullPath)}
                  </div>
                )}
  
                {/* File Display with Arrow */}
                {!isFolder && value.name && (
                  <div
                    style={{
                      padding: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>➜</span>
                    {getFileIcon(value.name)} {value.name}
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    );
  };
  
  // Handle file upload when Submit button is clicked
  async function handleFolderUpload() {
    const files = selectedFiles;
    if (!files.length) return alert("❌ No files selected");
  
    const formData = new FormData();
    const filePaths = [];

    for (let file of files) {
      console.log("📁 File path:", file.webkitRelativePath);
      filePaths.push(file.webkitRelativePath);
      formData.append("files", file, file.webkitRelativePath);
    }

    // ✅ Send filePaths array as a JSON string
    formData.append("filePaths", JSON.stringify(filePaths));

    try {
      const res = await axios.post("https://commitnexusdatabase.onrender.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Upload Success:", res.data);
      
      setUploadResponse(res.data); // <- this is needed to display the result!
      setUploadStatus("Upload completed successfully!");
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert("❌ Upload failed!");
    }
  }
  

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };


  const [folderMode, setFolderMode] = useState(false);

  const handleFileChange2 = (e) => {
    const files = e.target.files;
    console.log("Selected:", files);
  };

  const toggleMode = () => {
    setFolderMode((prev) => !prev);
  };
  
  useEffect(() => {
    const sharingContent = document.getElementById("sharingcontent");
    if (sharingContent) {
      sharingContent.style.display =
        Object.keys(folderStructure).length > 0 ? "none" : "block";
    }
  }, [folderStructure]);
  

  return (
    <>
    <div className="divmain">

      <motion.h1 
        className="datashare-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       <> Data Sharing</>
      </motion.h1>    
      
      <Head />
      <div className="inputfield">
      <label htmlFor="fileupload" className="imagelayout">
        <img
          src={UploadIcon}
          alt="Upload"
          className="image"
          style={{ cursor: "pointer" }}
        />
      </label>
      <h2 className="upload-title">
        {folderMode ? "Upload a Folder" : "Upload Files"}
      </h2>
      <p className="upload-subtext">
        {folderMode
          ? "Select an entire folder to upload"
          : "Supported formats: PDF, JPG, PNG, DOCX"}
      </p>

      <input
        type="file"
        id="fileupload"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        {...(folderMode ? { webkitdirectory: "true", directory: "" } : {})}
      />

      <button onClick={toggleMode} className="toggle-button">
        {folderMode ? "Switch to File Upload" : "Switch to Folder Upload"}
      </button>
    </div>

    <div id="sharingcontent" className="sharing-content">
  <h3>
    🔒 <strong>Note:</strong> For security and privacy reasons, all shared data is stored temporarily for <strong>2 hours</strong>. After this period, it is automatically deleted from our servers and all associated links will expire.
  </h3>

  <div className="more-info">
    <h4>📁 Data Sharing with CommitNexus</h4>
    <p>
      CommitNexus offers a fast, secure, and user-friendly way to share files and folders across devices. Whether you're transferring documents, images, or entire directories, our system ensures your data is handled with care.
    </p>
    <ul>
      <li><strong>Unique Share Codes:</strong> Generate a simple 4-digit code for quick and direct access to your shared data.</li>
      <li><strong>QR Code Integration:</strong> Each upload includes a QR code for effortless sharing with mobile devices.</li>
      <li><strong>Temporary & Secure:</strong> Files are encrypted and automatically removed after 2 hours to protect your privacy.</li>
      <li><strong>Cross-Device Compatibility:</strong> Access shared data from any browser on desktop, tablet, or mobile.</li>
    </ul>
  </div>
</div>

      <div className="data-sharing-container">
         


          {/* <div  style={{ display: "flex", justifyContent: "center", gap: "20px", padding:"20px"}}>
   */}
  {/* File Upload */}
  {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
    <label htmlFor="file-upload" style={{ cursor: "pointer", padding: "10px 15px", background: "#007bff", color: "white", borderRadius: "5px" }}>
      📂 Choose Files
    </label>
    <input type="file" id="file-upload" multiple onChange={handleFileChange} style={{ display: "none" }} />
  </div> */}

  {/* Folder Upload */}
  {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
    <label htmlFor="folder-upload" style={{ cursor: "pointer", padding: "10px 15px", background: "#007bff",  color: "white", borderRadius: "5px" }}>
      📁 Choose Folder
    </label>
    <input
  type="file"
  id="folder-upload"
  multiple
  webkitdirectory="true"
  directory=""
  onChange={handleFileChange}
  style={{ display: "none" }}
/>

  </div>

</div> */}




        {/* Display folder structure */}
        {Object.keys(folderStructure).length > 0 && (
  <div className="folder-structure">
    <h3 style={{ padding: "10px" }}>Selected Folder Structure:</h3>
    <div className="ul-style" style={{ width: "100%" }}>
      {renderFolderTree(folderStructure)}
    </div>
  </div>
)}


          <button onClick={handleFolderUpload} disabled={selectedFiles.length === 0} className="submit-btn">
            Share Files
          </button>

         
   </div>

   
    </div>
    {uploadStatus && (
          <>
            <p>{uploadStatus}</p>
              <br /> {/* Correct self-closing <br> */}
          </>
          )}
          {uploadResponse && (
  <>
    <hr /> {/* Corrected the self-closing hr tag */}

    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    flexWrap: "wrap", // Ensures wrapping when the screen shrinks
    justifyContent: "center", // Centers items when stacked
    textAlign: "center", // Aligns text properly when stacked
  }}
>
  {/* Left: QR Code */}
  <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
    <img
      src={uploadResponse.qrCode}
      alt="QR Code for folder"
      style={{ width: "150px" }}
    />
  </div>

  {/* Right: Folder Details & Uploaded Files */}
  <div
      style={{
        flex: "2 1 300px",
        minWidth: "300px",
        textAlign: "left",
        lineHeight: "30px",
      }}
    >
      <h3>📂 Folder Code: {uploadResponse.folderCode}</h3>

      <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        🌍 Folder URL:{" "}
        <a href={uploadResponse.folderUrl} target="_blank" rel="noopener noreferrer">
          {uploadResponse.folderUrl}
        </a>
      </h3>
      {/* Copy Button */}
      <button
          onClick={handleCopy}
          style={{
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Copy URL
        </button>

      {/* Show "Copied!" Message */}
      {copied && <p style={{ color: "green", fontSize: "14px" }}>✅ Copied!</p>}
      {error && (
  <>
    <p style={{ color: "red" }}>❌ {error}</p>
    <a href={uploadResponse.qrCode} download="QRCode.png">
      ⬇️ Download QR Code
    </a>
  </>
)}

      
        {/* Share Button */}
        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            padding: "5px 10px",
            backgroundColor: "#25D366", // WhatsApp green color
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Share 🔗
        </button>

        {/* Error Message if Sharing is Not Supported */}
        {error && <p style={{ color: "red", fontSize: "14px" }}>❌ {error}</p>}

        {/* Social Media Links */}
        <div style={{ marginTop: "10px" }}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `📂 Folder Code: ${uploadResponse.folderCode}\n🌍 Folder URL: ${uploadResponse.folderUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "10px", textDecoration: "none" }}
          >
            📲 WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${uploadResponse.folderUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "10px", textDecoration: "none" }}
          >
            📘 Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${uploadResponse.folderUrl}&text=Check out this folder`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            🐦 Twitter
          </a>
        </div>


    </div>

</div>

  </>
)}
    </>
  );
};

export default DataSharing;
