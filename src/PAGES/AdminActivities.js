import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../COMPONENTS/Admindashboard/Sidebar';

const AdminActivities = () => {

    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        duration: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const token = localStorage.getItem("adminToken");

   
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
                    data,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            } else {
                await axios.post(
                    'https://merstack-backend.onrender.com/api/activities',
                    data,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

            setShowModal(false);
            setEditMode(false);
            setSelectedFile(null);
            setFormData({ name: '', location: '', price: '', duration: '' });
            fetchActivities();

        } catch (err) {
            console.log(err.response?.data);
            alert("Action Failed!");
        }
    };

   
    const handleDelete = async (id) => {
        if (window.confirm("Delete this activity?")) {
            await axios.delete(
                `https://merstack-backend.onrender.com/api/activities/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchActivities();
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">
                <Sidebar />
                <div className="col-md-10 offset-md-2 p-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold">Manage Activities</h2>
                        <button
                            onClick={() => {
                                setEditMode(false);
                                setFormData({ name:'', location:'', price:'', duration:'' });
                                setShowModal(true);
                            }}
                            className="btn btn-primary rounded-pill px-4"
                        >
                            Add Activity
                        </button>
                    </div>

                    <div className="row">
                        {activities.map(act => (
                            <div className="col-md-4 mb-4" key={act._id}>
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                                 
                                    <img
                                        src={`https://merstack-backend.onrender.com/${act.image}`}
                                        alt={act.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />

                                    <div className="card-body">
                                        <h5 className="fw-bold mb-1">{act.name}</h5>
                                        <p className="text-muted small mb-2">
                                            <i className="bi bi-geo-alt me-1"></i>{act.location}
                                        </p>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-bold text-success">₹{act.price}</span>
                                            <div>
                                                <button
                                                    onClick={() => handleEdit(act)}
                                                    className="btn btn-sm btn-warning me-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(act._id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

           
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
                                {editMode ? "Edit Activity" : "New Activity"}
                            </h4>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Activity Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />

                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Duration (eg: 3 hrs)"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                />

                                <input
                                    type="file"
                                    className="form-control mb-3"
                                    onChange={e => setSelectedFile(e.target.files[0])}
                                />

                                <button type="submit" className="btn btn-primary w-100 mb-2">
                                    {editMode ? "Update Activity" : "Save Activity"}
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

export default AdminActivities;
