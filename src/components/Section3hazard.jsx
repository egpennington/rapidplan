// src/components/Section3Hazard.js
import React, { useState, useEffect } from 'react';
import { chemicalData } from '../data/chemicalData';

export default function Section3Hazard() {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [hazardInfo, setHazardInfo] = useState(null);

  // Load saved draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('hazard-chemical');
    if (saved) {
      setSelectedMaterial(saved);
      const data = chemicalData.find(c => c.material === saved);
      setHazardInfo(data || null);
    }
  }, []);

  const handleSelect = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    const data = chemicalData.find(c => c.material === material);
    setHazardInfo(data || null);
  };

  const handleSaveDraft = () => {
    if (selectedMaterial) {
      localStorage.setItem('hazard-chemical', selectedMaterial);
      alert('Section 3 draft saved!');
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem('hazard-chemical');
    setSelectedMaterial('');
    setHazardInfo(null);
  };

  return (
    <div className="container form-section">
      <h2 className="section-heading">Section 3: Hazard and Risk Analysis</h2>

      <label htmlFor="chemical" className="form-label">Select Material/Chemical</label>
      <select id="chemical" className="form-select" value={selectedMaterial} onChange={handleSelect}>
        <option value="">-- Select a chemical --</option>
        {chemicalData.map((chem, idx) => (
          <option key={idx} value={chem.material}>{chem.material}</option>
        ))}
      </select>

      <div className="form-actions">
        <button onClick={handleSaveDraft} className="about-button">Save Draft</button>
        <button onClick={handleClearDraft} className="close-button">Clear Draft</button>
      </div>

      {hazardInfo && (
        <div className="form-grid styled-fields">
          <div><strong>Physical State:</strong> {hazardInfo.physicalState}</div>
          <div><strong>pH:</strong> {hazardInfo.pH}</div>
          <div><strong>IDLH:</strong> {hazardInfo.IDLH}</div>
          <div><strong>Flash Point (FP):</strong> {hazardInfo.FP}</div>
          <div><strong>Ignition Point (IP):</strong> {hazardInfo.IP}</div>
          <div><strong>Vapor Pressure (VP):</strong> {hazardInfo.VP}</div>
          <div><strong>Vapor Density (VD):</strong> {hazardInfo.VD}</div>
          <div><strong>Specific Gravity (SG):</strong> {hazardInfo.SG}</div>
          <div><strong>LEL:</strong> {hazardInfo.LEL}</div>
        </div>
      )}
    </div>
  );
}