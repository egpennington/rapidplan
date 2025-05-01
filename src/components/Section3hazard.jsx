import { useState, useEffect } from 'react';
import { chemicalData } from '../data/chemicalData';

export default function Section3Hazard() {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [hazardInfo, setHazardInfo] = useState(null);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (savedDraft?.hazard) {
      setSelectedMaterial(savedDraft.hazard.material);
      setHazardInfo(savedDraft.hazard);
    }
  }, []);

  // When user selects material
  function handleSelect(e) {
    const selected = e.target.value;
    setSelectedMaterial(selected);
    const found = chemicalData.find(c => c.material === selected);
    setHazardInfo(found);
  }

  // Save hazard info to shared draft
  function saveDraft() {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    const updatedDraft = {
      ...existing,
      hazard: hazardInfo,
    };
    localStorage.setItem('rapidplan-draft', JSON.stringify(updatedDraft));
    alert('Hazard info saved to draft.');
  }

  // Clear only hazard part of draft
  function clearDraft() {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.hazard;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setSelectedMaterial('');
    setHazardInfo(null);
    alert('Hazard info cleared from draft.');
  }

  return (
    <section>
      <h2 className="section-heading">Section 3: Hazard and Risk Analysis</h2>

      <label htmlFor="chemical" className="form-label">Select Material/Chemical</label>
      <select
        id="chemical"
        className="form-select"
        value={selectedMaterial}
        onChange={handleSelect}
      >
        <option value="">-- Choose a Chemical --</option>
        {chemicalData.map((chem) => (
          <option key={chem.material} value={chem.material}>
            {chem.material}
          </option>
        ))}
      </select>

      {hazardInfo && (
        <div className="styled-fields">
          {Object.entries(hazardInfo).map(([key, value]) =>
            key !== 'material' ? (
              <div key={key}><strong>{key.toUpperCase()}:</strong> {value}</div>
            ) : null
          )}
        </div>
      )}

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}