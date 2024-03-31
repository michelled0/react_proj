import './App.css';
import React from 'react';
import Homepage from './Components/Homepage';
import AboutMe from './Components/AboutMe';
import {Routes, Route, Link} from 'react-router-dom';
import Contact from './Components/Contact';
import Reservation from './Components/Reservation';

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/" className='nav-item'>Homepage</Link>
        <Link to="/about-us" className="nav-item">About Us</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
        <Link to="/reservation" className='nav-item'>Reservation</Link>
      </nav>
      <Routes>
        <Route path="/" element ={<Homepage/>}/>
        <Route path="/about-us" element={<AboutMe/>}/>
        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/reservation" element = {<Reservation/>}/>
      </Routes>
    </div>
  );
};

export default App;
