import React from "react";
import axios from 'axios';

function OpenAccount() {

  const handleSignUp = () => {
    const loginData = {
      email: "test@example.com",   // Replace with real input values
      password: "123456"
    };

axios.post(`/signin`, loginData)
      .then(res => {
        localStorage.setItem("authToken", res.data.token);
        // Redirect to dashboard
        window.location.href = "https://stack-vast-zekz.vercel.app";
      })
      .catch(err => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open a Leo account</h1>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          onClick={handleSignUp}  // ✅ Connected to function
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up Now
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;