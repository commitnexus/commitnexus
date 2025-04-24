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
  
  const renderTree = (node) => {
    return (
      <ul style={{ paddingLeft: "1rem", listStyle: "none" }}>
        {Object.entries(node).map(([name, value]) => (
          <li key={name}>
            {value.type === "folder" ? (
              <>
                <strong>📁 {name}</strong>
                {renderTree(value.children)}
              </>
            ) : (
              <span>📄 {name}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  

  return (
    <>
      <Head />
      <Sidebar>
        <div className="recovery-container">
          <div className="recovery-card">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="recovery-title">Recover Your Files</h2>
              <p className="recovery-subtitle">
                Enter your 4-digit file code or scan QR to begin
              </p>

              <div className="input-group">
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
                className="recover-button"
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
