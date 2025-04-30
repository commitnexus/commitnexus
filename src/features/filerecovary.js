import { QrCode, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import Head from "../homepage/header"
import Sidebar from "../homepage/sidebar"
import "./FileRecovery.css"

export default function FileRecovery() {
  const inputRefs = useRef([])
  const [code, setCode] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [openFolders, setOpenFolders] = useState({});


  const handleInput = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      if (index < 3) inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code]
      newCode[index - 1] = ""
      setCode(newCode)
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleRecover = async () => {
    const finalCode = code.join("")
    if (finalCode.length !== 4) {
      setError("Please enter a valid 4-digit code")
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`https://commitnexusdatabase.onrender.com/api/folders/retrive/${finalCode}`)
      const data = await response.json()
      if (response.ok) {
        setResult(data)
        console.log("Recovery result:", data)
      } else {
        setError(data.message || "Invalid code")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const buildFolderTree = (files) => {
    const root = {};
  
    files.forEach(({ filepath, filename }) => {
      const parts = filepath.split('/');
      let current = root;
  
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          // Last part is the file
          current[filename] = { type: "file" };
        } else {
          if (!current[part]) {
            current[part] = { type: "folder", children: {} };
          }
          current = current[part].children;
        }
      });
    });
  
    return root;
  };

  const handleRemove = (targetPath, isFolder) => {
    const normalizePath = (path) => path.replace(/^\/+/, "").replace(/\/+/g, "/");
    const normalizedTarget = normalizePath(targetPath);  
  
    const updatedFiles = result.files.filter(file => {
      const fullPath = file.filepath.replace(/^\/+/, "");
      const filePath = normalizePath(fullPath);
      if (isFolder) {
        return !(filePath === normalizedTarget || filePath.startsWith(normalizedTarget + "/"));
      } else {
        return filePath !== normalizedTarget;
      }
    });
  
    setResult({ ...result, files: updatedFiles });
  };
  
  
  

  
  // const ActionButtons = ({ type, path }) => (
  //   <span style={{ marginLeft: "1rem", display: "inline-flex", gap: "0.5rem" }}>
  //     <button title="View" onClick={(e) => { e.stopPropagation(); alert(`Viewing ${path}`); }}>👁️</button>
  //     {type === "file" && (
  //       <button title="Download" onClick={(e) => { e.stopPropagation(); alert(`Downloading ${path}`); }}>⬇️</button>
  //     )}
  //     <button
  //       title="Remove"
  //       onClick={(e) => {
  //         e.stopPropagation();
  //         handleRemove(path, type === "folder");
  //       }}
  //     >
  //       ❌
  //     </button>
  //   </span>
  // );
  
  
  
  const renderTree = (node, path = "") => {
    return (
      <ul style={{ paddingLeft: "1.5rem", listStyle: "none" }}>
        {Object.entries(node).map(([name, value]) => {
          const currentPath = `${path}/${name}`;
          const isFolder = value.type === "folder";
          const isOpen = openFolders[currentPath];
  
          return (
            <li key={currentPath}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: isFolder ? "pointer" : "default",
                  padding: "4px 2px",
                }}
                className={isFolder ? "folder-item" : "file-item"}
                onClick={() => {
                  if (isFolder) {
                    setOpenFolders((prev) => ({
                      ...prev,
                      [currentPath]: !prev[currentPath],
                    }));
                  }
                }}
              >
                <span>
                  <strong>{isFolder ? (isOpen ? "📂" : "📁") : "📄"} {name}</strong>
                </span>
  
                <span style={{ display: "inline-flex",justifyContent:"flex-end", gap: "0.5rem" }}>

                {value.type === "file" && (
                    <button className="optionbutton" title="View" onClick={(e) => { e.stopPropagation(); alert(`viewing ${currentPath}`); }}>view</button>
                  )}
                  <button className="optionbutton" title="Download" onClick={(e) => { e.stopPropagation(); alert(`Downloading ${currentPath}`); }}>⬇️</button>
                  
                  <button
                    className="optionbutton"
                    title="Remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(currentPath, isFolder);
                    }}
                  >
                    ❌
                  </button>
                </span>
              </div>
  
              {isFolder && isOpen && renderTree(value.children, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };
  
  
  
  

  return (
    <>
      <Head />
      <Sidebar>
        <div className="recovery-container" >
        <div className={`recovery-card ${result?.files ? 'active' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="recovery-title">Recover Your Files</h2>
              <p className="recovery-subtitle">
                Enter your 4-digit file code or scan QR to begin
              </p>

              <div className={`input-group ${result?.files ? 'active' : ''}`}>
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    maxLength={1}
                    value={code[index]}
                    onChange={(e) => handleInput(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="digit-input"
                  />
                ))}
              </div>

              <button
                className={`recover-button ${result?.files ? 'active' : ''}`}
                onClick={handleRecover}
                disabled={loading}
              >
                {loading ? "Recovering..." : "Recover Files"}
              </button>

              {error && <p className="error-text">{error}</p>}
              {result?.files?.length > 0 && (
  <div style={{ marginTop: "1rem" }}>
    <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>Folder Structure:</h4>
    {renderTree(buildFolderTree(result.files))}
  </div>
)}


              <div className="button-group">
                <button className="ghost-button">
                  <QrCode size={20} /> Scan QR
                </button>
                <button
                  className="ghost-button ghost-reset"
                  onClick={() => {
                    setCode(["", "", "", ""])
                    inputRefs.current[0]?.focus()
                    setResult(null)
                    setError(null)
                  }}
                >
                  <RefreshCw size={20} /> Reset
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </Sidebar>
    </>
  )
}
