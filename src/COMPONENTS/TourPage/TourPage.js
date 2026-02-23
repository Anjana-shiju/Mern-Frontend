


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TourPage.css";

export default function TourPage() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://merstack-backend.onrender.com/api/packages");
      setPackages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SEARCH FUNCTION
  const handleSearch = async () => {
    try {
      if (search.trim() === "") {
        fetchPackages(); // if empty, show all
        return;
      }

     const res = await axios.get(
  `https://merstack-backend.onrender.com/api/packages/search?destination=${search}`
);
      setPackages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBook = (pkg) => {
    navigate("/book", { state: { selectedPackage: pkg } });
  };

  return (
    <div>
      <section className="tour-header bg text-center py-5">
        <div className="container">

          
          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-25 rounded-start-pill"
              placeholder="Search by place..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn btn-warning rounded-end-pill px-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <h1 className="fw-bold display-5">Our Packages...!</h1>

          <p className="text-secondary fs-5 mt-3">
            Showing <span className="fw-bold">{packages.length}</span> Tours
          </p>

        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">

          {packages.length === 0 && (
            <p className="text-center">No Packages Found</p>
          )}

          {packages.map((pkg) => (
            <div className="col-md-4" key={pkg._id}>
              <div className="card tour-card h-100">

                <img
                  src={`https://merstack-backend.onrender.com/${pkg.image}`}
                  className="card-img-top"
                  alt={pkg.title}
                />

                <div className="card-body">
                  <h5 className="card-title">{pkg.title}</h5>
                  <p>{pkg.description}</p>
                  <p className="fw-bold text-primary">₹ {pkg.price}</p>

                  <button
                    onClick={() => handleBook(pkg)}
                    className="btn btn-tour w-100"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
