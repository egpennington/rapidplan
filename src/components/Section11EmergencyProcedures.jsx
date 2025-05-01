import { useState, useEffect } from 'react';

export default function Section11EmergencyProcedures() {
  const [emergencyProcedures, setEmergencyProcedures] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section11) {
      setEmergencyProcedures(saved.section11);
    }
  }, []);

  const handleChange = (e) => {
    setEmergencyProcedures(e.target.value);
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem('rapidplan-draft', JSON.stringify({
      ...existing,
      section11: emergencyProcedures
    }));
    alert('Emergency Procedures saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section11;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setEmergencyProcedures('');
    alert('Emergency Procedures cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 11: Emergency Procedures</h2>

      <div className="styled-fields decon-layout">
        <textarea
          className="form-input"
          rows="5"
          placeholder="Describe emergency procedures, evacuation routes, etc."
          value={emergencyProcedures}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}