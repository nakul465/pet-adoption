import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    // Fetch pending applications and contact messages from the backend
    const fetchData = async () => {
      try {
        const appResponse = await fetch("http://localhost:5001/api/adoption");
        const appData = await appResponse.json();
        setApplications(appData);

        const contactResponse = await fetch("http://localhost:5001/api/contact");
        const contactData = await contactResponse.json();
        setContactMessages(contactData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Hello Admin</h2>

      <div className="admin-sections">
        <section className="admin-section">
          <h3>Pending Adoption Applications</h3>
          <ul>
            {applications.map((app, index) => (
              <li key={index}>
                <strong>Pet:</strong> {app.petName} <br />
                <strong>Status:</strong> {app.status} <br />
                <strong>Remarks:</strong> {app.remarks || "N/A"} <br />
                <Link to={`/adoption-application/${app.id}`}>View Application</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-section">
          <h3>Contact Us Messages</h3>
          <ul>
            {contactMessages.map((msg, index) => (
              <li key={index}>
                <strong>Name:</strong> {msg.name} <br />
                <strong>Email:</strong> {msg.email} <br />
                <strong>Message:</strong> {msg.message} <br />
                <Link to={`/contact-message/${msg.id}`}>View Message</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
