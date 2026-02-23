import React from 'react';
import img1 from '../PIMAGES/curo1 (2).jpg';
import img2 from '../PIMAGES/curo2.jpg';
import img3 from '../PIMAGES/curo3 (2).jpg';
import './carosel.css';
import styled from "styled-components";

export default function Curosel() {

  const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#ec971f" : "pink")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? " #f0ad4e" : "darkgrey")};
  }
`;
  return (
    <>

        
      <div id="heroCarousel" className="carousel slide position-relative" data-bs-ride="carousel">

        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }} alt="Slide 1" />
          </div>

          <div className="carousel-item">
            <img src={img2} className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }} alt="Slide 2" />
          </div>

          <div className="carousel-item">
            <img src={img3} className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }} alt="Slide 3" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>

       
        <div className="hero-overlay d-flex flex-column justify-content-center align-items-center text-center text-white position-absolute top-50 start-50 translate-middle">
          <h1 className="display-5 fw-bold hero-title">Your Adventure Travel Experts in Europe</h1>
          <p className="lead hero-sub">Explore curated tours, hidden gems, and unforgettable experiences.</p>
          {/* <a href="#tours" className="btn btn-lg btn-primary mt-3">Explore Tours</a> */}
          <Button primary>Explore Tours</Button>

        </div>
      </div>
    </>
  );
}
