import React from "react";
import "./Contact.css"; // Import CSS file
import Head from "../homepage/header";

const Contact = () => {
  return (
    <div className="contact-container">
        < Head/>
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Contact Details</h2>
          <p><strong>Email:</strong> support@datahubara.com</p>
          <p><strong>Phone:</strong> +91 7989254913</p>
          <p><strong>Address:</strong> 123 Tech Street, Silicon Valley, CA</p>

          {/* Social Media Links */}
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
