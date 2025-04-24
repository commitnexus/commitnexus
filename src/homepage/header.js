import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Head = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isFeaturesPage = location.pathname === "/features" || location.pathname.startsWith("/features/");

  const clickhange = (path) => {
    navigate(path);
  };

  // 🔐 Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]); // update on route change

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
  <ul className="ul2">
    <li>
      <div className="profile-circle" title="Your Profile">
        {
          JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))
            ?.email?.[0]?.toUpperCase()
        }
      </div>
    </li>
  </ul>
)}

      </div>
    </div>
  );
};

export default Head;
