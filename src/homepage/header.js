import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation if using React Router
import './Header.css';

const Head = () => {
  const location = useLocation(); // Get current page path

  return (
    <>
      <div className="navv">
        <div className="brand">
          <img src="/datahubara3.ico" alt="DataHubAra Logo" className="brand-logo" />
          <b>Commitnexus</b><br />
        </div> {/* This is the brand */}

        <div className="navitems">
          <ul>
            <li>
              <a href="/" className={location.pathname === "/" ? "active" : ""}>Home</a>
            </li>
            <li>
              <a href="/services" className={location.pathname === "/services" ? "active" : ""}>Services</a>
            </li>
            <li>
              <a href="/about" className={location.pathname === "/about" ? "active" : ""}>About</a>
            </li>
            <li>
              <a href="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</a>
            </li>
            <li>
              <button href="#get-start" className={`button1 ${location.pathname === "/get-start" ? "active" : ""}`} style={{ color: "black" }}>Get Started</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Head;
