import { useState, useEffect } from 'react';
import { Fragment } from 'react'

export default function Section2Organization() {
  const [formData, setFormData] = useState({
    incidentCommander: '',
    hazmatSupervisor: '',
    entryLeader: '',
    safetyOfficer: '',
    deconLeader: '',
    siteAccessLeader: '',
    entryTeam: ['', '', '', ''],
    entryPPE: ['', '', '', ''],
    deconTeam: ['', '', '', ''],
    deconPPE: ['', '', '', ''],
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section2) setFormData(saved.section2);
  }, []);

  const handleChange = (e, field, index = null) => {
    const value = e.target.value;
    if (index === null) {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].map((v, i) => (i === index ? value : v)),
      }));
    }
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem('rapidplan-draft', JSON.stringify({ ...existing, section2: formData }));
    alert('Organization info saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section2;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setFormData({
      incidentCommander: '',
      hazmatSupervisor: '',
      entryLeader: '',
      safetyOfficer: '',
      deconLeader: '',
      siteAccessLeader: '',
      entryTeam: ['', '', '', ''],
      entryPPE: ['', '', '', ''],
      deconTeam: ['', '', '', ''],
      deconPPE: ['', '', '', ''],
    });
    alert('Organization info cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 2: Organization</h2>

      <div className="styled-fields organization-roles">
        <label>Incident Commander:
          <input className="form-input" value={formData.incidentCommander} onChange={(e) => handleChange(e, 'incidentCommander')} />
        </label>
        <label>HazMat Group Supervisor:
          <input className="form-input" value={formData.hazmatSupervisor} onChange={(e) => handleChange(e, 'hazmatSupervisor')} />
        </label>
        <label>Entry Team Leader:
          <input className="form-input" value={formData.entryLeader} onChange={(e) => handleChange(e, 'entryLeader')} />
        </label>
        <label>Safety Officer:
          <input className="form-input" value={formData.safetyOfficer} onChange={(e) => handleChange(e, 'safetyOfficer')} />
        </label>
        <label>Decon Leader:
          <input className="form-input" value={formData.deconLeader} onChange={(e) => handleChange(e, 'deconLeader')} />
        </label>
        <label>Site Access Control Leader:
          <input className="form-input" value={formData.siteAccessLeader} onChange={(e) => handleChange(e, 'siteAccessLeader')} />
        </label>
      </div>

      <div className="styled-fields organization-grid">
        <div><strong>Entry Team</strong>
        <p>(buddy systen)</p></div>
        <div><strong>PPE Level</strong></div>
        <div><strong>Decon Team</strong>
        <p>(1 level lower)</p></div>
        <div><strong>PPE Level</strong></div>

        {formData.entryTeam.map((_, i) => (
          <Fragment key={i}>
            <input
              className="form-input"
              value={formData.entryTeam[i]}
              placeholder={`Entry ${i + 1}`}
              onChange={(e) => handleChange(e, 'entryTeam', i)}
            />
            <select
              className="form-select"
              value={formData.entryPPE[i]}
              onChange={(e) => handleChange(e, 'entryPPE', i)}
            >
              <option value="">--</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <input
              className="form-input"
              value={formData.deconTeam[i]}
              placeholder={`Decon ${i + 1}`}
              onChange={(e) => handleChange(e, 'deconTeam', i)}
            />
            <select
              className="form-select"
              value={formData.deconPPE[i]}
              onChange={(e) => handleChange(e, 'deconPPE', i)}
            >
              <option value="">--</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </Fragment>
        ))}
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}