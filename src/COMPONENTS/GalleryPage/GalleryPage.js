import React, { useEffect, useState } from "react";
import axios from "axios";
import "../GalleryPage/Gllery.css";

export default function GalleryPage() {

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("https://merstack-backend.onrender.com/api/gallery");
      setGallery(res.data);
    } catch (err) {
      console.log("Gallery fetch error", err);
    }
  };

  return (
    <div>
      <section class="tour-header bg text-center py-5">
  <div class="container">
    <p class="text-uppercase text-primary small mb-2">You Searched</p>
    <h1 class="fw-bold display-5">Our Gallery...!</h1>
    <p class="text-secondary fs-5 mt-3">
      Found <span class="fw-bold">83 Tours</span>, Use the filters below to refine the search.
    </p>
  </div>
</section>

      <section className="gallery container py-5">
        <div className="row g-4">

          {gallery.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={item._id}>
              <div className="gallery-item">
                <img
                  src={`https://merstack-backend.onrender.com/${item.image}`}
                  alt={item.title}
                  className="img-fluid"
                />
                <div className="overlay">{item.title}</div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
