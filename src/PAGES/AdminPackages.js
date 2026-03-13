import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../COMPONENTS/Admindashboard/Sidebar";

const AdminPackages = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({ title: "", destination: "", price: "", description: "" });
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (!token) navigate("/");
    }, [token, navigate]);

    const fetchPackages = async () => {
        try {
            const res = await axios.get("https://merstack-backend.onrender.com/api/packages");
            setPackages(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchPackages(); }, []);

    const handleEdit = (pkg) => {
        setEditMode(true); setCurrentId(pkg._id);
        setFormData({ title: pkg.title, destination: pkg.destination, price: pkg.price, description: pkg.description });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`https://merstack-backend.onrender.com/api/packages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchPackages();
        } catch (err) { alert("Delete failed"); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true);
        const data = new FormData();
        data.append("title", formData.title);
        data.append("destination", formData.destination);
        data.append("price", formData.price);
        data.append("description", formData.description);
        if (selectedFile) data.append("image", selectedFile);
        try {
            if (editMode) {
                await axios.put(`https://merstack-backend.onrender.com/api/packages/${currentId}`, data, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await axios.post("https://merstack-backend.onrender.com/api/packages", data, { headers: { Authorization: `Bearer ${token}` } });
            }
            setShowModal(false); setEditMode(false);
            setCurrentId(null); setSelectedFile(null);
            setFormData({ title: "", destination: "", price: "", description: "" });
            fetchPackages();
        } catch (err) { alert("Unauthorized — Login again"); }
        setLoading(false);
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
                    .pk-main { margin-left: 240px !important; padding: 40px !important; }
                    .hamburger-btn { display: none !important; }
                    .pk-table { display: block !important; }
                    .pk-cards { display: none !important; }
                }
                @media (max-width: 767px) {
                    .pk-table { display: none !important; }
                    .pk-cards { display: block !important; }
                }
            `}</style>

            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} />
            )}

            <div className="sidebar-panel"><Sidebar /></div>

            <div className="pk-main" style={{ width: '100%', padding: '20px', marginLeft: 0 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' ,paddingTop:"60px"}}>
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
                    <h2 style={{ fontWeight: 700, margin: 0, fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>Tour Packages</h2>
                    <button className="btn btn-dark rounded-pill fw-bold"
                        onClick={() => { setEditMode(false); setFormData({ title: "", destination: "", price: "", description: "" }); setShowModal(true); }}
                        style={{ whiteSpace: 'nowrap' }}>
                        + Add Package
                    </button>
                </div>

                {/* ── DESKTOP TABLE ── */}
                <div className="pk-table card shadow-sm border-0 rounded-4 p-4">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Image</th><th>Title</th><th>Destination</th><th>Price</th><th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map((pkg) => (
                                    <tr key={pkg._id}>
                                        <td><img src={`https://merstack-backend.onrender.com${pkg.image}`} alt="" width="60" height="60" style={{ objectFit: "cover", borderRadius: 8 }} /></td>
                                        <td>{pkg.title}</td>
                                        <td>{pkg.destination}</td>
                                        <td>₹{pkg.price}</td>
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(pkg)}>Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pkg._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {packages.length === 0 && <tr><td colSpan="5" className="text-center py-4">No Packages Added Yet</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── MOBILE CARDS ── */}
                <div className="pk-cards">
                    {packages.length === 0 && <div className="text-center text-muted py-4">No Packages Added Yet</div>}
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="card border-0 shadow-sm rounded-4 mb-3 p-3">
                            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <img src={`https://merstack-backend.onrender.com${pkg.image}`} alt="" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700 }}>{pkg.title}</div>
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

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '28px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h5 style={{ margin: 0, fontWeight: 700 }}>{editMode ? "✏️ Edit Package" : "➕ Add Package"}</h5>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
                        </div>
                        <input className="form-control mb-2" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <input className="form-control mb-2" placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} required />
                        <input type="number" className="form-control mb-2" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                        <textarea className="form-control mb-2" placeholder="Description" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        <input type="file" className="form-control mb-3" onChange={(e) => setSelectedFile(e.target.files[0])} required={!editMode} />
                        <button onClick={handleSubmit} className="btn btn-dark w-100 rounded-pill fw-bold" disabled={loading}>
                            {loading ? "Saving..." : editMode ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPackages;