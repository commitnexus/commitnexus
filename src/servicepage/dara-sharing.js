import React, { useState } from "react";
import axios from "axios"; 
import "./DataSharing.css";
import Head from "../homepage/header";

const DataSharing = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [uploadStatus, setUploadStatus] = useState(""); 
  const [selectedFiles, setSelectedFiles] = useState([]); 

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
        setUploadStatus("✅ Upload successful!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <>
      <Head />
      <div className="data-sharing-container">
        <h1>Data Sharing</h1>
        <p style={{padding:"20px 0px 0px 0px"}}>Share your individual files and folders securely.</p>

        <div className="upload-section">
            <label htmlFor="file-upload">📂 Choose Files</label>
            <input type="file" multiple webkitdirectory="" directory="" id="file-upload" onChange={handleFileChange} />
        </div>


        {/* Display folder structure */}
        {Object.keys(folderStructure).length > 0 && (
          <div>
            <h3 style={{ padding:"10px"}}>Selected Folder Structure:</h3>
            <div className="ul-style" style={{ width: "100%" }}>{renderFolderTree(folderStructure)}</div>
          </div>
        )}

          <button onClick={handleSubmitUpload} disabled={selectedFiles.length === 0}>
            Submit
          </button>
          {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </>
  );
};

export default DataSharing;
