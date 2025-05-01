import { useState, useEffect } from 'react';

export default function Section9EntryObjectives() {
  const [objectives, setObjectives] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section9) {
      setObjectives(saved.section9);
    }
  }, []);

  const handleChange = (e) => {
    setObjectives(e.target.value);
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem(
      'rapidplan-draft',
      JSON.stringify({ ...existing, section9: objectives })
    );
    alert('Entry Objectives saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section9;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setObjectives('');
    alert('Entry Objectives cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 9: Entry Objectives</h2>
      <div className="styled-fields">
        <div className="hazard-comments">
            <label>
            Entry Objectives:
            <textarea
                value={objectives}
                onChange={handleChange}
                className="form-input"
                rows="5"
                placeholder="Describe entry goals, known hazards, and specific areas of concern..."
            />
            </label>        
        </div>        
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}