import React, { useState } from "react";
import axios from "axios";


import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../contact/firebase"; 

const Contact = () => {
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
      await axios.post("https://merstack-backend.onrender.com/api/contact", form);
      alert("Message sent successfully ");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message ");
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} value={form.name} required />
      <input type="email" name="email" placeholder="Your Email" onChange={handleChange} value={form.email} required />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} value={form.subject} required />
      <textarea name="message" placeholder="Your Message" onChange={handleChange} value={form.message} required />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default Contact;