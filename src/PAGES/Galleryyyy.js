import React from 'react'
import Navigation from '../COMPONENTS/Navigation/Navbar';
import TourPage from '../COMPONENTS/TourPage/TourPage';
import Footer from '../COMPONENTS/Footer/Footer';
import GalleryPage from '../COMPONENTS/GalleryPage/GalleryPage';


export default function Tourr() {
  return (
    <div>
       <Navigation/>
       <GalleryPage/>
       <Footer/>
    </div>
  )
}
