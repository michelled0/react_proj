import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage() {
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedOption, setSelectedOption] = React.useState('');
    const [bio, setBio] = React.useState("")

    const SelectWithCustomInput = () => {
        const [options, setOptions] = React.useState([]);
        const [customInput, setCustomInput] = React.useState('');

        React.useEffect(() => {
            const storedOptions = JSON.parse(localStorage.getItem('customOptions')) || [];
            setOptions(storedOptions);
        }, []);

        React.useEffect(() => {
            localStorage.setItem('customOptions', JSON.stringify(options));
        }, [options]);

        const handleSelectChange = (e) => {
            setSelectedOption(e.target.value);
        };

        const handleInputChange = (e) => {
            setCustomInput(e.target.value);
        };

        const handleAddCustomOption = () => {
            const trimmedInput = customInput.trim();
            if (trimmedInput !== '') {
                const lowerCaseInput = trimmedInput.toLowerCase();
                const matchingOption = options.find(option => option.toLowerCase() === lowerCaseInput);
                if (matchingOption) {
                    setSelectedOption(matchingOption);
                } else {
                    setOptions([...options, trimmedInput]);
                    setSelectedOption(trimmedInput);
                    localStorage.setItem('customOptions', JSON.stringify([...options, trimmedInput]));
                }
                setCustomInput('');
            }
        };

        

        return (
            <div className='item'>
                <p>Group: </p>
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="">Select an option...</option>
                    {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={customInput}
                    onChange={handleInputChange}
                    placeholder="Enter custom option"
                />
                <button onClick={handleAddCustomOption}>Add</button>
            </div>
        );
    };

    

    function handleChange(func, e) {
        func(e.target.value);
    }

    function clickHandler() {

        if (!first) {
            alert("Please fill out your first name")
        }
        else if (!last) {
            alert("Please fill out your last name")
        } else if(!selectedDate) {
            alert("Please fill out your available date")
        } else if (!selectedOption) {
            alert("Please select or create your choice for group")
        }
        else {
            const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
            // Check if a reservation already exists
            const isDuplicate = existingReservations.some(reservation => 
                reservation.firstName === first &&
                reservation.lastName === last &&
                reservation.date === selectedDate &&
                reservation.group === selectedOption
            );

            if (isDuplicate) {
                alert("You made a reservation already!");
            } else {
                const reservation = {
                    firstName: first,
                    lastName: last,
                    date: selectedDate,
                    group:selectedOption,
                    bio: bio
                };
                const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
                
                const updatedReservations = [...existingReservations, reservation];
                // Store the updated reservations back to localStorage
                localStorage.setItem('reservations', JSON.stringify(updatedReservations));
                alert("You made a reservation!");
            }
        }
    }
    function handleDateChange(date) {
        setSelectedDate(date);
    }
    
    return (<div className="homepage">
        <h1>Sign up for a study group!</h1>
        <div className='item'>
            <p>First Name: </p>
            <input value = {first} onChange ={(e) => handleChange(setFirst,e)} required/>
            
        </div>
        <div className = "item">
            <p>Last Name: </p>
            <input value = {last} onChange = {(e) => handleChange(setLast, e)} required/>
        </div>
        <div className="item">
            <p>Availability Date:</p>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
            />
            
        </div>
        <SelectWithCustomInput/>
        <div className='item'>
            <p>Describe yourself, your question with the topic, what you want to study, etc:</p>
            <textarea value = {bio} onChange = {(e) => handleChange(setBio, e)} required/>
        </div>
        <div className='item'>
            <button onClick = {clickHandler}>Submit</button>
        </div>
    </div>)
}

export default Homepage;