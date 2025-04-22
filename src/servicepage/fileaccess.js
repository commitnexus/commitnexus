import { useState } from "react";
import { motion } from "framer-motion";
import Head from "../homepage/header";
import "./SlidingFields.css";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import {
  FaFolder, FaFileAlt, FaFileImage, FaFilePdf, FaFileCode,
  FaEye, FaTrash, FaDownload
} from "react-icons/fa";

export default function SlidingFields() {
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [qrData, setQrData] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const openField = (index) => setStep(index);
  const navigate = useNavigate();

  //retrive by url
  const handleRetrieve = async () => {
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch. Status: ${response.status}`);
      const contentType = response.headers.get("content-type");
      const result = contentType.includes("application/json") ? await response.json() : await response.text();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const getFileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(ext)) return <FaFileImage />;
    if (["pdf"].includes(ext)) return <FaFilePdf />;
    if (["json", "js", "ts", "txt", "html", "css"].includes(ext)) return <FaFileCode />;
    return <FaFileAlt />;
  };

  //retrive by code
  const handleRetrieve2 = async () => {
    if (code.length !== 4) {
      setError("Please enter a valid 4-digit code.");
      return;
    }
    try {
      const url = `https://commitnexusdatabase.onrender.com/api/folders/retrive/${code}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch. Status: ${response.status}`);
      const result = await response.json();
      setData(result.data || result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setError("");
    setQrData("");
    setData(null);

    try {
      const result = await QrScanner.scanImage(file);
      const modifiedUrl = result.endsWith("/") ? result + "qr" : result + "/qr";
      setQrData(modifiedUrl);
      fetchData(modifiedUrl);
    } catch (err) {
      setError("Failed to read QR code.");
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch QR data.");
      const result = await response.json();
      setData(result.data || result);
    } catch (err) {
      setError("Error fetching data from QR URL.");
    }
  };

  const fetchFileContent = async (file) => {
    try {
      setLoading(true);
      setFileType(null);
      setFileContent(null);

      const response = await fetch(file.url);
      const contentType = response.headers.get("Content-Type");

      if (contentType.includes("image")) {
        setFileType("image");
        setFileContent(file.url);
      } else if (contentType.includes("application/pdf")) {
        setFileType("pdf");
        setFileContent(file.url);
      } else if (contentType.includes("application/json")) {
        const jsonData = await response.json();
        setFileType("json");
        setFileContent(JSON.stringify(jsonData, null, 2));
      } else {
        const text = await response.text();
        setFileType("text");
        setFileContent(text);
      }
    } catch {
      setFileContent("Error loading file content.");
    } finally {
      setLoading(false);
    }
  };

  const buildFolderTree = (files) => {
    const root = {};
    files.forEach(file => {
      const parts = file.path.split('/');
      let current = root;
      parts.forEach((part, i) => {
        if (i === parts.length - 1) {
          if (!current.files) current.files = [];
          current.files.push({ name: part, url: file.url });
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      });
    });
    return root;
  };

  const renderFolderTree = (tree, parentPath = "") => {
    return Object.entries(tree).map(([key, value]) => {
      if (key === "files") {
        return (
          <div className="file-group" key={`files-${parentPath}`}>
            {value.map(file => (
              <div key={file.name} className="file-item" >
                {getFileIcon(file.name)} <span className="file-name">{file.name}</span>
                
              </div>
            ))}
          </div>
        );
      }

      const fullPath = parentPath ? `${parentPath}/${key}` : key;
      return (
        <div key={fullPath} className="folder-block">
          <div
            className="folder-name"
            onClick={() => isEditing && setEditingFolder({ path: fullPath, content: value })}
          >
            <FaFolder /> <strong>{key}</strong>
          </div>
          <div className="folder-contents">
            {renderFolderTree(value, fullPath)}
          </div>
        </div>
      );
    });
  };

  const handleRemoveFile = (fileName) => {
    const updated = { ...editingFolder };
    updated.content.files = updated.content.files.filter(f => f.name !== fileName);
    setEditingFolder(updated);
  };

  const handleRemoveFolder = (folderName) => {
    const updated = { ...editingFolder };
    delete updated.content[folderName];
    setEditingFolder(updated);
  };

  const handleDownloadFile = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div>
      <div className="container">
        <Head />
        <motion.h1 className="file-access-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Easy File Access
        </motion.h1>
        <div className="divmains">
          <div className="div1">
            <div className="button-group">
              <button className="nav-button" onClick={() => openField(0)}>URL</button>
              <button className="nav-button" onClick={() => openField(1)}>File Code</button>
              <button className="nav-button" style={{ borderRight: "none" }} onClick={() => openField(2)}>QR Code</button>
            </div>
            <div className="slider-container">
              <motion.div className="slider" animate={{ x: -step * 350 }} transition={{ type: "tween", stiffness: 100 }}>
                <div className="field">
                  <label className="name">Enter URL:</label>
                  <input type="url" className="input-field" value={url} onChange={(e) => setUrl(e.target.value)} />
                  <button className="button4" onClick={handleRetrieve}>Retrieve</button>
                </div>
                <div className="field">
                  <label className="name">Enter File Code:</label>
                  <input type="text" maxLength={4} className="input-field" value={code} onChange={(e) => setCode(e.target.value)} />
                  <button className="button4" onClick={handleRetrieve2}>Retrieve</button>
                </div>
                <div className="field">
                  <label className="name">Upload QR Code:</label>
                  <input type="file" accept="image/*" className="input-field" onChange={handleFileChange} />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="div2">
            <h3 className="section-title">📁 Folder Structure:</h3>
            {data?.files && (
              <button className="global-edit-btn" onClick={() => setIsEditing(!isEditing)}>
                ✏️ {isEditing ? "Exit Edit Mode" : "Edit Folder Structure"}
              </button>
            )}
            <div className="response-container">
              {qrData && (
                <p className="qr-link">
                  🔗 QR Code URL: <a href={qrData} target="_blank" rel="noopener noreferrer">{qrData}</a>
                </p>
              )}
              {error && <p className="error">{error}</p>}
              {/* {data?.files && renderFolderTree(buildFolderTree(data.files))} */}
              {fileContent && (
                <div className="file-preview">
                  <h4>📄 File Preview:</h4>
                  {loading ? (
                    <p>Loading...</p>
                  ) : fileType === "image" ? (
                    <img src={fileContent} alt="Preview" className="preview-img" />
                  ) : fileType === "pdf" ? (
                    <iframe src={fileContent} width="100%" height="500px" title="PDF Preview" />
                  ) : (
                    <pre className="preview-text">{fileContent}</pre>
                  )}
                </div>
              )}

{data?.files && (
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
      {renderFolderTree(buildFolderTree(data.files))}

      </div>
    </div>


  </div>
)}
            </div>
          </div>
        </div>

        {editingFolder && (
          <div className="edit-card">
            <h3>Editing: {editingFolder.path}</h3>
            <button className="close-btn" onClick={() => setEditingFolder(null)}>❌ Close</button>
            {editingFolder.content.files?.map(file => (
              <div key={file.name} className="editable-file">
                📄 {file.name}
                <div className="actions">
                  <button onClick={() => window.open(file.url, "_blank")}><FaEye /> View</button>
                  <button onClick={() => handleRemoveFile(file.name)}><FaTrash /> Remove</button>
                  <button onClick={() => handleDownloadFile(file.url, file.name)}><FaDownload /> Download</button>
                </div>
              </div>
            ))}
            {Object.keys(editingFolder.content)
              .filter(k => k !== "files")
              .map(folderName => (
                <div key={folderName} className="editable-folder">
                  📁 {folderName}
                  <div className="actions">
                    <button onClick={() => handleRemoveFolder(folderName)}><FaTrash /> Remove</button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
