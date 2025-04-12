import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      

      <div style={moreInfoContainer}>
        <div style={moreInfoColumn}>
          <h4 style={headingStyle}>More Information</h4>
          <ul style={infoListStyle}>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/contact" style={linkStyle}>Contact Us</a></li>
            <li><a href="/support" style={linkStyle}>Support</a></li>
            <li><a href="/careers" style={linkStyle}>Careers</a></li>
            <li><a href="/faq" style={linkStyle}>FAQs</a></li>
          </ul>
        </div>

        <div style={moreInfoColumn}>
          <h4 style={headingStyle}>Follow Us</h4>
          <div style={socialMediaLinks}>
            <a href="https://facebook.com" style={socialLinkStyle}>
              <FaFacebook size={24} style={iconStyle} />
              Facebook
            </a>
            <a href="https://twitter.com" style={socialLinkStyle}>
              <FaTwitter size={24} style={iconStyle} />
              Twitter
            </a>
            <a href="https://instagram.com" style={socialLinkStyle}>
              <FaInstagram size={24} style={iconStyle} />
              Instagram
            </a>
            <a href="https://linkedin.com" style={socialLinkStyle}>
              <FaLinkedin size={24} style={iconStyle} />
              LinkedIn
            </a>
            <a href="https://github.com" style={socialLinkStyle}>
              <FaGithub size={24} style={iconStyle} />
              GitHub
            </a>
          </div>
        </div>

        <div style={moreInfoColumn}>
          <h4 style={headingStyle}>Contact</h4>
          <p style={contactText}>123 Street Name, City, Country</p>
          <p style={contactText}>Email: datahubara.com</p>
          <p style={contactText}>Phone: +91 7989254913
          </p>
        </div>

        <div style={newsletterColumn}>
          <h4 style={headingStyle}>Newsletter Signup</h4>
          <p style={newsletterText}>Sign up for our newsletter to get the latest updates.</p>
          <form style={newsletterForm}>
            <input type="email" placeholder="Enter your email" style={newsletterInput} />
            <button type="submit" style={newsletterButton}>Subscribe</button>
          </form>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={leftStyle}>
          <p>&copy; 2025 Commitnexus. All rights reserved.</p>
        </div>
        <div style={rightStyle}>
          <a href="/terms" style={linkStyle}>Terms of Service</a>
          <a href="/privacy" style={linkStyle}>Privacy Policy</a>
        </div>
      </div>

    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '20px 0',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '80%',
  margin: '25px auto',
};

const leftStyle = {
  flex: 1,
};

const rightStyle = {
  flex: 1,
  textAlign: 'right',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginLeft: '15px',
};

const moreInfoContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '30px',
  width: '80%',
  margin: '25px auto',
};

const moreInfoColumn = {
  flex: 1,
  padding: '0 20px',
  textAlign: 'left',
};

const headingStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const infoListStyle = {
  listStyleType: 'none',
  paddingLeft: '0',
  paddingTop:'10px'
};

const socialMediaLinks = {
  display: 'flex',
  flexDirection: 'column',
};

const socialLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  marginRight: '8px',
};

const contactText = {
  marginBottom: '10px',
};

const newsletterColumn = {
  flex: 1,
  padding: '0 20px',
  textAlign: 'left',
};

const newsletterText = {
  marginBottom: '10px',
  fontSize: '14px',
};

const newsletterForm = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
};

const newsletterInput = {
  padding: '8px',
  fontSize: '14px',
  width: '70%',
  border: 'none',
  borderRadius: '4px',
};

const newsletterButton = {
  padding: '8px 16px',
  fontSize: '14px',
  backgroundColor: '#5cb85c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Footer;
