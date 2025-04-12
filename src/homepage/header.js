import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const clickhange = (path) => {
    navigate(path)
  }
  return (
    <>
     
      <div className="navv">
      <div className="brand">
          <img src="/datahubara3.ico" alt="DataHubAra Logo" className="brand-logo" onClick={()=>clickhange("/")}/>
          <b onClick={()=>clickhange("/")}>Commitnexus</b>
        </div>

        {/* Hamburger menu button for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>

        <div className={`navitems ${menuOpen ? "open" : ""}`}>
          <div></div>
          <ul >
         <li>
         
        </li>
            <li>
              <a href="/services" className={location.pathname === "/services" ? "active" : ""}>Services</a>
            </li>
            <li>
              <a href="/services" className={location.pathname === "/blog" ? "active" : ""}>Blog</a>
            </li>
            <li>
              <a href="/services" className={location.pathname === "/terms" ? "active" : ""}>Terms</a>
            </li>
            <li>
              <a href="/services" className={location.pathname === "/price" ? "active" : ""}>Pricing</a>
            </li>
            

           

          </ul>
          <ul className="ul2">
              <li>
                <a href="/login" className={location.pathname === "/login" ? "active" : ""}>LogIn</a>
              </li>
              <li>
                <a href="/signup" className={location.pathname === "/Signup" ? "active" : ""}>SignUp</a>
              </li>
              <li>
                <button className="button1" href="/services">Get Started</button>
              </li>

            </ul>

        </div>
            {/* <li>
              <button className={`button1 ${location.pathname === "/get-start" ? "active" : ""}`} style={{ color: "black" }}>Get Started</button>
            </li> */}
          
      </div>
    </>
  );
};

export default Head;