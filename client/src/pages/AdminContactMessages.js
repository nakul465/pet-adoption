import React, { useEffect, useState } from "react";
import "./AdminContactMessages.css"; // We'll create this next

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/contact-messages") // Backend route
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching contact messages:", err));
  }, []);

  return (
    <div className="contact-messages-container">
      <h1 className="contact-messages-heading">Contact Us Messages</h1>
      <div className="contact-messages-grid">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message-card">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContactMessages;
