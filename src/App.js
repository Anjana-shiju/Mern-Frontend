import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import HomePage from './PAGES/HomePage';
import Tourr from './PAGES/Tourr';
import About from './PAGES/About';
import Activityy from './PAGES/Activityy';
import Galleryyyy from './PAGES/Galleryyyy';
import Contacttt from './PAGES/Contacttt';
import AdminLogin from './COMPONENTS/AdminLogin';
import AdminRegister from './COMPONENTS/AdminRegister';
import AdminDashboard from './PAGES/AdminDashboard';
import AdminPackages from './PAGES/AdminPackages';
import AdminBookings from './PAGES/AdminBooking';
import AdminActivities from './PAGES/AdminActivities';
import AdminGallery from './PAGES/AdminGallery';
import Book from './COMPONENTS/Booking/Bookingg';




const App= () =>{
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/tour" element={<Tourr/>}/>
        <Route path="/activity" element={<Activityy/>}/>
        <Route path="/gallery" element={<Galleryyyy/>}/>
        <Route path="/contact" element={<Contacttt/>}/>
        <Route path="/book"  element={<Book/>}/>
       


      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/packages" element={<AdminPackages/>} />
      <Route path="/admin/bookings" element={<AdminBookings/>} />
      <Route path="/admin/activities" element={<AdminActivities/>} />
      <Route path="/admin/gallery" element={<AdminGallery/>} />
      </Routes>
      </Router>

    </>
    
  );
}

export default App;
