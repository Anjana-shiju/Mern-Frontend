// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../COMPONENTS/Admindashboard/Sidebar';

// const AdminDashboard = () => {
//     const [packages, setPackages] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [currentId, setCurrentId] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         destination: '',
//         price: '',
//         description: ''
//     });

//     // 🔐 GET TOKEN
//     const token = localStorage.getItem("adminToken");

//     // ---------------- FETCH PACKAGES ----------------
//     const fetchPackages = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/packages');
//             setPackages(res.data);
//         } catch (err) {
//             console.log("Fetch error:", err);
//         }
//     };

//     useEffect(() => {
//         fetchPackages();
//     }, []);

//     // ---------------- EDIT ----------------
//     const handleEdit = (pkg) => {
//         setEditMode(true);
//         setCurrentId(pkg._id);
//         setFormData({
//             title: pkg.title,
//             destination: pkg.destination,
//             price: pkg.price,
//             description: pkg.description
//         });
//         setShowModal(true);
//     };

//     // ---------------- ADD / UPDATE ----------------
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append('title', formData.title);
//         data.append('destination', formData.destination);
//         data.append('price', formData.price);
//         data.append('description', formData.description);
//         if (selectedFile) data.append('image', selectedFile);

//         try {
//             if (editMode) {
//                 await axios.put(
//                     `http://localhost:5000/api/packages/${currentId}`,
//                     data,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//             } else {
//                 await axios.post(
//                     'http://localhost:5000/api/packages',
//                     data,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//             }

//             setShowModal(false);
//             setEditMode(false);
//             fetchPackages();
//             setFormData({
//                 title: '',
//                 destination: '',
//                 price: '',
//                 description: ''
//             });
//             setSelectedFile(null);

//         } catch (err) {
//             console.log(err.response?.data);
//             alert("Action Failed!");
//         }
//     };

//     // ---------------- DELETE ----------------
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure?")) {
//             try {
//                 await axios.delete(
//                     `http://localhost:5000/api/packages/${id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//                 fetchPackages();
//             } catch (err) {
//                 console.log(err.response?.data);
//                 alert("Delete Failed!");
//             }
//         }
//     };

//     return (
//         <div className="container-fluid bg-light min-vh-100 p-0">
//             <div className="row g-0">
//                 <Sidebar />

//                 <div className="col-md-10 offset-md-2 p-5">
//                     <div className="d-flex justify-content-between align-items-center mb-5">
//                         <h2 className="fw-bold m-0">Dashboard Overview</h2>
//                         <button
//                             onClick={() => {
//                                 setEditMode(false);
//                                 setFormData({ title:'', destination:'', price:'', description:'' });
//                                 setShowModal(true);
//                             }}
//                             className="btn btn-dark px-4 py-2 rounded-pill fw-bold"
//                         >
//                             Add New Package
//                         </button>
//                     </div>

//                     <div className="card border-0 shadow-sm rounded-4 p-4">
//                         <h5 className="fw-bold mb-4">Tour Packages List</h5>

//                         <div className="table-responsive">
//                             <table className="table align-middle">
//                                 <thead>
//                                     <tr>
//                                         <th>IMAGE</th>
//                                         <th>TITLE</th>
//                                         <th>DESTINATION</th>
//                                         <th>PRICE</th>
//                                         <th>ACTIONS</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {packages.map((pkg) => (
//                                         <tr key={pkg._id}>
//                                             <td>
//                                                 <img
//                                                     src={`http://localhost:5000${pkg.image}`}
//                                                     alt="pkg"
//                                                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                                                 />
//                                             </td>
//                                             <td>{pkg.title}</td>
//                                             <td>{pkg.destination}</td>
//                                             <td>₹{pkg.price}</td>
//                                             <td>
//                                                 <button
//                                                     onClick={() => handleEdit(pkg)}
//                                                     className="btn btn-warning btn-sm me-2"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(pkg._id)}
//                                                     className="btn btn-danger btn-sm"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* MODAL */}
//             {showModal && (
//                 <div className="modal show d-block">
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content p-4">
//                             <h5>{editMode ? "Edit Package" : "Add Package"}</h5>
//                             <form onSubmit={handleSubmit}>
//                                 <input
//                                     type="text"
//                                     placeholder="Title"
//                                     className="form-control mb-2"
//                                     value={formData.title}
//                                     onChange={e => setFormData({ ...formData, title: e.target.value })}
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Destination"
//                                     className="form-control mb-2"
//                                     value={formData.destination}
//                                     onChange={e => setFormData({ ...formData, destination: e.target.value })}
//                                     required
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="Price"
//                                     className="form-control mb-2"
//                                     value={formData.price}
//                                     onChange={e => setFormData({ ...formData, price: e.target.value })}
//                                     required
//                                 />
//                                 <textarea
//                                     placeholder="Description"
//                                     className="form-control mb-2"
//                                     value={formData.description}
//                                     onChange={e => setFormData({ ...formData, description: e.target.value })}
//                                 />
//                                 <input
//                                     type="file"
//                                     className="form-control mb-3"
//                                     onChange={e => setSelectedFile(e.target.files[0])}
//                                 />

//                                 <button type="submit" className="btn btn-primary w-100">
//                                     {editMode ? "Update" : "Save"}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;




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
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        price: '',
        description: ''
    });

    // 🔐 GET TOKEN
    const token = localStorage.getItem("adminToken");

    // 🚨 IF NO TOKEN → GO TO LOGIN (REFRESH PROTECTION)
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    // ---------------- FETCH PACKAGES ----------------
    const fetchPackages = async () => {
        try {
            const res = await axios.get('https://merstack-backend.onrender.com/api/packages');
            setPackages(res.data);
        } catch (err) {
            console.log("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    // ---------------- LOGOUT ----------------
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    // ---------------- EDIT ----------------
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

    // ---------------- ADD / UPDATE ----------------
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
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                await axios.post(
                    'https://merstack-backend.onrender.com/api/packages',
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            setShowModal(false);
            setEditMode(false);
            fetchPackages();
            setFormData({
                title: '',
                destination: '',
                price: '',
                description: ''
            });
            setSelectedFile(null);

        } catch (err) {
            console.log(err.response?.data);
            alert("Action Failed!");
        }
    };

   
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(
                    `https://merstack-backend.onrender.com/api/packages/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                fetchPackages();
            } catch (err) {
                console.log(err.response?.data);
                alert("Delete Failed!");
            }
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">
                <Sidebar />

                <div className="col-md-10 offset-md-2 p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h2 className="fw-bold m-0">Dashboard Overview</h2>

                       
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger px-4 py-2 rounded-pill fw-bold"
                        >
                            Logout
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setEditMode(false);
                            setFormData({ title:'', destination:'', price:'', description:'' });
                            setShowModal(true);
                        }}
                        className="btn btn-dark px-4 py-2 rounded-pill fw-bold mb-4"
                    >
                        Add New Package
                    </button>

                    <div className="card border-0 shadow-sm rounded-4 p-4">
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
                                                    src={`https://merstack-backend.onrender.com/${pkg.image}`}
                                                    alt="pkg"
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>{pkg.title}</td>
                                            <td>{pkg.destination}</td>
                                            <td>₹{pkg.price}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleEdit(pkg)}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(pkg._id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4">
                            <h5>{editMode ? "Edit Package" : "Add Package"}</h5>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="form-control mb-2"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    className="form-control mb-2"
                                    value={formData.destination}
                                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="form-control mb-2"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    className="form-control mb-2"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                                <input
                                    type="file"
                                    className="form-control mb-3"
                                    onChange={e => setSelectedFile(e.target.files[0])}
                                />

                                <button type="submit" className="btn btn-primary w-100">
                                    {editMode ? "Update" : "Save"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;