import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminRegister = () => {
    const [adminData, setAdminData] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://merstack-backend.onrender.com/api/admin/register', adminData);
            alert("Registration Successful!");
            navigate('/admin/login'); 
        } catch (error) {
            alert("Registration Failed: " + (error.response?.data || "Check your backend"));
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-success">Admin Signup</h2>
                    <p className="text-muted">Create a new admin account</p>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Pick a username" 
                            onChange={(e) => setAdminData({...adminData, username: e.target.value})} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="email@example.com" 
                            onChange={(e) => setAdminData({...adminData, email: e.target.value})} 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Create a strong password" 
                            onChange={(e) => setAdminData({...adminData, password: e.target.value})} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-sm w-100 shadow-sm mb-3">
                        Register Admin
                    </button>
                </form>
                <div className="text-center">
                    <p className="mb-0 text-muted">Already have an account?</p>
                    <Link to="/admin/login" className="text-success fw-bold text-decoration-none">Login Here</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;