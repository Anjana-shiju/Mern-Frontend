import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from '../COMPONENTS/Admindashboard/Sidebar';

const AdminGallery = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (!token) navigate("/");
    }, [token, navigate]);

    const fetchGallery = async () => {
        try {
            const res = await axios.get('https://merstack-backend.onrender.com/api/gallery');
            setImages(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchGallery(); }, []);

    const handleEdit = (img) => {
        setEditMode(true);
        setCurrentId(img._id);
        setTitle(img.title || '');
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        if (selectedFile) data.append('image', selectedFile);
        try {
            if (editMode) {
                await axios.put(`https://merstack-backend.onrender.com/api/gallery/${currentId}`, data, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                if (!selectedFile) return alert("Please select an image!");
                await axios.post('https://merstack-backend.onrender.com/api/gallery', data, { headers: { Authorization: `Bearer ${token}` } });
            }
            setShowModal(false); setEditMode(false);
            setTitle(''); setSelectedFile(null);
            fetchGallery();
        } catch (err) { alert("Action Failed!"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this image?")) {
            try {
                await axios.delete(`https://merstack-backend.onrender.com/api/gallery/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                fetchGallery();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <style>{`
                .sidebar-panel {
                    position: fixed; top: 0; left: 0;
                    height: 100vh; width: 240px;
                    z-index: 1050; transition: transform 0.3s ease;
                    background-color: #fff;
                    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
                }
                @media (max-width: 767px) {
                    .sidebar-panel { transform: ${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}; }
                }
                @media (min-width: 768px) {
                    .sidebar-panel { transform: translateX(0) !important; }
                    .gl-main { margin-left: 240px !important; padding: 40px !important; }
                    .hamburger-btn { display: none !important; }
                }
            `}</style>

            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} />
            )}

            <div className="sidebar-panel"><Sidebar /></div>

            <div className="gl-main" style={{ width: '100%', padding: '20px', marginLeft: 0 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px',padding:"60px" }}>
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
                    <h2 style={{ fontWeight: 700, margin: 0, fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>Photo Gallery</h2>
                    <button onClick={() => { setEditMode(false); setTitle(''); setShowModal(true); }}
                        className="btn btn-warning rounded-pill fw-bold" style={{ whiteSpace: 'nowrap' }}>
                        + Add Image
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {images.length > 0 ? images.map((img) => (
                        <div key={img._id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src={`https://merstack-backend.onrender.com${img.image}`} alt={img.title}
                                style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
                            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <small style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80px' }}>
                                    {img.title || 'Untitled'}
                                </small>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button onClick={() => handleEdit(img)} className="btn btn-sm btn-warning">Edit</button>
                                    <button onClick={() => handleDelete(img._id)} className="btn btn-sm btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-5 text-muted">Gallery empty now!</div>
                    )}
                </div>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '28px', width: '100%', maxWidth: '440px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h5 style={{ margin: 0, fontWeight: 700 }}>{editMode ? "✏️ Edit Image" : "➕ Add Image"}</h5>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
                        </div>
                        <input type="text" className="form-control mb-3" placeholder="Image Title (Optional)"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="file" className="form-control mb-3"
                            onChange={(e) => setSelectedFile(e.target.files[0])} />
                        <button onClick={handleSubmit} className="btn btn-primary w-100 rounded-pill fw-bold">
                            {editMode ? "Update Image" : "Save Image"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;