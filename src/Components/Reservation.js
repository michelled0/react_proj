import React from 'react';
import { reservation } from './Homepage';

function Reservation() {
    const reservations = [];
    const [searchTerm, setSearchTerm] = React.useState("");

    for (let lastName in reservation) {
        const firstName = reservation[lastName].firstName;
        const startingDate = reservation[lastName].startingDate;
        const endingDate = reservation[lastName].endingDate;

        reservations.push(
            <div className = 'res-item' key={lastName}>
                <h2>Last Name: {lastName}</h2>
                <p>First Name: {firstName}</p>
                <p>Starting Date: {startingDate}</p>
                <p>Ending Date: {endingDate}</p>
            </div>
        );
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    function handleClick() {
        if (searchTerm in reservation) { 
            alert(`${searchTerm}, you made a Reservation from ${reservation[searchTerm]['startingDate']} to ${reservation[searchTerm]['endingDate']}`)
        } else {
            alert("You didn't have a reservation yet, make one now!")
        }
    }

    return (
        <div className='reservation'>
            <h1>Reservation</h1>
            <h2>Find Your Reservation</h2>
            <input type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={handleSearch}/>
            <button onClick={handleClick}>Search</button>
            {reservations}
        </div>
        );
}

export default Reservation;
