import React from 'react';

function Reservation() {
    const [reservations, setReservations] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    React.useEffect(() => {
        // Retrieve reservations from localStorage
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setReservations(storedReservations);
    }, []);

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    function handleClick() {
        const foundReservation = reservations.find(reservation => reservation.lastName === searchTerm);
        if (foundReservation) {
            alert(`${searchTerm}, you made a Reservation from ${foundReservation.startingDate} to ${foundReservation.endingDate}`)
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
            {reservations.map((reservation, index) => (
                <div className='res-item' key={index}>
                    <h2>Last Name: {reservation.lastName}</h2>
                    <p>First Name: {reservation.firstName}</p>
                    <p>Starting Date: {reservation.startingDate}</p>
                    <p>Ending Date: {reservation.endingDate}</p>
                    <p>Topic: {reservation.group}</p>
                </div>
            ))}
        </div>
    );
}

export default Reservation;