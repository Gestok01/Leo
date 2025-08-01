import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/signin', { username, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setMessage('Signin successful!');
        navigate('/'); // Redirect to dashboard
      } else {
        setMessage(res.data.message || 'Signin failed');
      }
    } catch (err) {
      setMessage('Signin failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign In</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Signin;
