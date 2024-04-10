import React, { useState, useEffect } from "react";

function ReservationFilter() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [showReservations, setShowReservations] = useState(false);

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setFilteredReservations(storedReservations);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowReservations(true);
    };

    return (
        <div className="reservationFilter">
            <h1>Enter your name to view your sign ups</h1>
            <form onSubmit={handleSubmit}>
                <label className="name">
                    First Name:
                    <input
                        style={{margin:10}}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label lassName="name">
                    Last Name:
                    <input
                        style={{margin:10}}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <button type="submit">Search</button>
            </form>
            {showReservations && (
                <div>
                    <h2>Existed sign ups</h2>
                    <ul style = {{listStyleType: 'none'}}>
                        {filteredReservations
                            .filter(reservation =>
                                reservation.firstName.toLowerCase() === firstName.toLowerCase() &&
                                reservation.lastName.toLowerCase() === lastName.toLowerCase()
                            )
                            .map((reservation, index) => (
                                <li className = "key" key={index}>
                                    <p>Name: {reservation.firstName} {reservation.lastName}</p>
                                    
                                    <p>Date: {reservation.date.toString().split("T")[0]}</p>
                                    
                                    <p>Group: {reservation.group}</p>
                                    
                                    <p>Bio: {reservation.bio}</p>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ReservationFilter;
