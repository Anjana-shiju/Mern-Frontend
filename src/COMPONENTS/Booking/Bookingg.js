import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Book() {
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

  const [packages, setPackages] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    packageId: selectedPackage?._id || "",
    people: "",
    travelDate: "",
  });

  useEffect(() => {
    axios.get("https://merstack-backend.onrender.com/api/packages")
      .then(res => setPackages(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://merstack-backend.onrender.com/api/bookings", formData);
      alert("Booking placed successfully  Waiting for confirmation");
    } catch (err) {
      alert("Booking failed ");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-5 mx-auto">
        <div className="card shadow-sm p-4">
          <h5 className="text-center mb-3">Travel Booking</h5>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-2"
              name="customerName"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
            />

            <select
              className="form-select mb-2"
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              required
            >
              <option value="">Select Package</option>
              {packages.map(pkg => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.title}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="form-control mb-2"
              name="people"
              placeholder="People"
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className="form-control mb-3"
              name="travelDate"
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100">
              Book
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
