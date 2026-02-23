import React, { useState } from "react";
import axios from "axios";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://merstack-backend.onrender.com/contact", form);
      alert("Message sent successfully ");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message ");
      console.error(err);
    }
  };

  return (
    <div>

      {/* Header Section */}
      <section className="tour-header bg text-center py-5">
        <div className="container">
          <p className="text-uppercase text-primary small mb-2">You Searched</p>
          <h1 className="fw-bold display-5">Get in Touch...!</h1>
          <p className="text-secondary fs-5 mt-3">
            Found <span className="fw-bold">83 Tours</span>, Use the filters below to refine the search.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section container py-5">
        <div className="row g-5">

          {/* Left Contact Info */}
          <div className="col-lg-5 col-md-6">
            <h4 className="fw-bold mb-4" style={{ color: "rebeccapurple" }}>
              Contact Information
            </h4>

            <p><i className="fas fa-map-marker-alt me-2 text-warning"></i> Kerala, India</p>
            <p><i className="fas fa-phone me-2 text-warning"></i> +91 98765 43210</p>
            <p><i className="fas fa-envelope me-2 text-warning"></i> info@travelnow.com</p>

            <div className="social-links mt-4">
              <a href="#" className="text-dark me-3 fs-5"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-dark me-3 fs-5"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-dark me-3 fs-5"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Right Form */}
          <div className="col-lg-7 col-md-6">
            <form className="contact-form p-4 shadow rounded" onSubmit={sendMessage}>
              <div className="row g-3">

                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-warning text-white px-5 fw-bold rounded-pill"
                  >
                    Send Message
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Google Map */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.569842965972!2d75.78040287480662!3d10.607770363951336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba659cb0a4a3cc3%3A0x7e6a48a7df676021!2sKerala%2C%20India!5e0!3m2!1sen!2sin!4v1697239181241!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          title="map"
        ></iframe>
      </section>

    </div>
  );
}