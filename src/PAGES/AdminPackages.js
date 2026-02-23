


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../COMPONENTS/Admindashboard/Sidebar";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    price: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  // ---------------- FETCH PACKAGES ----------------
  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://merstack-backend.onrender.com/api/packages");
      setPackages(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // ---------------- HANDLE EDIT ----------------
  const handleEdit = (pkg) => {
    setEditMode(true);
    setCurrentId(pkg._id);
    setFormData({
      title: pkg.title,
      destination: pkg.destination,
      price: pkg.price,
      description: pkg.description,
    });
    setShowModal(true);
  };

  // ---------------- HANDLE DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      await axios.delete(
        `https://merstack-backend.onrender.com/api/packages/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPackages();
    } catch (err) {
      console.error("Delete Error:", err);
      alert(" Delete failed");
    }
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("destination", formData.destination);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (selectedFile) data.append("image", selectedFile);

    try {
      if (editMode) {
        await axios.put(
          `https://merstack-backend.onrender.com/api/packages/${currentId}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "https://merstack-backend.onrender.com/api/packages",
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setShowModal(false);
      setEditMode(false);
      setCurrentId(null);
      setSelectedFile(null);
      setFormData({
        title: "",
        destination: "",
        price: "",
        description: "",
      });

      fetchPackages();
    } catch (err) {
      console.error("Submit Error:", err);
      alert(" Unauthorized  Login again");
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      <div className="row g-0">
        <Sidebar />

        <div className="col-md-10 offset-md-2 p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Tour Packages</h2>
            <button
              className="btn btn-dark rounded-pill px-4"
              onClick={() => {
                setEditMode(false);
                setFormData({
                  title: "",
                  destination: "",
                  price: "",
                  description: "",
                });
                setShowModal(true);
              }}
            >
              + Add Package
            </button>
          </div>

          <div className="card shadow-sm border-0">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Destination</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg._id}>
                    <td>
                      <img
                        src={`https://merstack-backend.onrender.com/${pkg.image}`}
                        alt=""
                        width="60"
                        height="60"
                        style={{ objectFit: "cover" }}
                        className="rounded"
                      />
                    </td>
                    <td>{pkg.title}</td>
                    <td>{pkg.destination}</td>
                    <td>₹{pkg.price}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(pkg)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(pkg._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Packages Added Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {showModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h5 className="mb-3">
                {editMode ? "Edit Package" : "Add Package"}
              </h5>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <input
                  className="form-control mb-2"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  required={!editMode}
                />

                <button className="btn btn-dark w-100 mb-2" disabled={loading}>
                  {loading ? "Saving..." : editMode ? "Update" : "Save"}
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

export default AdminPackages;

