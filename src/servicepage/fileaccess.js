import { useState } from "react";
import { motion } from "framer-motion";
import Head from "../homepage/header";
import "./SlidingFields.css";
import QrScanner from "qr-scanner";


export default function SlidingFields() {
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState("");
  const [responseData, setResponseData] = useState("");
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [qrData, setQrData] = useState("");
  const [retrievedData, setRetrievedData] = useState(null);




  const openField = (index) => {
    setStep(index);
  };

  const handleRetrieve = async () => {
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.text(); // Assuming text response, use .json() if JSON
      setResponseData(data);
    } catch (error) {
      setResponseData("Error fetching data. Please check the URL.");
    }
  };

  const handleRetrieve2 = async () => {
    if (code.length !== 4) {
      setError("Please enter a valid 4-digit code.");
      return;
    }
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/folders/retrive/${code}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setError("");
    setRetrievedData(null);

    try {
      const result = await QrScanner.scanImage(file);
      setQrData(result);
      fetchData(result);
    } catch (err) {
      setError("Failed to read QR code.");
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setRetrievedData(data);
    } catch (err) {
      setError("Error fetching data from QR URL.");
    }
  };


  return (
    <div className="container">
        <Head />
      <div className="button-group">
        <button className="nav-button" onClick={() => openField(0)}>URL</button>
        <button className="nav-button" onClick={() => openField(1)}>File Code</button>
        <button className="nav-button" style={{borderRight:"none"}} onClick={() => openField(2)}>QR Code</button>
      </div>
      <div className="slider-container">
        <motion.div
          className="slider"
          animate={{ x: -step * 350 }}
          transition={{ type:"tween", stiffness: 100 }}
        >



             <div className="field">
        <label className="name">Enter URL:</label>
        <br />
        <input
          type="url"
          placeholder="Enter URL"
          className="input-field"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="button4" onClick={handleRetrieve}>Retrieve</button>
      </div>
      




      <div className="field">
      <label className="name">Enter File Code:</label>
      <input
        type="text"
        maxLength={4}
        placeholder="Enter 4-digit Code"
        className="input-field"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button className="button4" onClick={handleRetrieve2}>Retrieve</button>
      
    </div>
    
    
    
    <div className="field">
      <label className="name">Upload QR Code:</label>
      <input type="file" accept="image/*" className="input-field" onChange={handleFileChange} />
      {image && <img src={image} alt="QR Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      {qrData && <p>🔗 QR Code URL: {qrData}</p>}
      {error && <p className="error">{error}</p>}
      
    </div>



        </motion.div>

      </div>
      <div className="response-container">
        <h3>Response:</h3>
        <pre className="response-text">{responseData}</pre>
        {error && <p className="error">{error}</p>}
      {data && (
        <div className="data-display">
          <h3>Retrieved Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {retrievedData && (
        <div className="data-display">
          <h3>Retrieved Data:</h3>
          <pre>{JSON.stringify(retrievedData, null, 2)}</pre>
        </div>
      )}
      </div>
    </div>
  );
}
