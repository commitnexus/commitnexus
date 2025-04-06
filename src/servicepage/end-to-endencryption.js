import React, { useState } from 'react';
import { Lock, Send, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Head from '../homepage/header';
import './EndToEndEncryptionPage.css';

const EndToEndEncryptionPage = () => {
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');

  const encryptMessage = (msg) => {
    // Simple base64 encoding for demo (not real encryption)
    return btoa(unescape(encodeURIComponent(msg)));
  };

  const handleEncrypt = () => {
    const result = encryptMessage(message);
    setEncrypted(result);
  };

  return (
    <div className="encryption-container">
        <Head/>
      <motion.h1 
        className="encryption-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        End-to-End Encryption
      </motion.h1>

      <p className="encryption-description">
        Secure your communication with end-to-end encryption. Enter your message below and we’ll encrypt it before it’s transmitted.
      </p>

      <div className="encryption-box">
        <textarea
          className="encryption-textarea"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button 
          className="encryption-button"
          onClick={handleEncrypt}
          disabled={!message.trim()}
        >
          <Send className="send-icon" /> Encrypt Message
        </button>

        {encrypted && (
          <div className="encryption-result">
            <h2 className="result-heading">
              <ShieldCheck className="shield-icon" /> Encrypted Message
            </h2>
            <p className="encrypted-text">{encrypted}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndToEndEncryptionPage;
