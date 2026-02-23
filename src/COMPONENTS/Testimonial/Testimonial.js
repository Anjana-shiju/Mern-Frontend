import React from 'react'
import Test1 from '../PIMAGES/test.jfif';
import Test2 from '../PIMAGES/test2.jfif';
import Test3 from '../PIMAGES/test3.jfif';
import './Test.css';



export default function Testimonial() {
  return (
    <div>
<section className="testimonial text-center">
        <div className="container">

            <div className="heading white-heading">
                What Our Travelers Say
            </div>
            <div id="testimonial4" class="carousel slide testimonial4_indicators testimonial4_control_button thumb_scroll_x swipe_x" data-ride="carousel" data-pause="hover" data-interval="5000" data-duration="2000">
             
                <div class="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <div className="testimonial4_slide">
                            <img src={Test1} class="img-circle img-responsive" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            <h4>Mariya</h4>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="testimonial4_slide">
                            <img src={Test2} class="img-circle img-responsive" /><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            <h4>John</h4>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="testimonial4_slide">
                            <img src={Test3} class="img-circle img-responsive" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            <h4>Jonathan</h4>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#testimonial4" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#testimonial4" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div>
        </div>
    </section>





    </div>
  )
}
