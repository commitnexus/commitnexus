import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Head = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const isFeaturesPage = location.pathname === "/features" || location.pathname.startsWith("/features/");

  const clickhange = (path) => {
    navigate(path);
  };

  // 🔐 Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]); // update on route change

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  
  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
  const firstLetter = user?.email?.[0]?.toUpperCase();


  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <div className="navv">
      <div className={`brand ${isFeaturesPage ? "left-align" : ""}`}>
        <img
          src="/commitnexus.png"
          alt="commitnexus Logo"
          className="brand-logo"
          onClick={() => clickhange("/")}
        />
        <b onClick={() => clickhange("/")}>Commitnexus</b>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </div>

      <div className={`navitems ${menuOpen ? "open" : ""}`}>
        <div></div>
        <ul>
          <li>
            <a
              href="/features/file-sharing"
              className={location.pathname === "/features/file-sharing" ? "active" : ""}
            >
              Services
            </a>
          </li>
          <li>
            <a href="/blogs" className={location.pathname === "/blogs" ? "active" : ""}>
              Blog
            </a>
          </li>
          <li>
            <a href="/terms" className={location.pathname === "/terms" ? "active" : ""}>
              Terms
            </a>
          </li>
          <li>
            <a href="/privacy" className={location.pathname === "/privacy" ? "active" : ""}>
              Privacy policy
            </a>
          </li>
        </ul>

        {/* 👇 Only show if NOT logged in */}
        {!isLoggedIn ? (
  <ul className={`ul2 ${isFeaturesPage ? "left-align" : ""}`}>
    <li>
      <a href="/login" className={location.pathname === "/login" ? "active" : ""}>
        LogIn
      </a>
    </li>
    <li>
      <a href="/signup" className={location.pathname === "/signup" ? "active" : ""}>
        SignUp
      </a>
    </li>
    <li>
      <button className="button1" onClick={() => clickhange("/services")}>
        Get Started
      </button>
    </li>
  </ul>
) : (
  <ul className={`ul2 ${isFeaturesPage ? "left-align" : ""}`}>
            <li >
              <input type="text" className="search-input" placeholder="Search anything. eg:file code,name ...."/>
            </li>
            <li className="profile-wrapper">
              <div className="profile-circle">
                {firstLetter}
              </div>
            </li>
            <li>
            <button className="menudots" onClick={toggleMenu}            >
              &#8942;
            </button>
            </li>
          </ul>
)}

      </div>
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            padding: "0.5rem",
            zIndex: 10,
          }}
        >
                  <button onClick={handleLogout}>Logout</button>
                  <p style={{ margin: 0, padding: "0.5rem", cursor: "pointer" }}>Delete</p>
        </div>
      )}
    </div>
  );
};

export default Head;
