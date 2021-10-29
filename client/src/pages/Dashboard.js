import React, { useState } from "react";



function Dashboard() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [count, setCount] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        }
        if (name === 'price') {
            setPrice(Number(value));
        }
        if (name === 'count') {
            setCount(Number(value));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setName('');
        setPrice('');
    }
    return (
        <form>
            <h1>Dashboard</h1>
            <div>
                <input
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                    type="text"
                    style={{ lineHeight: '1.5' }}>
                </input>
                <input
                    name="price"
                    onChange={handleInputChange}
                    value={price}
                    type="number"
                    style={{ lineHeight: '1.5' }}>
                </input>
                <input
                    name="count"
                    onChange={handleInputChange}
                    value={count}
                    type="number"
                    style={{ lineHeight: '1.5' }}>
                </input>
            </div>
            <button type="button" onClick={handleFormSubmit}>
                Submit
            </button>
        </form>
    );
}

export default Dashboard;
