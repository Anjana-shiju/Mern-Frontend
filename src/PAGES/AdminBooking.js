


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../COMPONENTS/Admindashboard/Sidebar";

const API = "https://merstack-backend.onrender.com/api/bookings";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

 
  const token = localStorage.getItem("adminToken");

 
  const fetchBookings = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Unauthorized / Login expired");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

 
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are u sure?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

 
  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      <div className="row g-0">
        <Sidebar />

        <div className="col-md-10 offset-md-2 p-5">
          <h4 className="fw-bold mb-4">Manage Bookings</h4>

          <div className="card border-0 shadow-sm rounded-4 p-4">
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
                      <strong>{book.customerName}</strong>
                      <br />
                      <small>{book.phone}</small>
                    </td>

                    <td>{book.packageId?.title || "N/A"}</td>

                    <td>
                      {new Date(book.travelDate).toLocaleDateString()}
                    </td>

                    <td>{book.people}</td>

                    <td>
                      <span
                        className={`badge rounded-pill ${
                          book.status === "Confirmed"
                            ? "bg-success"
                            : book.status === "Rejected"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>

                    <td className="text-end">
                      {book.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(book._id, "Confirmed")
                            }
                            className="btn btn-sm btn-success me-2"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(book._id, "Rejected")
                            }
                            className="btn btn-sm btn-warning me-2"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
