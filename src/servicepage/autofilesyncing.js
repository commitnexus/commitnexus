import React, { useState } from 'react';
import { RefreshCcw, CloudUpload, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './AutoSyncFiles.css';
import Head from '../homepage/header';

const AutoFileSyncPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [syncedFiles, setSyncedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSync = async () => {
    if (selectedFiles.length === 0) return;
    setSyncing(true);

    // Simulate file syncing delay
    setTimeout(() => {
      setSyncedFiles(selectedFiles);
      setSelectedFiles([]);
      setSyncing(false);
    }, 3000);
  };

  return (
    <div className="auto-sync-container">
        <Head/>
      <motion.h1 
        className="auto-sync-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Auto File Syncing
      </motion.h1>

      <p className="auto-sync-description">
        Our automatic file syncing feature ensures your files are always up-to-date across all your devices. Simply select files, and they will be synchronized securely.
      </p>

      <div className="auto-sync-box">
        <div className="auto-sync-card">
          <div className="auto-sync-form">
            <label className="auto-sync-label">
              <CloudUpload className="cloud-upload-icon" />
              <span>Select files to sync</span>
              <input 
                type="file" 
                multiple
                onChange={handleFileChange} 
                className="hidden"
              />
            </label>

            {selectedFiles.length > 0 && (
              <div className="auto-sync-selected">
                <h3>Files to Sync:</h3>
                <ul>
                  {selectedFiles.map((file, idx) => (
                    <li key={idx}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
                  ))}
                </ul>
              </div>
            )}

            <button 
              onClick={handleSync} 
              disabled={selectedFiles.length === 0 || syncing} 
              className="auto-sync-button"
            >
              {syncing ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCcw className="animate-spin h-4 w-4" /> Syncing...
                </span>
              ) : (
                'Sync Files'
              )}
            </button>

            {syncedFiles.length > 0 && (
              <div className="auto-sync-uploaded">
                <h2>Synced Files</h2>
                {syncedFiles.map((file, idx) => (
                  <div key={idx} className="auto-sync-file-item">
                    <div className="auto-sync-file-name">
                      <CheckCircle2 className="success-icon" />
                      <p>{file.name}</p>
                    </div>
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

export default AutoFileSyncPage;
