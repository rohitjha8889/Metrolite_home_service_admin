"use client"
import React, { useState, useEffect } from 'react';

function IndianTime() {
  const [indianTime, setIndianTime] = useState('');

  useEffect(() => {
    const updateIndianTime = () => {
      // Get current UTC time
      const now = new Date();
      
      // Get the current Indian time
      const ISTTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}));
      
      // Format the time in 12-hour format with seconds
      let hours = ISTTime.getHours();
      let minutes = ISTTime.getMinutes();
      let seconds = ISTTime.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)
      
      // Set the Indian time in the state
      setIndianTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`);
    };

    // Update the time initially
    updateIndianTime();

    // Update the time every second (1000 milliseconds)
    const interval = setInterval(updateIndianTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div> {indianTime}</div>
  );
}

export default IndianTime;
