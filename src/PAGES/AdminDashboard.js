import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from '../COMPONENTS/Admindashboard/Sidebar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '', destination: '', price: '', description: ''
    });

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (!token) navigate("/");
    }, [token, navigate]);

    const fetchPackages = async () => {
        try {
            const res = await axios.get('https://merstack-backend.onrender.com/api/packages');
            setPackages(res.data);
        } catch (err) {
            console.log("Fetch error:", err);
        }
    };

    useEffect(() => { fetchPackages(); }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    const handleEdit = (pkg) => {
        setEditMode(true);
        setCurrentId(pkg._id);
        setFormData({
            title: pkg.title,
            destination: pkg.destination,
            price: pkg.price,
            description: pkg.description
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('destination', formData.destination);
        data.append('price', formData.price);
        data.append('description', formData.description);
        if (selectedFile) data.append('image', selectedFile);

        try {
            if (editMode) {
                await axios.put(
                    `https://merstack-backend.onrender.com/api/packages/${currentId}`,
                    data, { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    'https://merstack-backend.onrender.com/api/packages',
                    data, { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            setShowModal(false);
            setEditMode(false);
            fetchPackages();
            setFormData({ title: '', destination: '', price: '', description: '' });
            setSelectedFile(null);
        } catch (err) {
            alert("Action Failed!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(
                    `https://merstack-backend.onrender.com/api/packages/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                fetchPackages();
            } catch (err) {
                alert("Delete Failed!");
            }
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

            <style>{`
                .sidebar-panel {
                    position: fixed;
                    top: 0; left: 0;
                    height: 100vh;
                    width: 240px;
                    z-index: 1050;
                    transition: transform 0.3s ease;
                    background-color: #fff;
                    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
                }
                @media (max-width: 767px) {
                    .sidebar-panel {
                        transform: ${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
                    }
                }
                @media (min-width: 768px) {
                    .sidebar-panel { transform: translateX(0) !important; }
                    .main-content { margin-left: 240px !important; padding: 40px !important; }
                    .hamburger-btn { display: none !important; }
                    .pkg-table { display: block !important; }
                    .pkg-cards { display: none !important; }
                }
                @media (max-width: 767px) {
                    .pkg-table { display: none !important; }
                    .pkg-cards { display: block !important; }
                }
            `}</style>

            {/* ── MOBILE OVERLAY ── */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1040
                    }}
                />
            )}

            {/* ── SIDEBAR ── */}
            <div className="sidebar-panel">
                <Sidebar />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div
                className="main-content"
                style={{ width: '100%', padding: '20px', marginLeft: 0 }}
            >
                {/* ── TOP BAR ── */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '12px'
                    ,padding:"60px"
                }}>
                    {/* ── HAMBURGER / CLOSE — mobile only ── */}
                    <button
    className="hamburger-btn btn btn-outline-secondary"
    onClick={() => setSidebarOpen(!sidebarOpen)}
    style={{ 
        fontSize: '1.2rem', 
        lineHeight: 1, 
        position: 'fixed',
        top: '16px',
        left: sidebarOpen ? '250px' : '16px',  // ← sidebar open ആകുമ്പോൾ right-ലേക്ക് move
        zIndex: 1060,
        transition: 'left 0.3s ease'  // ← smooth animation
    }}
>
    {sidebarOpen ? '✕' : '☰'}
</button>

                    <h2 style={{ fontWeight: 700, margin: 0, fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
                        Dashboard Overview
                    </h2>

                    <button
                        onClick={handleLogout}
                        className="btn btn-danger rounded-pill fw-bold"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        Logout
                    </button>
                </div>

                {/* ── ADD BUTTON ── */}
                <button
                    onClick={() => {
                        setEditMode(false);
                        setFormData({ title: '', destination: '', price: '', description: '' });
                        setShowModal(true);
                    }}
                    className="btn btn-dark rounded-pill fw-bold mb-4"
                    style={{ width: '100%', maxWidth: '220px' }}
                >
                    + Add New Package
                </button>

                {/* ── DESKTOP TABLE ── */}
                <div className="pkg-table card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-4">Tour Packages List</h5>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>TITLE</th>
                                    <th>DESTINATION</th>
                                    <th>PRICE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map((pkg) => (
                                    <tr key={pkg._id}>
                                        <td>
                                            <img
                                                src={`https://merstack-backend.onrender.com${pkg.image}`}
                                                alt="pkg"
                                                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                                            />
                                        </td>
                                        <td>{pkg.title}</td>
                                        <td>{pkg.destination}</td>
                                        <td>₹{pkg.price}</td>
                                        <td>
                                            <button onClick={() => handleEdit(pkg)} className="btn btn-warning btn-sm me-2">Edit</button>
                                            <button onClick={() => handleDelete(pkg._id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── MOBILE CARDS ── */}
                <div className="pkg-cards">
                    <h5 className="fw-bold mb-3">Tour Packages List</h5>
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="card border-0 shadow-sm rounded-4 mb-3 p-3">
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <img
                                    src={`https://merstack-backend.onrender.com${pkg.image}`}
                                    alt="pkg"
                                    style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{pkg.title}</div>
                                    <div style={{ color: '#666', fontSize: '0.875rem' }}>📍 {pkg.destination}</div>
                                    <div style={{ fontWeight: 600, color: '#198754', marginTop: 4 }}>₹{pkg.price}</div>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                        <button onClick={() => handleEdit(pkg)} className="btn btn-warning btn-sm">Edit</button>
                                        <button onClick={() => handleDelete(pkg._id)} className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MODAL ── */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        padding: '28px',
                        width: '100%',
                        maxWidth: '480px',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h5 style={{ margin: 0, fontWeight: 700 }}>
                                {editMode ? "✏️ Edit Package" : "➕ Add Package"}
                            </h5>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}
                            >×</button>
                        </div>

                        <input
                            type="text" placeholder="Title"
                            className="form-control mb-2"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Destination"
                            className="form-control mb-2"
                            value={formData.destination}
                            onChange={e => setFormData({ ...formData, destination: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Price"
                            className="form-control mb-2"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            className="form-control mb-2"
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <input
                            type="file"
                            className="form-control mb-3"
                            onChange={e => setSelectedFile(e.target.files[0])}
                        />
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary w-100 rounded-pill fw-bold"
                        >
                            {editMode ? "Update Package" : "Save Package"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;