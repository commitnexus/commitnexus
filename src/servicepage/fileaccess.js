import { useState } from "react";
import { motion } from "framer-motion";
import Head from "../homepage/header";
import "./SlidingFields.css";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";

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

  const openField = (index) => setStep(index);
  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);

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
      console.log("🌐 URL Fetch Result:", result);
      setData(result);
    } catch (err) {
      console.error("URL Fetch Error:", err.message);
      setError(err.message);
    }
  };

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
      console.log("📦 Code Fetch Result:", result);
      // If the response is wrapped inside 'data', unwrap it
      setData(result.data || result);
    } catch (err) {
      console.error("Code Fetch Error:", err.message);
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
      console.error("QR Scan Error:", err.message);
      setError("Failed to read QR code.");
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch QR data.");
      const result = await response.json();
      console.log("📲 QR Code Fetch Result:", result);
      setData(result.data || result);
    } catch (err) {
      console.error("QR Fetch Error:", err.message);
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
    } catch (err) {
      setFileContent("Error loading file content.");
    } finally {
      setLoading(false);
    }
  };

  const renderFolder = (folder) => (
    <div className="folder-container" key={folder.folderCode || folder.id}>
      <h3>📁 Folder Code: {folder.folderCode}</h3>

      <div className="files-wrapper">
        {folder.files?.map((file, index) => (
          <div key={index} className="file-card" onClick={() => fetchFileContent(file)}>
            <div className="file-icon">📄</div>
            <div className="file-name">{file.name}</div>
          </div>
        ))}
      </div>

      {folder.subfolders?.length > 0 && (
        <div className="subfolder-wrapper">
          {folder.subfolders.map((subfolder) => renderFolder(subfolder))}
        </div>
      )}
    </div>
  );

  function buildFolderTree(files) {
    const root = {};

    files.forEach(file => {
      const parts = file.path.split('/');
      let current = root;

      parts.forEach((part, i) => {
        if (i === parts.length - 1) {
          // It's a file
          if (!current.files) current.files = [];
          current.files.push({ name: part, url: file.url });
        } else {
          // It's a folder
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      });
    });

    return root;
  }

  // Step 2: Recursively render folders & files
  function renderFolderTree(tree, parentPath = "") {
    return Object.entries(tree).map(([key, value]) => {
      if (key === "files") {
        return value.map(file => (
          <div key={file.name} className="file">
            📄 <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
          </div>
        ));
      }

      const fullPath = parentPath ? `${parentPath}/${key}` : key;

      return (
        <div key={fullPath} className="folder">
          📁 <strong>{key}</strong>
          <div className="nested">
            {renderFolderTree(value, fullPath)}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <button className="button3" onClick={() => handleClick("/services")}>
        &lt; back
      </button>
      <div className="container">
        <Head />
        <motion.h1
          className="auto-sync-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Easy File Access
        </motion.h1>
        <div className="divmain">
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
          <div className="response-container">
      {/* QR Code */}
      {qrData && (
        <p className="qr-link">
          🔗 QR Code URL:{" "}
          <a href={qrData} target="_blank" rel="noopener noreferrer">{qrData}</a>
        </p>
      )}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Folder Structure */}
      {data && data.files && renderFolderTree(buildFolderTree(data.files))}

      {/* File Preview */}
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
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
