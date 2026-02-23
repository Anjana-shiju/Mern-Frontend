import React from 'react'
import tour1 from '../PIMAGES/pimage1.jpg';
import tour2 from '../PIMAGES/p1.jpg';
import tour3 from '../PIMAGES/p2.jpg';
import tour4 from '../PIMAGES/p3.jpg';
import './Tour.css';

export default function Tour() {
  return (
    <div>
    
    


<section id="tours" className="py-5 bg-light">
  <div className="container">
    <div className="text-center mb-4">
      <h2 className="fw-bold">Most Popular Tours</h2>
      <p className="text-muted">Handpicked tours for every season — family friendly, adventure, and more.</p>
    </div>

    <div className="row g-4">
    
      <div className="col-lg-4 col-md-6">
        <article className="card tour-card h-100 shadow-sm">
          <img src={tour2} className="card-img-top tour-img" alt=""/>
          <div className="card-body">
            <small className="text-muted d-block mb-2">FROM SKAFTAFELL</small>
            <h5 className="card-title">Blue Ice Experience</h5>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
              <div className="text-center">
                <i className="bi bi-calendar3 fs-4"></i>
                <div className="small text-muted">AVAILABLE</div>
                <strong>ALL YEAR</strong>
              </div>
              <div className="text-center">
                <i className="bi bi-clock fs-4"></i>
                <div className="small text-muted">DURATION</div>
                <strong>3–10 DAYS</strong>
              </div>
              <div className="text-center">
                <i className="bi bi-tag fs-4"></i>
                <div className="small text-muted">FROM</div>
                <strong>$166.75</strong>
              </div>
            </div>
            <a href="#" className="btn btn-outline-primary w-100 mt-3">Select Dates</a>
          </div>
        </article>
      </div>

      
      <div className="col-lg-4 col-md-6">
        <article className="card tour-card h-100 shadow-sm">
          <img src={tour3} className="card-img-top tour-img" alt=""/>
          <div className="card-body">
            <small className="text-muted d-block mb-2">FROM SKAGEN</small>
            <h5 className="card-title">Kayaking by Glacier</h5>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
              <div className="text-center">
                <i className="bi bi-calendar3 fs-4"></i>
                <div className="small text-muted">AVAILABLE</div>
                <strong>ALL YEAR</strong>
              </div>
              <div className="text-center">
                <i className="bi bi-clock fs-4"></i>
                <div className="small text-muted">DURATION</div>
                <strong>3–10 DAYS</strong>
              </div>
              <div className="text-center">
                <i className="bi bi-tag fs-4"></i>
                <div className="small text-muted">FROM</div>
                <strong>$166.75</strong>
              </div>
            </div>
            <a href="#" className="btn btn-outline-primary w-100 mt-3">Select Dates</a>
          </div>
        </article>
      </div>

      
      <div className="col-lg-4 col-md-6">
        <article className="card tour-card h-100 shadow-sm">
          <img src={tour4} className="card-img-top tour-img" alt=""/>
          <div className="card-body">
            <small className="text-muted d-block mb-2">FROM SKAGEN</small>
            <h5 className="card-title">Glacier Discovery</h5>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
              <div className="text-center">
                <i className="bi bi-calendar3 fs-4"></i>
                <div className="small text-muted">AVAILABLE</div>
                <strong>ALL YEAR</strong>
              </div>
              <div className="text-center">
                <i className="bi bi-clock fs-4"></i>
                <div className="small text-muted">DURATION</div>
                <strong>3–10 DAYS</strong>
              </div>
              <div className="text-center">
                <i className="bi bi-tag fs-4"></i>
                <div className="small text-muted">FROM</div>
                <strong>$166.75</strong>
              </div>
            </div>
            <a href="#" className="btn btn-outline-primary w-100 mt-3">Select Dates</a>
          </div>
        </article>
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
