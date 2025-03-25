import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setError(''); // Clear previous errors

    axios.post('http://localhost:5173/api/login', { email, password })
      .then((response) => {
        console.log(response.data);
        setError(''); // Clear error on success
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'Invalid login credentials');
        } else if (error.request) {
          setError('No response from the server. Please try again later.');
        } else {
          setError('An unexpected error occurred.');
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='Container'>
        <div className="header">
          <div className="text"> Login </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button">
          <button type="submit">Login</button>
        </div>
        <div className="register">
          <button type="button" onClick={() => console.log('Navigate to Register')}>Click Here to Register</button>
        </div>
      </div>
    </form>
  );
}

export default Login;