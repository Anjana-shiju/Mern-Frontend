import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../COMPONENTS/Admindashboard/Sidebar';

const AdminGallery = () => {

    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const token = localStorage.getItem("adminToken");

    // ---------------- FETCH ----------------
    const fetchGallery = async () => {
        try {
            const res = await axios.get('https://merstack-backend.onrender.com/api/gallery');
            setImages(res.data);
        } catch (err) {
            console.error("Gallery fetch error:", err);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    // ---------------- OPEN EDIT ----------------
    const handleEdit = (img) => {
        setEditMode(true);
        setCurrentId(img._id);
        setTitle(img.title || '');
        setShowModal(true);
    };

    // ---------------- SUBMIT (ADD / UPDATE) ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        if (selectedFile) data.append('image', selectedFile);

        try {

            if (editMode) {
                await axios.put(
                    `https://merstack-backend.onrender.com/api/gallery/${currentId}`,
                    data,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            } else {
                if (!selectedFile) return alert("Please select an image!");
                await axios.post(
                    'https://merstack-backend.onrender.com/api/gallery',
                    data,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

            setShowModal(false);
            setEditMode(false);
            setTitle('');
            setSelectedFile(null);
            fetchGallery();

        } catch (err) {
            console.error("Action error:", err.response?.data);
            alert("Action Failed!");
        }
    };

    // ---------------- DELETE ----------------
    const handleDelete = async (id) => {
        if (window.confirm("Delete this image?")) {
            try {
                await axios.delete(
                    `https://merstack-backend.onrender.com/api/gallery/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                fetchGallery();
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">
                <Sidebar />

                <div className="col-md-10 offset-md-2 p-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold">Photo Gallery</h2>
                        <button
                            onClick={() => {
                                setEditMode(false);
                                setTitle('');
                                setShowModal(true);
                            }}
                            className="btn btn-warning rounded-pill px-4 fw-bold"
                        >
                            Add Image
                        </button>
                    </div>

                    {/* Gallery Grid */}
                    <div className="row">
                        {images.length > 0 ? (
                            images.map((img) => (
                                <div className="col-md-3 mb-4" key={img._id}>
                                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                                        
                                        <img
                                            src={`https://merstack-backend.onrender.com/${img.image}`}
                                            alt={img.title}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />

                                        <div className="p-2 d-flex justify-content-between align-items-center bg-white">
                                            <small className="text-truncate fw-semibold">
                                                {img.title || 'Untitled'}
                                            </small>

                                            <div>
                                                <button
                                                    onClick={() => handleEdit(img)}
                                                    className="btn btn-sm btn-warning me-2"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(img._id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5 text-muted w-100">
                                Gallery empty now !
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal show d-block" style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1050
                }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4 border-0 rounded-4">
                            <h4 className="fw-bold mb-3">
                                {editMode ? "Edit Image" : "Add Image"}
                            </h4>

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Image Title (Optional)"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <input
                                    type="file"
                                    className="form-control mb-3"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />

                                <button type="submit" className="btn btn-primary w-100 mb-2">
                                    {editMode ? "Update Image" : "Save Image"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-light w-100"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
