import React, { useRef, useState } from 'react';
import './SmartUploader.css'; // Make sure to create this CSS file
import Head from '../homepage/header';
import Footer from '../homepage/footer';
import Sidebar from '../servicepage/serivces2';

export default function SmartUploader() {
  const fileRef = useRef(null);
  const folderRef = useRef(null);
  const [items, setItems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setItems(files.map(f => f.name));
  };

  const handleFolderSelect = (e) => {
    const files = Array.from(e.target.files);
    setItems(files.map(f => f.webkitRelativePath));
  };

  return (
    <div className="container">
        <Head />
        <Sidebar />
      <div className="card">
        <h1 className="title">📁 Smart Upload</h1>

        <div className="dropdown">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="select-button"
          >
            Select Files or Folder
          </button>

          {showOptions && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => {
                  fileRef.current.click();
                  setShowOptions(false);
                }}
              >
                📄 Upload Files
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  folderRef.current.click();
                  setShowOptions(false);
                }}
              >
                📁 Upload Folder
              </button>
            </div>
          )}
        </div>

        {/* Hidden Inputs */}
        <input
          ref={fileRef}
          type="file"
          onChange={handleFileSelect}
          multiple
          className="hidden-input"
        />
        <input
          ref={folderRef}
          type="file"
          webkitdirectory="true"
          directory="true"
          onChange={handleFolderSelect}
          className="hidden-input"
        />

        {/* Show Uploaded List */}
        {items.length > 0 && (
          <div className="file-list">
            <h2 className="file-list-title">Selected:</h2>
            <ul className="file-list-items">
              {items.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
        <Footer />
    </div>
  );
}
