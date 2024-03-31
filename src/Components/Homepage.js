import React from 'react';

export const reservation = {};

function Homepage() {
    let today = new Date();
    let next = new Date(today);
    next.setFullYear(next.getFullYear()+1);
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [startDate, setStartDate] = React.useState(today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(today.getDate()+1).toString());
    const [endDate, setEndDate] = React.useState(today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(today.getDate()+1).toString());

    function handleChange(func, e) {
        func(e.target.value);
    }

    function clickHandler() {
        if (!first) {
            alert("Please fill out your first name")
        }
        else if (!last) {
            alert("Please fill out your last name")
        }
        else if (startDate > endDate) {
            alert("Ending Date cannot be earlier than Starting Date");
        }
        else {
            reservation[last] = {firstName: first, lastName: last, startingDate: startDate, endingDate: endDate};
            alert("You made a reservation!");
        }
    }

    const dateOptions = Array.from({ length: 365 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);
        return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      });

      const dateOptions2 = Array.from({ length: 365 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);
        return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      });
    
    return (<div className="homepage">
        <h1>Book you trip here!</h1>
        <div className='item'>
            <input value = {first} onChange ={(e) => handleChange(setFirst,e)} required/>
            <p>First Name</p>
        </div>
        <div className = "item">
            <input value = {last} onChange = {(e) => handleChange(setLast, e)} required/>
            <p>Last Name</p>
        </div>
        <div className = "item">
            <select value = {startDate} onChange = {(e)=>handleChange(setStartDate, e)} required>
                {dateOptions.map((date, index)=>(
                    <option key={index} value = {date}>{date}</option>
                ))}
            </select>
            <p>Starting Date</p>
        </div>
        <div className = "item">
        <select value = {endDate} onChange = {(e)=>handleChange(setEndDate, e)} required>
                {dateOptions2.map((date, index)=>(
                    <option key={index} value = {date}>{date}</option>
                ))}
            </select>
            <p>Ending Date</p>
        </div>
        <div className='item'>
            <button onClick = {clickHandler}>Submit</button>
        </div>
    </div>)
}

export default Homepage;