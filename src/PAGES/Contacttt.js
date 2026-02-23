import React from 'react'
import Navigation from '../COMPONENTS/Navigation/Navbar';

import Footer from '../COMPONENTS/Footer/Footer';

import ContactPage from '../COMPONENTS/ContactPage/Contact';




export default function Tourr() {
  return (
    <div>
       <Navigation/>
       <ContactPage/>
       {/* <Contact/> */}
       <Footer/>
    </div>
  )
}
