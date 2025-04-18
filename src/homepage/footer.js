import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="lg:w-1/3">
          <a href="#" className="footer-logo">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
            <img src="/commitnexus.png" alt="commitnexus Logo" className='logo' /><br/>
            </div>
          </a>
          <span className="self-center text-2xl font-semibold">CommitNexus</span>

        </div>

        <div className="footer-links lg:w-2/3">
          <div className="footer-section">
            <h3>Product</h3>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Developers</h3>
            <ul>
              <li><a href="#">Public API</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Social Media</h3>
            <div className="footer-social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>
        </div>
      </div>
      
  <hr className="footer-divider" />
  
  <div className="footer-bottom">
    <h2>© {new Date().getFullYear()} CommitNexus. All rights reserved.</h2>
  </div>
    </footer>
  );
};

export default Footer;
