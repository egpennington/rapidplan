import { useState, useEffect } from 'react';

export default function Section1Incident() {
  const [incidentName, setIncidentName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Set defaults or load from draft
  useEffect(() => {
    const now = new Date();
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
  
    if (saved?.incident) {
      setIncidentName(saved.incident.name || '');
      setLocation(saved.incident.location || '');
      setDate(saved.incident.date || now.toLocaleDateString('en-CA'));
      setTime(saved.incident.time || now.toTimeString().slice(0, 5)); // ✅ fallback here
    } else {
      setDate(now.toLocaleDateString('en-CA'));
      setTime(now.toTimeString().slice(0, 5));
    }
  }, []);

  function saveDraft() {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    const updated = {
      ...existing,
      incident: {
        name: incidentName,
        location,
        date,
        time
      }
    };
    localStorage.setItem('rapidplan-draft', JSON.stringify(updated));
    alert('Incident info saved to draft.');
  }

  function clearDraft() {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.incident;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setIncidentName('');
    setLocation('');
    setDate('');
    setTime('');
    alert('Incident info cleared from draft.');
  }

  return (
    <section>
      <h2 className="section-heading">Section 1: Incident Information</h2>
      <div className="form-grid-2col">
        <div>
          <label className="form-label" htmlFor="incidentName">Incident Name</label>
          <input
            id="incidentName"
            className="form-input"
            value={incidentName}
            onChange={(e) => setIncidentName(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="location">Location</label>
          <input
            id="location"
            className="form-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}