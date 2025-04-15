import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.jpeg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const loggedInStatus = storedRole !== null;
    setRole(storedRole);
    setIsLoggedIn(loggedInStatus);
  }, [localStorage.getItem("role")]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="PawFinds Logo" className="logo" />
        <h1 className="logo-text">PawFinds</h1>
      </div>

      {/* Centered Nav Links */}
      <div className="navbar">
        <NavLink to="/" className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"}>Home</NavLink>
        <NavLink to="/post-pet" className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"}>Services</NavLink>
        <NavLink to="/pets" className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"}>Pets</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"}>Contact Us</NavLink>
      </div>

      {/* Right-side Buttons */}
      <div className="navbar-buttons">
        {!isLoggedIn ? (
          <Link to="/login" className="login-button">Login</Link>
        ) : (
          <div className="profile-dropdown">
            <span className="profile-icon">Hello {role === "admin" ? "Admin" : "User"}</span>
            <div className="dropdown-content">
              {role === "admin" && (
                <>
                  <Link to="/pending-applications">Pending Applications</Link> {/* ✅ Updated here */}
                  <Link to="/admin-contact-us">Contact Us Messages</Link>
                </>
              )}
              {role === "user" && (
                <>
                  <Link to="/my-applications">My Adoption Applications</Link>
                  <Link to="/my-pets">My Pets</Link>
                </>
              )}
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
        )}
        <Link to="/post-pet" className="give-pet-button">Give a Pet</Link>
      </div>
    </nav>
  );
};

export default Navbar;
