import React, { useState } from "react";
import "./DataSharing.css";
import Head from "../homepage/header";

const DataSharing = () => {
  const [folderStructure, setFolderStructure] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});

  // File type logos
  const fileIcons = {
    html: "<>",
    css: "🎨",
    js: "⚡",
    jsx: "⚛️",
    ts: "TS",
    tsx: "TSX",
    py: "🐍",
    java: "☕",
    cpp: "C++",
    c: "C",
    cs: "C#",
    php: "🐘",
    swift: "🦊",
    go: "🐹",
    kotlin: "📱",
    ruby: "💎",
    json: "🗂️",
    django: "🐍",
    rs: "🦀",
    pl: "🚀",
    sh: "🛠️",
    node: "🟢",
    md: "📄",
    lisp: "🦜",
    dart: "🐦",
    sol: "🔗",
    r: "🎛️",
    default: "📁", // Default folder icon
  };

  // Get icon based on file extension
  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    return fileIcons[ext] || "📄"; // Default document icon
  };

  // Build folder tree
  const buildFolderTree = (files) => {
    const tree = {};
    files.forEach((file) => {
      const pathParts = file.webkitRelativePath.split("/");
      let currentLevel = tree;

      pathParts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = index === pathParts.length - 1 ? file.name : {};
        }
        currentLevel = currentLevel[part];
      });
    });
    return tree;
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFolderStructure(buildFolderTree(files));
  };

  // Toggle folder view
  const toggleFolder = (folderPath) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath],
    }));
  };

  // Render folder & file structure with folders first
const renderFolderTree = (tree, parentPath = "") => {
  const entries = Object.entries(tree);
  
  // Separate folders and files
  const folders = entries.filter(([_, value]) => typeof value === "object");
  const files = entries.filter(([_, value]) => typeof value !== "object");

  return (
    <ul>
      {[...folders, ...files].map(([key, value], index) => {
        const fullPath = parentPath ? `${parentPath}/${key}` : key;
        const isFolder = typeof value === "object";

        return (
          <li key={index}  style={{ }}>
            {isFolder ? (
              <div onClick={() => toggleFolder(fullPath)} style={{ cursor: "pointer", fontWeight: "bold", textAlign: "left", padding: "5px"}}>
                📁 {key}
              </div>
            ) : null}

            {isFolder && expandedFolders[fullPath] && (
              <div style={{ paddingLeft: "1.5rem", textAlign: "left" }}>
                {renderFolderTree(value, fullPath)}
              </div>
            )}

            {!isFolder && (
              <div style={{ padding: "0.2rem" }}>
                {getFileIcon(value)} {value}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};


  return (
    <>
      <Head />
      <div className="data-sharing-container">
        <h2>Data Sharing</h2>
        <p>Share your individual files and folders securely.</p>

        <div className="upload-section">
          <input type="file" multiple webkitdirectory="" directory="" onChange={handleFileChange} />
        </div>

        <div >
          {Object.keys(folderStructure).length > 0 && (
            <div >
              <h3>Selected Folders:</h3>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div className="ul-style" style={{ width: "600px" }}>
                     {renderFolderTree(folderStructure)}
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DataSharing;
