import React from "react";
import logo from "../images/logo.jpeg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="PawFinds Logo" className="footer-logo-img" />
          <span className="footer-brand">PawFinds</span>
        </div>
        <p>You can reach me at PawFinds@gmail.com</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/">LinkedIn</a> | <a href="https://github.com/">GitHub</a> |{" "}
          <a href="https://www.instagram.com/">Instagram</a> | <a href="https://web.whatsapp.com/">WhatsApp</a>
        </div>
        <p>© 2025 PawFinds</p>
      </div>
    </footer>
  );
};

export default Footer;
