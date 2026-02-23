import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../PIMAGES/logo.png";
import "./Navigation.css";

export default function Nav() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="WanderWay logo" width="80" height="60" className="me-2" />
          <span className="fw-bold text-dark">WanderWay</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/tour" className="nav-link" onClick={() => setIsOpen(false)}>Tours</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/activity" className="nav-link" onClick={() => setIsOpen(false)}>Activities</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/gallery" className="nav-link" onClick={() => setIsOpen(false)}>Gallery</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</NavLink>
            </li>

            {/* BOOK */}
            <li className="nav-item ms-lg-3">
              <NavLink
                to="/book"
                className="btn login-nav-btn"
                onClick={() => setIsOpen(false)}
              >
                Book
              </NavLink>
            </li>

           
            
          </ul>
        </div>
      </div>
    </nav>
  );
}