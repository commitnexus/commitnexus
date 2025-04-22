import React, { useState, useRef } from 'react';
import './FeaturePage.css';
import Head from '../homepage/header';
import Footer from '../homepage/footer';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Add this at the top
import loadinglogo from  '../homepage/images/output-onlinegiftools.gif';




const features = [
  { category: 'Mostly Used', items: [
    { title: 'File Sharing', path: '/features/file-sharing' },
    { title: 'File Recovery', path: '/features/file-recovery' },
  ]},
  { category: 'Security & Privacy', items: [
    { title: 'End-to-End Encryption', path: '/docs/security/end-to-end-encryption.md' },
    { title: 'Blockchain File Verification', path: '/docs/security/blockchain-verification.md' },
    { title: 'Biometric Login Support', path: '/docs/security/biometric-login.md' },
  ]},
  { category: 'Smart AI Features', items: [
    { title: 'Smart File Tagging', path: '/docs/ai/smart-tagging.md' },
    { title: 'Smart Suggestions', path: '/docs/ai/smart-suggestions.md' },
    { title: 'AI Auto Cleanup', path: '/docs/ai/auto-cleanup.md' },
  ]},
  { category: 'Upload & Sync', items: [
    { title: 'Background Uploads', path: '/docs/sync/background-uploads.md' },
    { title: 'Offline Mode Sync', path: '/docs/sync/offline-sync.md' },
    { title: 'Cross-Platform Sync', path: '/docs/sync/cross-platform-sync.md' },
    { title: 'Scheduled File Sharing', path: '/docs/sync/scheduled-sharing.md' },
  ]},
  { category: 'File Management', items: [
    { title: 'Version History and Restore', path: '/docs/management/version-history.md' },
    { title: 'Custom File Expiry Links', path: '/docs/management/expiry-links.md' },
    { title: 'AR File Access', path: '/docs/management/ar-access.md' },
  ]},
  { category: 'Search & Access', items: [
    { title: 'Smart File Search', path: '/docs/search/smart-search.md' },
    { title: 'Voice Command Support', path: '/docs/search/voice-commands.md' },
    { title: 'Multilingual Interface', path: '/docs/search/multilingual-interface.md' },
  ]},
  { category: 'Collaboration & UI', items: [
    { title: 'Team Collaboration & Chat', path: '/docs/ui/collaboration-chat.md' },
    { title: 'Custom Theming / Dark Mode', path: '/docs/ui/dark-mode.md' },
    { title: 'Activity Dashboard & Analytics', path: '/docs/ui/activity-dashboard.md' },
  ]},
];

const FileSharing = () => {
  const [isFileSelect, setIsFileSelect] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  

  

  const handleCopy = () => {
    navigator.clipboard.writeText(uploadResponse.folderUrl)
      .then(() => alert("📋 URL copied to clipboard!"))
      .catch(() => alert("❌ Failed to copy!"));
  };
  
  const handleQRDownload = () => {
    const link = document.createElement('a');
    link.href = uploadResponse.qrCode;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const paths = files.map(file => file.name);
    setSelectedFiles(files);
    setFilePaths(paths);
  };

  const [loading, setLoading] = useState(false); // Add loading state

  const fileInputRef = useRef();

  const handleSubmit = async () => {
    const fileInput = fileInputRef.current;
    const files = fileInput?.files;
  
    if (!files || files.length === 0) {
      console.log("❌ No files selected.");
      return;
    }
  
    const formData = new FormData();
    const filenames = [];
    const filepaths = [];
    const filesizes = [];
  
    for (const file of files) {
      formData.append("files", file);
      filenames.push(file.name);
      filepaths.push(file.webkitRelativePath || file.name);
      filesizes.push(file.size);
    }
  
    formData.append("filenamesRaw", JSON.stringify(filenames));
    formData.append("filepathsRaw", JSON.stringify(filepaths));
    formData.append("filesizeRaw", JSON.stringify(filesizes));
  
    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("❌ Upload failed:", data.error || data);
        return;
      }
  
      console.log("✅ Upload success:", data);
  
      // Update the state with the response data
      setUploadResponse(data);
      setShowPopup(true); // Show popup if the upload is successful
  
    } catch (err) {
      console.error("❌ Upload Error:", err);
    }
  };
  
  





  const closePopup = () => {
    setShowPopup(false); // Hide the popup when the close button is clicked
  };
    
const location = useLocation();
const [expandedCategory, setExpandedCategory] = useState(() => {
  // Find category whose item matches current location
  const found = features.find(cat =>
    cat.items.some(item => location.pathname.includes(item.path))
  );
  return found?.category || null;
});

const toggleCategory = (category) => {
  setExpandedCategory(prev =>
    prev === category ? null : category
  );
};

// const handleRemoveSelectedFile = (indexToRemove) => {
//   const updated = [...selectedFiles];
//   updated.splice(indexToRemove, 1);
//   setSelectedFiles(updated);
// };
const handleRemoveSelectedFile = (fileIdOrName) => {
  const updatedFiles = selectedFiles.filter((file) => file._id !== fileIdOrName && file.name !== fileIdOrName);
  setSelectedFiles(updatedFiles);

  // Now check if the condition holds true after updating the state
  if (updatedFiles.length === 0) {
    alert("Please select files and make sure file paths match.");
  }

  if (filePaths !== updatedFiles)
    alert("Are you sure you want to remove this file?");
};

  return (
    <>
      <div className="container2">
        <Head />
        
        
        <aside className="features-sidebar">
  <h2>Features</h2>
  <nav>
    {features.map((category, index) => (
      <div key={index} className="category">
        <h4 onClick={() => toggleCategory(category.category)} className="category-title clickable">
          {category.category}
        </h4>
        {expandedCategory === category.category && (
          <ul>
            {category.items.map((item, idx) => (
              <li key={idx} className="list-item">
                <Link to={item.path}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </nav>
</aside>



        <main className="data-sharing-container">
          <div></div>
          <div className="upload-container">
            <h1 className="heading">Upload Files or Folders</h1>

            <div className="toggle-buttons">
              <button
                onClick={() => setIsFileSelect(true)}
                className={`toggle-button ${isFileSelect ? 'active' : ''}`}
              >
                Select Files
              </button>
              <button
                onClick={() => setIsFileSelect(false)}
                className={`toggle-button ${!isFileSelect ? 'active' : ''}`}
              >
                Select Folders
              </button>
            </div>
            <form  encType="multipart/form-data">
            {isFileSelect ? (
  <div
    className="upload-area"
    id="file-upload-area"
    onClick={() => document.getElementById('file-input').click()}
  >
    <h2 style={{color:"gray"}}>Select Files</h2>
    <input
      ref={fileInputRef}
      id="file-input"
      onChange={handleFileChange}
      type="file"
      accept="*"
      multiple
      className="file-input"
      style={{ display: 'none' }} // Hide the file input itself
    />
  </div>
) : (
  <div
    className="upload-area"
    id="folder-upload-area"
    onClick={() => document.getElementById('folder-input').click()}
  >
    <h2 style={{color:"gray"}}>Select Folder</h2>
    <input
      ref={fileInputRef}
      id="folder-input"
      type="file"
      webkitdirectory="true"
      directory=""
      multiple
      onChange={handleFileChange}
      className="folder-input"
      style={{ display: 'none' }} // Hide the file input itself
    />
  </div>
)}
              {/* Display selected files/folders */}
              {selectedFiles.length > 0 && (
  <div className="file-list mt-4">
    <h3 className="text-lg font-semibold mb-2">Selected Items:</h3>
    {selectedFiles.map((file) => (
  <div
    key={file._id || file.name} // Ensure the key is unique to avoid re-renders
    className="file-item flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 mb-2"
  >
    <div className="flex gap-4 items-center">
      <span className="file-name font-medium">{file.name}</span>
      <span className="file-size text-sm text-gray-600">({Math.round(file.size / 1024)} KB)</span>
      <span className="file-path text-xs text-gray-500">{file.webkitRelativePath || file.name}</span>
    </div>

    <div className="flex gap-2">
      {/* View Button */}
      <a
        href={URL.createObjectURL(file)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
      >
        View
      </a>

      {/* Remove Button */}
      <button
        onClick={() => handleRemoveSelectedFile(file._id || file.name)} // Use unique identifier instead of index
        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
      >
        Remove
      </button>
    </div>
  </div>
))}

  </div>
)}


              <div className="submit-button-container">
              <button type="button" onClick={handleSubmit} className="upload-button">Upload</button>
              </div>
              {loading && (
      <div className="loading-overlay">
        <img src={loadinglogo} alt="Loading..." className='loadinglogo'/>
      </div>
    )}
            </form>
            {uploadResponse && (
  <div className="upload-response">
    <h2>✅ Upload Successful!</h2>
    <div className="upload-response-content">
      <div className="qr-code-container">
        <img
          src={uploadResponse.qrCode}
          alt="QR Code"
          className="qr-code"
        />
      </div>
      <div className="upload-details">
        <p><strong>Folder Code:</strong> {uploadResponse.folderCode}</p>
        <p><strong>Folder URL:</strong> <a href={uploadResponse.folderUrl} target="_blank" rel="noopener noreferrer">{uploadResponse.folderUrl}</a></p>
        <button className="copy-button" onClick={handleCopy}>
          📋 Copy URL
        </button> 

        {/* 🔗 Share Options */}
        <div className="share-options">
          <div className="share-buttons">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(uploadResponse.folderUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button whatsapp"
            >
              <FaWhatsapp />
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(uploadResponse.folderUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button facebook"
            >
              <FaFacebook /> 
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(uploadResponse.folderUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button twitter"
            >
              <FaTwitter /> 
            </a>

            <a
              href={`mailto:?subject=Check this file&body=${encodeURIComponent(uploadResponse.folderUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button email"
            >
              <FaEnvelope />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(uploadResponse.folderUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button linkedin"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <button className="qr-download-button" onClick={handleQRDownload}>
          ⬇️ Download QR Code
        </button>
      </div>
    </div>

    {/* List of Uploaded Files */}
    <div className='list-container'>
      <h4>Uploaded Files:</h4>
      <ul>
        {uploadResponse.files && uploadResponse.files.length > 0 ? (
          uploadResponse.files.map((file, idx) => (
            <li key={idx} className="file-item">
              <span className="file-name">{file.filename || "N/A"}</span>
              <span className="file-size">{file.filesize ? Math.round(file.filesize / 1024) + ' KB' : 'N/A'}</span>
              <span className="file-path">{file.filepath || "No path"}</span>
            </li>
          ))
        ) : (
          <li>No files uploaded.</li>
        )}
      </ul>
    </div>
  </div>
)}

          </div>     
        </main>

        {showPopup && uploadResponse && (
  <div className="popup">
    <div className="popup-content">
      <button className="close-button" onClick={closePopup}>X</button>
      <h2>✅ Upload Successful!</h2>
      <div className="upload-response-content">
        <div className="qr-code-container">
          <img
            src={uploadResponse.qrCode}
            alt="QR Code"
            className="qr-code"
            id="qrImage"
          />
          
        </div>
        <div className="upload-details">
          <h3><strong>Folder Code:</strong> {uploadResponse.folderCode}</h3>
          <p>
            <strong>Folder URL:</strong>
            <a href={uploadResponse.folderUrl} target="_blank" rel="noopener noreferrer">
              {uploadResponse.folderUrl}
            </a>
          </p>
          <button className="copy-button" onClick={handleCopy}>
            📋 Copy URL
          </button>
          
      {/* 🔗 Share Options */}
      <div className="share-options">
      <div className="share-buttons">
  <a
    href={`https://wa.me/?text=${encodeURIComponent(uploadResponse.folderUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="share-button whatsapp"
  >
    <FaWhatsapp />
  </a>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(uploadResponse.folderUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="share-button facebook"
  >
    <FaFacebook /> 
  </a>

  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(uploadResponse.folderUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="share-button twitter"
  >
    <FaTwitter /> 
  </a>

  <a
    href={`mailto:?subject=Check this file&body=${encodeURIComponent(uploadResponse.folderUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="share-button email"
  >
    <FaEnvelope />
  </a>

  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(uploadResponse.folderUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="share-button linkedin"
  >
    <FaLinkedin />
  </a>
</div>


      </div>
        </div>
      </div>
      <button className="qr-download-button" onClick={handleQRDownload}>
            ⬇️ Download QR Code
          </button>
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default FileSharing;
