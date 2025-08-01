import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiURL = `${process.env.REACT_APP_API_URL || 'https://leo-backend-h68o.onrender.com'}/api/auth/signup`;
      console.log("Calling API at:", apiURL);

      const res = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, username, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Signup successful!');
        window.location.href = 'https://leo-byn7.vercel.app';
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src="/media/images/leo.png" alt="Leo Logo" className="signup-logo" />
        <h2>Create new account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required className="signup-input" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="signup-input" />
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="signup-input" />
          <div className="signup-password-wrapper" style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="signup-input" />
            <button type="button" className="signup-show-hide" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
        <p className="signup-login-link">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
}

export default Signup;


