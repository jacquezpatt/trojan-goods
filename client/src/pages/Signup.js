import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    if (data) {
      return (
      <p>
        Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
      </p>
      )
    } 
    return (
      <form className="form-group" onSubmit={handleFormSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  };

  return (
    <main class="navbar-text">
      <h4>Sign Up</h4>
      <div>
        {renderForm()}
        {error && <div>{error.message}</div>}
      </div>
    </main>
  );
};

export default Signup;
