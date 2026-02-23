import React from 'react'
import pic from '../PIMAGES/pimage1.jpg';
import styled from "styled-components";

import './about.css';


export default function About() {


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
    <div>
                  <section id="about" className="py-5">
                      <div className="container">
                      <div className="row align-items-center gy-4">
                      <div className="col-md-7">
                      <h2 className="fw-bold">Discover The Joy Of Traveling</h2>
                       <p className="text-muted">Step away from the rush of everyday life and escape to a world of calm and beauty. From golden beaches to peaceful hills, we craft experiences to help you unwind and reconnect.</p>
                             {/* <a href="#contact" class="btn btn-outline-primary mt-2">Read More</a> */}
                             <Button primary>Read More</Button>
                      </div>
                      <div className="col-md-5">
                        <img src={pic} alt="about" className="img-fluid rounded shadow-sm"/>
                      </div>
                      </div>
                      </div>
                    </section>




      
      </div>
  )
}
