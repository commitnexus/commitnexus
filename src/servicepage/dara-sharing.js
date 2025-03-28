import React, { useState } from "react";
import axios from "axios"; 
import "./DataSharing.css";
import Head from "../homepage/header";

const DataSharing = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [uploadStatus, setUploadStatus] = useState(""); 
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [uploadResponse, setUploadResponse] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(""); // Initialize error state


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
  const handleSubmitUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setUploadStatus("Uploading...");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    
      if (response.status === 201) {
        setUploadStatus("✅ Files upload successful!");
        setUploadResponse(response.data);  // Store response
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("❌ Upload failed. Please try again.");
    }
    
  };

  return (
    <div>
      <Head />
      <div className="data-sharing-container">
        <h1 style={{paddingBottom:"10px"}}>Data Sharing</h1>
        <h4 style={{ 
         fontWeight: "bold", 
         textAlign: "center", 
         marginTop: "10px" 
          }}>
            ⚠️ Note: For security and privacy reasons, all transferred data will be stored in our database for only 2 hours. 
            After this period, the data will be automatically deleted, and any provided links will no longer be accessible.
        </h4>

          <p style={{padding:"20px 0px 0px 0px"}}>Share your individual files and folders securely.</p>

          <div  style={{ display: "flex", justifyContent: "center", gap: "20px", padding:"20px"}}>
  
  {/* File Upload */}
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
    <label htmlFor="file-upload" style={{ cursor: "pointer", padding: "10px 15px", background: "#007bff", color: "white", borderRadius: "5px" }}>
      📂 Choose Files
    </label>
    <input type="file" id="file-upload" multiple onChange={handleFileChange} style={{ display: "none" }} />
  </div>

  {/* Folder Upload */}
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
    <label htmlFor="folder-upload" style={{ cursor: "pointer", padding: "10px 15px", background: "#007bff",  color: "white", borderRadius: "5px" }}>
      📁 Choose Folder
    </label>
    <input
  type="file"
  id="folder-upload"
  multiple
  webkitdirectory=""
  directory=""
  onChange={handleFileChange}
  style={{ display: "none" }}
/>
  </div>

</div>




        {/* Display folder structure */}
        {Object.keys(folderStructure).length > 0 && (
          <div>
            <h3 style={{ padding:"10px"}}>Selected Folder Structure:</h3>
            <div className="ul-style" style={{ width: "100%" }}>{renderFolderTree(folderStructure)}</div>
          </div>
        )}

          <button onClick={handleSubmitUpload} disabled={selectedFiles.length === 0} className="submit-btn">
            Share Files
          </button>

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
   </div>
    </div>
  );
};

export default DataSharing;
