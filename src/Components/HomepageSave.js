import React from 'react';

function HomepageSave() {
    let today = new Date();
    let next = new Date(today);
    next.setFullYear(next.getFullYear()+1);
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedOption, setSelectedOption] = React.useState('');
    
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
        const startDate2 = new Date(startDate);
        const endDate2 = new Date(endDate);
        if (!first) {
            alert("Please fill out your first name")
        }
        else if (!last) {
            alert("Please fill out your last name")
        }
        else if (startDate2 > endDate2) {
            alert("Ending Date cannot be earlier than Starting Date");
        }
        else {
            const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
            // Check if a reservation with the same details already exists
            const isDuplicate = existingReservations.some(reservation => 
                reservation.firstName === first &&
                reservation.lastName === last &&
                reservation.startingDate === startDate &&
                reservation.endingDate === endDate &&
                reservation.group === selectedOption
            );

            if (isDuplicate) {
                alert("You made a reservation already!");
            } else {
                const reservation = {
                    firstName: first,
                    lastName: last,
                    startingDate: startDate,
                    endingDate: endDate,
                    group:selectedOption
                };
                const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
                // Add the new reservation
                const updatedReservations = [...existingReservations, reservation];
                // Store the updated reservations back to localStorage
                localStorage.setItem('reservations', JSON.stringify(updatedReservations));
                alert("You made a reservation!");
            }
        }
    }

    
    return (<div className="homepage">
        <h1>Sign up for a study/interest group!</h1>
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
        <SelectWithCustomInput/>
        <div className='item'>
            <button onClick = {clickHandler}>Submit</button>
        </div>
    </div>)
}

export default HomepageSave;