import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ActivityPage/ActivityPage.css";

export default function ActivityPage() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axios.get("https://merstack-backend.onrender.com/api/activities");
      setActivities(res.data);
    } catch (err) {
      console.log("Activity fetch error", err);
    }
  };

  return (
    <div>

       <section class="tour-header bg text-center py-5">
  <div class="container">
    <p class="text-uppercase text-primary small mb-2">You Searched</p>
    <h1 class="fw-bold display-5">Our Activities...!</h1>
    <p class="text-secondary fs-5 mt-3">
      Found <span class="fw-bold">83 Tours</span>, Use the filters below to refine the search.
    </p>
  </div>
</section>

      <section className="tour-list">

        {activities.map((act) => (
          <div className="tour-item" key={act._id}>
            <img
              src={`https://merstack-backend.onrender.com/${act.image}`}
              alt={act.name}
            />
            <div className="tour-text">
              <p className="tour-location">{act.location}</p>
              <h3>{act.name}</h3>
              <p>Duration: {act.duration}</p>
              <p>₹ {act.price}</p>
            </div>
          </div>
        ))}

      </section>

    </div>
  );
}
