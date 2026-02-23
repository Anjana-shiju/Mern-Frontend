import React from 'react'
import pic1 from '../PIMAGES/pic3.jfif';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div>
        <div className="bg">
    <section class="tour-header bg text-center py-5">
  <div class="container">
    <p class="text-uppercase text-primary small mb-2">You Searched</p>
    <h1 class="fw-bold display-5">Get in Touch...!</h1>
    <p class="text-secondary fs-5 mt-3">
      Found <span class="fw-bold">83 Tours</span>, Use the filters below to refine the search.
    </p>
  </div>
</section>

</div>

<section id="about" className="py-5">
  <div className="container">
    <div className="row align-items-center gy-4">
      <div className="col-md-7">
        <h2 className="fw-bold">Discover The Joy Of Traveling</h2>
        <p className="text-muted">Step away from the rush of everyday life and escape to a world of calm and beauty. From golden beaches to peaceful hills, we craft experiences to help you unwind and reconnect.</p>
        <a href="#contact" className="btn btn-outline-primary mt-2">Read More</a>
      </div>
      <div className="col-md-5">
        <img src={pic1}alt="about" className="img-fluid rounded shadow-sm"/>
      </div>
    </div>
  </div>
</section>


 <section className="hero-section text-center text-dark">
  <div className="container">
    <h1 className="hero-title fw-bold">
      The Most Awarded Adventure 
      Tour Company in Europe
    </h1>
    <div className="hero-line mx-auto my-3"></div>
    <p className="hero-sub lead mx-auto">
      Lorem ipsum dolor sit amet consectetur adipiscing elit. 
      In erat est viverra fringilla euismod in fermentum sed 
      augue nullam consectetur ligula id elementum.
    </p>
    <a href="#" className="btn hero-btn mt-4">LEARN MORE</a>
  </div>
</section>
    </div>
  )
}
