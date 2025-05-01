import { useState, useEffect } from 'react';

export default function Section6Comms() {
  const [commandFreq, setCommandFreq] = useState('');
  const [tacticalFreq, setTacticalFreq] = useState('');
  const [entryFreq, setEntryFreq] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section6) {
      setCommandFreq(saved.section6.commandFreq || '');
      setTacticalFreq(saved.section6.tacticalFreq || '');
      setEntryFreq(saved.section6.entryFreq || '');
    }
  }, []);

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    const updated = {
      ...existing,
      section6: {
        commandFreq,
        tacticalFreq,
        entryFreq,
      },
    };
    localStorage.setItem('rapidplan-draft', JSON.stringify(updated));
    alert('Site Communications saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section6;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setCommandFreq('');
    setTacticalFreq('');
    setEntryFreq('');
    alert('Site Communications cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 6: Site Communications</h2>

      <div className="styled-fields comms-grid">
        <label>
          Command Freq:
          <input
            type="text"
            className="form-input"
            value={commandFreq}
            onChange={(e) => setCommandFreq(e.target.value)}
            placeholder="Channel 15"
            />

        </label>

        <label>
          Tactical Freq:
          <input
            type="text"
            className="form-input"
            value={tacticalFreq}
            onChange={(e) => setTacticalFreq(e.target.value)}
            placeholder="Channel 15"
           />
        </label>

        <label>
          Entry Freq:
          <input
            type="text"
            className="form-input"
            value={entryFreq}
            onChange={(e) => setEntryFreq(e.target.value)}
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}
