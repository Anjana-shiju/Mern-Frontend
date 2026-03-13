import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../COMPONENTS/Admindashboard/Sidebar";

const API = "https://merstack-backend.onrender.com/api/bookings";

const AdminBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (!token) navigate("/");
    }, [token, navigate]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
            setBookings(res.data);
        } catch (err) {
            alert("Unauthorized / Login expired");
        }
    };

    useEffect(() => { fetchBookings(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${API}/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
            fetchBookings();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are u sure?")) return;
        try {
            await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchBookings();
        } catch (err) { console.error(err); }
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
                    .bk-main { margin-left: 240px !important; padding: 40px !important; }
                    .hamburger-btn { display: none !important; }
                    .bk-table { display: block !important; }
                    .bk-cards { display: none !important; }
                }
                @media (max-width: 767px) {
                    .bk-table { display: none !important; }
                    .bk-cards { display: block !important; }
                }
            `}</style>

            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} style={{
                    position: 'fixed', inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040
                }} />
            )}

            <div className="sidebar-panel"><Sidebar /></div>

            <div className="bk-main" style={{ width: '100%', padding: '20px', marginLeft: 0 }}>

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
                    <h4 style={{ fontWeight: 700, margin: 0, fontSize: 'clamp(1.1rem, 4vw, 1.6rem)' }}>
                        Manage Bookings
                    </h4>
                    <div style={{ width: 40 }} />
                </div>

                {/* ── DESKTOP TABLE ── */}
                <div className="bk-table card border-0 shadow-sm rounded-4 p-4">
                    <div className="table-responsive">
                        <table className="table table-sm align-middle">
                            <thead className="text-muted small border-bottom">
                                <tr>
                                    <th>CUSTOMER</th>
                                    <th>PACKAGE</th>
                                    <th>DATE</th>
                                    <th>PEOPLE</th>
                                    <th>STATUS</th>
                                    <th className="text-end">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((book) => (
                                    <tr key={book._id}>
                                        <td>
                                            <strong>{book.customerName}</strong><br />
                                            <small>{book.phone}</small>
                                        </td>
                                        <td>{book.packageId?.title || "N/A"}</td>
                                        <td>{new Date(book.travelDate).toLocaleDateString()}</td>
                                        <td>{book.people}</td>
                                        <td>
                                            <span className={`badge rounded-pill ${book.status === "Confirmed" ? "bg-success" : book.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            {book.status === "Pending" && (
                                                <>
                                                    <button onClick={() => updateStatus(book._id, "Confirmed")} className="btn btn-sm btn-success me-2">Confirm</button>
                                                    <button onClick={() => updateStatus(book._id, "Rejected")} className="btn btn-sm btn-warning me-2">Reject</button>
                                                </>
                                            )}
                                            <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr><td colSpan="6" className="text-center text-muted py-4">No bookings found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── MOBILE CARDS ── */}
                <div className="bk-cards">
                    {bookings.length === 0 && (
                        <div className="text-center text-muted py-4">No bookings found</div>
                    )}
                    {bookings.map((book) => (
                        <div key={book._id} className="card border-0 shadow-sm rounded-4 mb-3 p-3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>{book.customerName}</div>
                                    <div style={{ color: '#666', fontSize: '0.85rem' }}>{book.phone}</div>
                                    <div style={{ fontSize: '0.85rem', marginTop: 4 }}>📦 {book.packageId?.title || "N/A"}</div>
                                    <div style={{ fontSize: '0.85rem' }}>📅 {new Date(book.travelDate).toLocaleDateString()}</div>
                                    <div style={{ fontSize: '0.85rem' }}>👥 {book.people} people</div>
                                </div>
                                <span className={`badge rounded-pill ${book.status === "Confirmed" ? "bg-success" : book.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                                    {book.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                                {book.status === "Pending" && (
                                    <>
                                        <button onClick={() => updateStatus(book._id, "Confirmed")} className="btn btn-sm btn-success">Confirm</button>
                                        <button onClick={() => updateStatus(book._id, "Rejected")} className="btn btn-sm btn-warning">Reject</button>
                                    </>
                                )}
                                <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;