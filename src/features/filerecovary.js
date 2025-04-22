import React, { useState } from 'react';
import axios from 'axios';
import './FileRecovery.css';
import Head from '../homepage/header';
import Sidebar from '../homepage/sidebar';

// ✅ Converts flat list of files into a nested folder structure
const buildFolderTree = (files) => {
  const root = {};

  files.forEach(({ filepath, filename, filesize }) => {
    const parts = filepath.split('/');
    let current = root;

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        // It's a file
        current[part] = { filename, filesize, isFile: true };
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
  });

  return root;
};

// ✅ Recursive folder structure UI component
const FolderTree = ({ tree, parentPath = '' }) => {
  return (
    <ul className="folder-tree">
      {Object.entries(tree).map(([key, value]) => {
        const fullPath = `${parentPath}/${key}`;
        if (value.isFile) {
          return (
            <li key={fullPath} className="file-item">
              📄 {value.filename} ({value.filesize} bytes) —
              <a
                href={`https://commitenexus.xyz${fullPath}`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="download-link"
              >
                Download
              </a>
            </li>
          );
        }

        return (
          <li key={fullPath} className="folder-item">
            📁 {key}
            <FolderTree tree={value} parentPath={fullPath} />
          </li>
        );
      })}
    </ul>
  );
};

const FileRecovery = () => {
  const [code, setCode] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecover = async () => {
    const trimmedCode = code.trim();

    if (!/^\d{4}$/.test(trimmedCode)) {
      setError('Please enter a valid 4-digit code.');
      return;
    }

    setError('');
    setFiles([]);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://commitnexusdatabase.onrender.com/api/folders/retrive/${trimmedCode}`
      );
      if (response.data && response.data.files.length > 0) {
        setFiles(response.data.files);
      } else {
        setFiles([]);
        setError('No files found for this code.');
      }
    } catch (err) {
      setError('Failed to recover files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head />
      <Sidebar>
        <div className="recovery-container">
          <h1 className="title">Recover Your Files</h1>

          <div className="input-section">
            <label htmlFor="codeInput" className="code-label">
              Enter 4-digit code:
            </label>
            <input
              id="codeInput"
              type="text"
              placeholder="1234"
              value={code}
              maxLength={4}
              onChange={(e) => setCode(e.target.value.replace(/\s+/g, ''))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRecover();
              }}
              className="code-input"
            />
            <button
              onClick={handleRecover}
              className="recover-button"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : 'Recover'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {!error && !loading && files.length === 0 && (
            <p className="no-files-message">No files to display.</p>
          )}

          <div className="files-list">
            {files.length > 0 && (
              <>
                <h3 className="structure-title">📁 Folder Structure</h3>
                <FolderTree tree={buildFolderTree(files)} />
              </>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default FileRecovery;
