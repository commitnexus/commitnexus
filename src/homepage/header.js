import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";


const Head = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // Check login status on mount and listen for storage events
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        // Get the email from localStorage or some other source
        const userEmail = localStorage.getItem("userEmail");
        setEmail(userEmail);
      }
    };

    checkLogin();

    // Listen to storage events to handle login/logout across tabs
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    // Force a re-check for other components
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const clickhange = (path) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navv">
      <div className="brand">
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
            <a href="/services" className={location.pathname === "/services" ? "active" : ""}>Services</a>
          </li>
          <li>
            <a href="/blogs" className={location.pathname === "/blogs" ? "active" : ""}>Blog</a>
          </li>
          <li>
            <a href="/terms" className={location.pathname === "/terms" ? "active" : ""}>Terms</a>
          </li>
          <li>
            <a href="/privacy" className={location.pathname === "/privacy" ? "active" : ""}>Privacy policy</a>
          </li>
        </ul>

        <ul className="ul2">
          {!isLoggedIn ? (
            <>
              <li>
                <a href="/login" className={location.pathname === "/login" ? "active" : ""}>LogIn</a>
              </li>
              <li>
                <a href="/signup" className={location.pathname === "/signup" ? "active" : ""}>SignUp</a>
              </li>
              <li>
                <button className="button1" onClick={() => clickhange("/services")}>Get Started</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="profile-button" onClick={() => clickhange("/profile")}>
                  {email ? email.charAt(0).toUpperCase() : "?"}
                </button>
              </li>
              <li>
              <button className=" dots-button" onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical s3dots" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg></button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <button className="dropdown-item" onClick={() => clickhange("/profile")}>My Profile</button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Head;
