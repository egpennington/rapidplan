import React, { useState, useEffect } from 'react';

export default function Section1Incident() {
  const [incidentName, setIncidentName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().slice(0, 5);
    setDate(formattedDate);
    setTime(formattedTime);
  }, []);

  return (
    <div className="container form-section">
      <h2 className="section-heading">Section 1: Incident Information</h2>
      <div className="form-grid-2col">
        <div>
          <label className="form-label" htmlFor="incident-name">Incident Name</label>
          <input 
            id="incident-name" 
            className="form-input" 
            type="text" 
            value={incidentName} 
            onChange={(e) => setIncidentName(e.target.value)} 
          />
        </div>

        <div>
          <label className="form-label" htmlFor="incident-date">Date</label>
          <input 
            id="incident-date" 
            className="form-input" 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        <div>
          <label className="form-label" htmlFor="incident-location">Location</label>
          <input 
            id="incident-location" 
            className="form-input" 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </div>

        <div>
          <label className="form-label" htmlFor="incident-time">Time</label>
          <input 
            id="incident-time" 
            className="form-input" 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
}