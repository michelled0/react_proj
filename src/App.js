import './App.css';
import React from 'react';
import Homepage from './Components/Homepage';
import AboutMe from './Components/AboutMe';
import {Routes, Route, Link} from 'react-router-dom';
import Contact from './Components/Contact';
import Reservation from './Components/Reservation';
import FilterGroup from './Components/FilterGroup';
import ReservationFilter from './Components/ReservationFilter';
function App() {
  //localStorage.clear();
  return (
    <div>
      <nav className="nav">
        <Link to="/" className='nav-item'>Homepage</Link>
        <Link to="/yoursignups" className="nav-item">Your Sign Ups</Link>
        <Link to="/groups" className='nav-item'>Groups</Link>
      </nav>
      <Routes>
        <Route path="/" element ={<Homepage/>}/>
        <Route path="/yoursignups" element={<ReservationFilter/>}/>
        <Route path="/groups" element = {<FilterGroup/>}/>
      </Routes>
    </div>
  );
};

export default App;
