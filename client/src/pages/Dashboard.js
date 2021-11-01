import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ITEMS } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations";

function Dashboard() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [count, setCount] = useState(null);
    const { loading, data, error } = useQuery(QUERY_ITEMS);
    const [addItem, { error: addItemError }] = useMutation(ADD_ITEM);

    const items = data?.items || [];

    if (error) console.log(error);

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const { data } = await addItem({
            variables: {
                name, price, count
            }
        });

        console.log(data);

        setName('');
        setPrice('');
        setCount('');

        window.location.reload();
    }

    if (loading) return <h2>Loading...</h2>;

    return (
        <form className="form-group">
            <h1>Dashboard</h1>
            <main className="mb-5">
                {items.map(item => {
                    return (
                        <div key={item._id}>{item.name}</div>
                    )
                })}
            </main>
            <div>
                <label for="name" className="form-label">Name</label>
                <input
                    className="form-control mb-3"
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                    type="text"
                    style={{ lineHeight: '1.5' }}>
                </input>
                <label for="price" class="form-label">Price</label>
                <input
                    className="form-control  mb-3"
                    name="price"
                    onChange={handleInputChange}
                    value={price}
                    type="number"
                    style={{ lineHeight: '1.5' }}>
                </input>
                <label for="count" class="form-label">Count</label>
                <input
                    className="form-control  mb-3"
                    name="count"
                    onChange={handleInputChange}
                    value={count}
                    type="number"
                    style={{ lineHeight: '1.5' }}>
                </input>
            </div>
            <button className="btn btn-primary" type="button" onClick={handleFormSubmit}>
                Submit
            </button>
        </form>
    );
}

export default Dashboard;
