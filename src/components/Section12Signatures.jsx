import { useState, useEffect } from 'react';

export default function Section12Signatures() {
  const [formData, setFormData] = useState({
    dateTime: '',
    safetyOfficer: '',
    entrySupervisor: '',
    incidentCommander: '',
    safetyAck: false,
    entryAck: false,
    commanderAck: false
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section12) {
      setFormData(saved.section12);
    } else {
      const now = new Date().toLocaleString();
      setFormData(prev => ({ ...prev, dateTime: now }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem('rapidplan-draft', JSON.stringify({
      ...existing,
      section12: formData
    }));
    alert('Signatures saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section12;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setFormData({
      dateTime: new Date().toLocaleString(),
      safetyOfficer: '',
      entrySupervisor: '',
      incidentCommander: '',
      safetyAck: false,
      entryAck: false,
      commanderAck: false
    });
    alert('Signatures cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 12: Safety Briefing Signatures</h2>

      <div className="styled-fields">
        <label>
          Date & Time:
          <input
            type="text"
            name="dateTime"
            value={formData.dateTime}
            readOnly
            className="form-input"
          />
        </label>

        <label>
          Safety Officer:
          <input
            type="text"
            name="safetyOfficer"
            value={formData.safetyOfficer}
            onChange={handleChange}
            className="form-input"
            placeholder="Name of Safety Officer"
          />
          <label>
            <input
              type="checkbox"
              name="safetyAck"
              checked={formData.safetyAck}
              onChange={handleChange}
            /> I acknowledge this briefing.
          </label>
        </label>

        <label>
          Entry Supervisor:
          <input
            type="text"
            name="entrySupervisor"
            value={formData.entrySupervisor}
            onChange={handleChange}
            className="form-input"
            placeholder="Name of Entry Supervisor"
          />
          <label>
            <input
              type="checkbox"
              name="entryAck"
              checked={formData.entryAck}
              onChange={handleChange}
            /> I acknowledge this briefing.
          </label>
        </label>

        <label>
          Incident Commander:
          <input
            type="text"
            name="incidentCommander"
            value={formData.incidentCommander}
            onChange={handleChange}
            className="form-input"
            placeholder="Name of Incident Commander"
          />
          <label>
            <input
              type="checkbox"
              name="commanderAck"
              checked={formData.commanderAck}
              onChange={handleChange}
            /> I acknowledge this briefing.
          </label>
        </label>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}