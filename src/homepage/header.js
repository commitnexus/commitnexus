import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const Head = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="navv">
        <div className="brand">
          <img src="/datahubara3.ico" alt="DataHubAra Logo" className="brand-logo" />
          <b>Commitnexus</b>
        </div>

        {/* Hamburger menu button for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>

        <div className={`navitems ${menuOpen ? "open" : ""}`}>
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
              <button className={`button1 ${location.pathname === "/get-start" ? "active" : ""}`} style={{ color: "black" }}>Get Started</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Head;