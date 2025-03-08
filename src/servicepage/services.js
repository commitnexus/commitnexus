import React from "react";
import Head from "../homepage/header";
import "./services.css";

const SimplePage = () => {
  return (
    <div className="container">
        <Head/>
      <div className="section-container">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="section-card">
            <h2 className="section-title">Section {index + 1}</h2>
            <p className="section-content">This is section {index + 1} with some content.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplePage;
