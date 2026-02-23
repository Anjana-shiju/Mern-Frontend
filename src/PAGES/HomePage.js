import React, { useImperativeHandle } from 'react'
import Navbar from '../COMPONENTS/Navigation/Navbar'
import Curosel from '../COMPONENTS/Curosel/Curosel'
import About from '../COMPONENTS/About/about'
import Tour from '../COMPONENTS/Tours/Tour';
import Activity from '../COMPONENTS/Activities/Activity';
import Testimonial from '../COMPONENTS/Testimonial/Testimonial';
import Footer from '../COMPONENTS/Footer/Footer';

export default function HomePage() {
  return (
    <div>
        <Navbar/>
        <Curosel/>
        <About/>
        <Tour/>
        <Activity/>
        <Testimonial/>
        <Footer/>

    </div>
  )
}
