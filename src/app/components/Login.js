"use client"

import { useState } from "react"



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Create payload
    const payload = { email, password };

    try {
      const response = await fetch("https://metrolite.co.in:5000/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Save user ID to localStorage
        console.log(data.admin._id)
        localStorage.setItem("userId", data.admin._id);
        // Optionally redirect to another page upon successful login
        window.location.href = "/";
      } else {
        // Handle unsuccessful login
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again later.");
    }
  };



  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        <form onSubmit={handleLogin} style={{
          backgroundColor: '#fff',
          display: 'block',
          padding: '1rem',
          maxWidth: '350px',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: 600,
            textAlign: 'center',
            color: '#000'
          }}>Sign in to your account</p>
          <div style={{
            position: 'relative'
          }} className="input-container">
            <input placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)} style={{
              outline: 'none',
              border: '1px solid #e5e7eb',
              margin: '8px 0',
              backgroundColor: '#fff',
              padding: '1rem',
              paddingRight: '3rem',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              width: '300px',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }} />
            <span style={{
              display: 'grid',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              paddingLeft: '1rem',
              paddingRight: '1rem',
              placeContent: 'center'
            }}>
              <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                color: '#9CA3AF',
                width: '1rem',
                height: '1rem'
              }}>
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
            </span>
          </div>
          <div style={{
            position: 'relative'
          }} className="input-container">
            <input placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} style={{
              outline: 'none',
              border: '1px solid #e5e7eb',
              margin: '8px 0',
              backgroundColor: '#fff',
              padding: '1rem',
              paddingRight: '3rem',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              width: '300px',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }} />

            <span style={{
              display: 'grid',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              paddingLeft: '1rem',
              paddingRight: '1rem',
              placeContent: 'center'
            }}>
              <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                color: '#9CA3AF',
                width: '1rem',
                height: '1rem'
              }}>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
            </span>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{
            display: 'block',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
            backgroundColor: '#4F46E5',
            color: '#ffffff',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 500,
            width: '100%',
            borderRadius: '0.5rem',
            textTransform: 'uppercase'
          }}>Sign in</button>

          <p style={{
            color: '#6B7280',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            textAlign: 'center'
          }} className="signup-link">
            No account?
            <a href="" style={{
              textDecoration: 'underline'
            }}>Sign up</a>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login