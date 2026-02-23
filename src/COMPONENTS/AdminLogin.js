import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://merstack-backend.onrender.com/api/admin/login', credentials);
            localStorage.setItem('adminToken', response.data.token);
            alert("Login Success!");
            navigate('/admin/dashboard'); 
        } catch (error) {
            alert("Login Failed: " + (error.response?.data || "Server Error"));
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Admin Login</h2>
                    <p className="text-muted">Travel Agency Management</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Username</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Enter username" 
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Enter password" 
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm w-100 shadow-sm transition-all">
                        Login Now
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small className="text-muted">Forgot password?</small>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;