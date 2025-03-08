import React from "react";
import './Header.css';

const Head = () => {
  return (
    <>
    <div className="navv" >
      <div className="brand">
      <img src="/datahubara3.ico" alt="DataHubAra Logo" className="brand-logo" />
      <b>Commitnexus</b><br />
        </div>  {/* This is the brand */}
        
        <div className="navitems">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><button href="#get-start" className="button1" style={{ color: "black" }}>Get Started</button></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Head;
