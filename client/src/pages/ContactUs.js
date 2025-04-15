// src/pages/ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css';
import contactImage from '../images/istockphoto-478751930-612x612.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // To show success or error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("Server error. Try again later.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-left">
        <img src={contactImage} alt="Contact Us" className="contact-image" />
      </div>
      <div className="contact-right">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-box">
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            
            <label>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
            
            <button type="submit">Send Message</button>
          </form>

          {/* Display submission status message */}
          {status && <p className="status-message">{status}</p>}

          <div className="contact-info">
            <h2>Contact</h2>
            <p>Email: PawFinds@gmail.com</p>
            <h2>Based In</h2>
            <p>India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
