import React from 'react'
import Act1 from '../PIMAGES/ad.jfif';
import Act2 from '../PIMAGES/ad2.jfif';
import Act3 from '../PIMAGES/ad3.jfif';
import Act4 from '../PIMAGES/pic2.jpg';
import './Activity.css';

export default function Activity() {
  return (
    <div>
    
    <section id="activities" className="py-5">
  <div className="container">
    <div className="text-center mb-4">
      <h2 className="fw-bold">Adventure Activities</h2>
      <p className="text-muted">Camping, Ice trekking, Boat tours and more — choose your pace.</p>
    </div>

    <div className="row g-3">
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="activity-card rounded shadow-sm overflow-hidden">
          <img src={Act1} className="img-fluid" alt=""/>
          <div className="p-3">
            <h6 className="mb-1">Camping in Valley</h6>
            <small className="text-muted">Experience the calm</small>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="activity-card rounded shadow-sm overflow-hidden">
          <img src={Act2} className="img-fluid" alt=""/>
          <div className="p-3">
            <h6 className="mb-1">Underwater Tour</h6>
            <small className="text-muted">Explore marine life</small>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="activity-card rounded shadow-sm overflow-hidden">
          <img src={Act3} className="img-fluid" alt=""/>
          <div className="p-3">
            <h6 className="mb-1">Lake Views</h6>
            <small className="text-muted">Relaxing escapes</small>
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="activity-card rounded shadow-sm overflow-hidden">
          <img src={Act4} className="img-fluid" alt=""/>
          <div className="p-3">
            <h6 className="mb-1">Ice Trekking</h6>
            <small className="text-muted">Guided treks</small>
          </div>
        </div>
      </div>

    </div>

    <div className="text-center mt-4">
      <button className="btn btn-outline-secondary">Load More</button>
    </div>
  </div>
</section>

    
    
    
    
    </div>
  )
}
