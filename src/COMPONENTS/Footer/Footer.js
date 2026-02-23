import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div>
      <footer
        className="text-white"
        style={{ backgroundColor: "#000", padding: "100px 0 80px" }}
      >
        <div className="container text-center text-md-start">
          <div className="row">

            {/* Logo + About */}
            <div className="col-md-3 mb-5">
              <h5 className="text-uppercase fw-bold mb-4">TravelNow</h5>
              <p style={{ fontSize: "15px" }}>
                Discover the world with us! We create unforgettable journeys filled
                with adventure, culture, and comfort.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-4">
                <a href="#" className="text-white fs-5"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white fs-5"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white fs-5"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white fs-5"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-md-3 mb-5">
              <h5 className="text-uppercase fw-bold mb-4">Quick Links</h5>
              <ul className="list-unstyled" style={{ fontSize: "15px" }}>
                <li><a href="#" className="footer-link text-white text-decoration-none">Home</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">About</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">Destinations</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">Tours</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-md-3 mb-5">
              <h5 className="text-uppercase fw-bold mb-4">Support</h5>
              <ul className="list-unstyled" style={{ fontSize: "15px" }}>
                <li><a href="#" className="footer-link text-white text-decoration-none">FAQs</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">Privacy Policy</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">Terms & Conditions</a></li>
                <li><a href="#" className="footer-link text-white text-decoration-none">Cancellation Policy</a></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div className="col-md-3 mb-5">
              <h5 className="text-uppercase fw-bold mb-4">Send</h5>
              <p style={{ fontSize: "15px" }}>
                Join our newsletter and get the latest travel updates and offers!
              </p>
              <form className="d-flex flex-column flex-sm-row mt-3">
                <input
                  type="email"
                  className="form-control me-sm-2 mb-3 mb-sm-0"
                  placeholder="Your email"
                  style={{ borderRadius: "30px", fontSize: "14px" }}
                />
                <button
                  className="btn btn-warning text-white fw-bold px-4"
                  style={{ borderRadius: "30px" }}
                >
                  Send
                </button>
              </form>
            </div>

          </div>

          <hr className="bg-light" />

          <div className="text-center mt-4">
            <p className="mb-0 small text-secondary">
              © 2025 TravelNow | Designed by{" "}
              <span className="text-white fw-semibold">Anjana</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
