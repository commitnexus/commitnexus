import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import UploadIcon from "../homepage/images/upload logo.png";
import Head from "../homepage/header";
import "./DataSharing.css";

const DataSharing = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [folderMode, setFolderMode] = useState(false);
  const [finalfile, setFinalFile] = useState(null);
  const [showdatashare, setShowDataShare] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const fileIcons = {
    js: "⚡", html: "<>", css: "🎨", py: "🐍", java: "☕",
    json: "🗂️", md: "📄", txt: "📃", jsx: "⚛️", default: "📄"
  };

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    return fileIcons[ext] || fileIcons.default;
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setSelectedFiles(files);
    setFolderStructure(buildFolderTree(files));
    setUploadStatus("");
  };

  const buildFolderTree = (files) => {
    const tree = {};
    files.forEach((file) => {
      const parts = file.webkitRelativePath.split("/");
      let current = tree;
      parts.forEach((part, index) => {
        if (!current[part]) {
          if (index === parts.length - 1) {
            current[part] = { name: file.name, type: "file" };
          } else {
            current[part] = { children: {} };
          }
        }
        current = current[part].children || {};
      });
    });
    return tree;
  };

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const removeItem = (path) => {
    const parts = path.split("/");
    const updatedTree = { ...folderStructure };
    let current = updatedTree;
  
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) return;
      current = current[parts[i]].children;
    }
    delete current[parts[parts.length - 1]];
  
    // selectedFiles nunchi remove cheyadam
    const updatedFiles = selectedFiles.filter(
      (file) => !file.webkitRelativePath.startsWith(path)
    );
  
    setFolderStructure(updatedTree);
    setSelectedFiles(updatedFiles); // 👈 most important
  };
  
  const viewFile = (path) => {
    const file = selectedFiles.find(f => f.webkitRelativePath === path);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFileContent(reader.result);
      };
      reader.readAsText(file);
    } else {
      setSelectedFileContent("⚠️ File not found or unsupported.");
    }
  };

  const renderFolderTree = (tree, parentPath = "") => (
    <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
      {Object.entries(tree)
        .sort(([, a], [, b]) => {
          if (a.children && !b.children) return -1;
          if (!a.children && b.children) return 1;
          return a.name?.localeCompare(b.name);
        })
        .map(([key, value]) => {
          const fullPath = parentPath ? `${parentPath}/${key}` : key;
          const isFolder = !!value.children;
          const isExpanded = expandedFolders[fullPath];

          return (
            <li key={fullPath} style={{ padding: "5px 0" }}>
              {isFolder ? (
                <div
                  onClick={() => toggleFolder(fullPath)}
                  style={{ cursor: "pointer", fontWeight: "bold", display: "flex", justifyContent: "space-between" }} className="folder-item"
                >
                  <div>
                    {isExpanded ? "▼" : "▶"} 📁 {key}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeItem(fullPath); }} className="editoptions">Remove</button>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between" }} className="file-item">
                  <span>{getFileIcon(value.name)} {value.name}</span>
                  <div>
                    <button onClick={() => viewFile(fullPath)} className="editoptions"> View</button>
                    <button onClick={() => removeItem(fullPath)} className="editoptions">Remove</button>
                  </div>
                </div>
              )}
              {isFolder && isExpanded && (
                <div style={{ paddingLeft: "1.5rem" }}>
                  {renderFolderTree(value.children, fullPath)}
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );

  const renderFolderTree2 = (tree, parentPath = "") => (
    <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
      {Object.entries(tree)
        .sort(([, a], [, b]) => {
          if (a.children && !b.children) return -1;
          if (!a.children && b.children) return 1;
          return a.name?.localeCompare(b.name);
        })
        .map(([key, value]) => {
          const fullPath = parentPath ? `${parentPath}/${key}` : key;
          const isFolder = !!value.children;
          const isExpanded = expandedFolders[fullPath];
  
          return (
            <li key={fullPath} style={{ padding: "5px 0" }}>
              {isFolder ? (
                <div
                  onClick={() => toggleFolder(fullPath)}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {isExpanded ? "▼" : "▶"} 📁 {key}
                  </div>
                </div>
              ) : (
                <div style={{ paddingLeft: "1.5rem" }}>
                  📄 {key}{value.name}
                </div>
              )}
  
              {isFolder && isExpanded && (
                <div style={{ paddingLeft: "1.5rem" }}>
                  {renderFolderTree2(value.children, fullPath)}
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
  const handleFolderUpload = async () => {
    const remainingFiles = getRemainingFiles(folderStructure);
  
    if (!remainingFiles.length) return alert("No files to upload.");
  
    const formData = new FormData();
    const paths = [];
  
    remainingFiles.forEach((file) => {
      formData.append("files", file, file.webkitRelativePath);
      paths.push(file.webkitRelativePath);
    });
  
    formData.append("filePaths", JSON.stringify(paths));
  
    setIsLoading(true); // Show loading
  
    try {
      const res = await axios.post("https://commitnexusdatabase.onrender.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadResponse(res.data);
      setUploadStatus("✅ Upload successful!");
    } catch (err) {
      alert("❌ Upload failed");
    } finally {
      setIsLoading(false); // Hide loading
    }
  };  

  const getRemainingFiles = (tree, path = "") => {
    let files = [];
  
    for (const key in tree) {
      const currentPath = path ? `${path}/${key}` : key;
      const value = tree[key];
  
      if (value.type === "file") {
        const file = selectedFiles.find((f) => f.webkitRelativePath === currentPath);
        if (file) files.push(file);
      } else if (value.children) {
        files = [...files, ...getRemainingFiles(value.children, currentPath)];
      }
    }
  
    return files;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uploadResponse.folderUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(uploadResponse.qrCode);
      const blob = await response.blob();
      const file = new File([blob], "QRCode.png", { type: "image/png" });

      const shareText = `📁 Folder Code: ${uploadResponse.folderCode}\n🌍 ${uploadResponse.folderUrl}`;
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: "Share Folder", text: shareText, files: [file] });
      } else {
        setError("Sharing not supported on this device.");
      }
    } catch {
      setError("Error sharing QR Code.");
    }
  };

  const toggleMode = () => setFolderMode((prev) => !prev);

  useEffect(() => {
    const content = document.getElementById("sharingcontent");
    if (content) {
      content.style.display = Object.keys(folderStructure).length ? "none" : "block";
    }
  }, [folderStructure]);

  return (
    <div className="divmain">
      <motion.h1 className="datashare-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <> Data Sharing </>
      </motion.h1>
      <Head />

      <div className="inputfield">
        <label htmlFor="fileupload" className="imagelayout">
          <img src={UploadIcon} alt="Upload" className="image" style={{ cursor: "pointer" }} />
        </label>
        <h2 className="upload-title">{folderMode ? "Upload a Folder" : "Upload Files"}</h2>
        <p className="upload-subtext">{folderMode ? "Select a folder" : "Supported: PDF, JPG, PNG, DOCX"}</p>

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
        <h3>🔒 Your data is temporary (auto-deleted after 2 hours)</h3>
        
      </div>
      
      {Object.keys(folderStructure).length > 0 && (
  <>
    <div className="folder-structure">
      <h3 >
        📂 Selected Folder Structure{" "}
        <FaEdit onClick={() => setShowModal(true)} style={{ cursor: "pointer" }} />
          
      </h3>
      {selectedFiles.length > 0 && (
      <div>
        <button onClick={handleFolderUpload} className="sharebtn" disabled={isLoading}>
  {isLoading ? "Uploading..." : "Share Files"}
</button>

      </div>
    )}
      {renderFolderTree2(folderStructure)}
 </div>
  </>
)}
  
{showModal && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }}>
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      minHeight: "90vh",
      width: "90vw",
      overflowY: "auto",
      position: "relative",
      backgroundColor:"rgb(33, 31, 47)"
    }}>
      <button
        onClick={() => setShowModal(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer"
        }}
      >
        Close
      </button>

      <h2 style={{ marginBottom: "10px" }}>Folder Structure</h2>
      <div className="ul-style" style={{ width: "100%" }}>
      {renderFolderTree(folderStructure)}


      </div>
    </div>


  </div>
)}

{uploadResponse && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }}>
    <div className="share-modal" style={{
      background: "#1e1e2f",
      padding: "24px",
      borderRadius: "16px",
      display: "flex",
      gap: "30px",
      color: "white",
      maxWidth: "90vw",
      minHeight: "47vh",
      position: "relative"
    }}>
      {/* Close Button */}
      <button
        onClick={() => setUploadResponse(null)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        ✖
      </button>

      {/* Left - QR Code */}
      <div>
        <img src={uploadResponse.qrCode} alt="QR" style={{ borderRadius: "8px", minWidth: "300px" }} />
      </div>

      {/* Right - Details and Actions */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1>Sharing Details</h1>
        <p style={{ margin: 0, fontSize: "18px" }}>
          <strong>File Code:</strong> {uploadResponse.folderCode}
        </p>

        <p style={{ margin: 0, fontSize: "16px", wordBreak: "break-all" }}>
          🌍 <a
            href={uploadResponse.folderUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#29f0cc", textDecoration: "none" }}
          >
            {uploadResponse.folderUrl}
          </a>
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={handleCopy}
            style={{
              backgroundColor: "#29f0cc",
              color: "#000",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            📋 Copy URL
          </button>

          <button
            onClick={handleShare}
            style={{
              backgroundColor: "#6c63ff",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🔗 Share
          </button>
        </div>

        {copied && <span style={{ color: "#29f0cc", fontSize: "14px" }}>✅ Copied!</span>}
      </div>
    </div>
  </div>
)}
      {selectedFileContent && (
        <div className="file-preview">
          <h3>📄 File Content:</h3>
          <pre>{selectedFileContent}</pre>
        </div>
      )}

      
    </div>
   
  );
};

export default DataSharing;
