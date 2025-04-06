import React, { useState } from 'react';
import { Loader2, FileCheck2, UploadCloud, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from "../homepage/header";
import './AIFileRestoringPage.css';

const AIFileRestoringPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recoveryHint, setRecoveryHint] = useState('');
  const [restoring, setRestoring] = useState(false);
  const [restoredFiles, setRestoredFiles] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleRestore = async () => {
    if (!selectedFile) return;
    setRestoring(true);

    // Simulate AI restore process
    setTimeout(() => {
      const confidence = Math.floor(Math.random() * 20 + 80); // 80–99% confidence

      setRestoredFiles([
        {
          name: selectedFile.name,
          size: selectedFile.size,
          status: 'Restored',
          confidence: confidence
        }
      ]);
      setRestoring(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 3000);
  };

  return (
    <div className="ai-restore-container">
      <Head />
      <motion.h1 
        className="ai-restore-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI File Restoring
      </motion.h1>

      <p className="ai-restore-description">
        Recover corrupted or lost files using intelligent pattern recognition and data reconstruction.
        Upload your file and let our AI assist you.
      </p>

      <div className="ai-restore-box">
        <div className="ai-restore-card">
          <div className="ai-restore-form">

            {/* Upload Area */}
            <label className="ai-restore-label">
              <UploadCloud className="ai-upload-icon" />
              <span>Choose a corrupted or lost file</span>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="hidden"
              />
            </label>

            {selectedFile && (
              <div className="ai-restore-selected">
                Selected: <strong>{selectedFile.name}</strong>
              </div>
            )}

            {/* Recovery Hint Input */}
            <div className="ai-restore-hint">
              <label htmlFor="recoveryHint">Recovery Notes (optional):</label>
              <input 
                type="text"
                id="recoveryHint"
                value={recoveryHint}
                onChange={(e) => setRecoveryHint(e.target.value)}
                placeholder="e.g., Draft report or invoice from March"
                className="ai-hint-input"
              />
            </div>

            {/* Restore Button */}
            <button 
              onClick={handleRestore} 
              disabled={!selectedFile || restoring} 
              className="ai-restore-button"
            >
              {restoring ? (
                <span className="ai-restore-loading">
                  <Loader2 className="animate-spin h-4 w-4" /> Restoring...
                </span>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Restore with AI
                </>
              )}
            </button>

            {/* Restored Files */}
            <AnimatePresence>
              {restoredFiles.length > 0 && (
                <motion.div
                  className="ai-restore-output"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <h2>Restored Files</h2>
                  {restoredFiles.map((file, idx) => (
                    <div key={idx} className="ai-restored-file-item">
                      <div>
                        <p>{file.name}</p>
                        <p className="file-size">Size: {Math.round(file.size / 1024)} KB</p>
                        <p className="confidence-score">Confidence: {file.confidence}%</p>
                      </div>
                      <FileCheck2 className="restored-icon" />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="ai-toast"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            🎉 File successfully restored!
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default AIFileRestoringPage;
