import React, { useState } from 'react';
import { chemicalData } from '../data/chemicalData';

export default function Section3Hazard() {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [hazardInfo, setHazardInfo] = useState(null);

  const handleSelect = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    const data = chemicalData.find(c => c.material === material);
    setHazardInfo(data || null);
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