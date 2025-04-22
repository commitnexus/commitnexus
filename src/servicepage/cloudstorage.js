import React, { useState } from 'react';
import { CloudUpload, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Head from "../homepage/header";
import './CloudStoragePage.css';

const CloudStoragePage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);

    // Simulate file upload delay
    setTimeout(() => {
      setUploadedFiles(selectedFiles);
      setSelectedFiles([]);
      setUploading(false);
    }, 3000);
  };

  return (
    <div className="cloud-storage-container">
        <Head/>
      <motion.h1 
        className="cloud-storage-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Secure Cloud Storage
      </motion.h1>

      <p className="cloud-storage-description">
        Upload your files to our encrypted cloud storage for easy access, secure backup, and seamless synchronization across all your devices.
      </p>

      <div className="cloud-storage-box">
        <div className="cloud-storage-card">
          <div className="cloud-storage-form">
            <label className="cloud-storage-label">
              <CloudUpload className="cloud-upload-icon" />
              <span>Select files to upload</span>
              <input 
                type="file" 
                multiple
                onChange={handleFileChange} 
                className="hidden"
              />
            </label>

            {selectedFiles.length > 0 && (
              <div className="cloud-storage-selected">
                <h3>Files to upload:</h3>
                <ul>
                  {selectedFiles.map((file, idx) => (
                    <li key={idx}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
                  ))}
                </ul>
              </div>
            )}

            <button 
              onClick={handleUpload} 
              disabled={selectedFiles.length === 0 || uploading} 
              className="cloud-storage-button"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Uploading...
                </span>
              ) : (
                'Upload to Cloud'
              )}
            </button>

            {uploadedFiles.length > 0 && (
              <div className="cloud-storage-uploaded">
                <h2>Uploaded Files</h2>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="cloud-storage-file-item">
                    <div className="cloud-storage-file-name">
                      <FileText className="icon" />
                      <p>{file.name}</p>
                    </div>
                    <CheckCircle2 className="success-icon" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudStoragePage;