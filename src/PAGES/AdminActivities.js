import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from '../COMPONENTS/Admindashboard/Sidebar';

const AdminActivities = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', location: '', price: '', duration: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (!token) navigate("/");
    }, [token, navigate]);

    const fetchActivities = async () => {
        const res = await axios.get('https://merstack-backend.onrender.com/api/activities');
        setActivities(res.data);
    };

    useEffect(() => { fetchActivities(); }, []);

    const handleEdit = (activity) => {
        setEditMode(true);
        setCurrentId(activity._id);
        setFormData({
            name: activity.name,
            location: activity.location,
            price: activity.price,
            duration: activity.duration
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('location', formData.location);
        data.append('price', formData.price);
        data.append('duration', formData.duration);
        if (selectedFile) data.append('image', selectedFile);

        try {
            if (editMode) {
                await axios.put(
                    `https://merstack-backend.onrender.com/api/activities/${currentId}`,
                    data, { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    'https://merstack-backend.onrender.com/api/activities',
                    data, { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            setShowModal(false);
            setEditMode(false);
            setSelectedFile(null);
            setFormData({ name: '', location: '', price: '', duration: '' });
            fetchActivities();
        } catch (err) {
            alert("Action Failed!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this activity?")) {
            await axios.delete(
                `https://merstack-backend.onrender.com/api/activities/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchActivities();
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
                    .act-main { margin-left: 240px !important; padding: 40px !important; }
                    .hamburger-btn { display: none !important; }
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
            <div className="act-main" style={{ width: '100%', padding: '20px', marginLeft: 0 }}>

                {/* ── TOP BAR ── */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '12px',
                     paddingTop: '60px'
                }}>
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
                        Manage Activities
                    </h2>

                    <button
                        onClick={() => {
                            setEditMode(false);
                            setFormData({ name: '', location: '', price: '', duration: '' });
                            setShowModal(true);
                        }}
                        className="btn btn-primary rounded-pill fw-bold"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        + Add Activity
                    </button>
                </div>

                {/* ── ACTIVITY CARDS GRID ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {activities.map(act => (
                        <div key={act._id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <img
                                src={`https://merstack-backend.onrender.com${act.image}`}
                                alt={act.name}
                                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                            />
                            <div className="card-body">
                                <h5 className="fw-bold mb-1">{act.name}</h5>
                                <p className="text-muted small mb-1">📍 {act.location}</p>
                                <p className="text-muted small mb-2">⏱ {act.duration}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="fw-bold text-success">₹{act.price}</span>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button
                                            onClick={() => handleEdit(act)}
                                            className="btn btn-sm btn-warning"
                                        >Edit</button>
                                        <button
                                            onClick={() => handleDelete(act._id)}
                                            className="btn btn-sm btn-danger"
                                        >Delete</button>
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
                                {editMode ? "✏️ Edit Activity" : "➕ New Activity"}
                            </h5>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}
                            >×</button>
                        </div>

                        <input
                            type="text" placeholder="Activity Name"
                            className="form-control mb-2"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Location"
                            className="form-control mb-2"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Price"
                            className="form-control mb-2"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Duration (eg: 3 hrs)"
                            className="form-control mb-2"
                            value={formData.duration}
                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
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
                            {editMode ? "Update Activity" : "Save Activity"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminActivities;