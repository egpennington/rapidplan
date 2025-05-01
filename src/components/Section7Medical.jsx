import { useState, useEffect } from 'react';

export default function Section7Medical() {
  const [monitoring, setMonitoring] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section7) {
      setMonitoring(saved.section7.monitoring ?? null);
      setTreatment(saved.section7.treatment ?? null);
      setComments(saved.section7.comments || '');
    }
  }, []);

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    const updated = {
      ...existing,
      section7: {
        monitoring,
        treatment,
        comments,
      },
    };
    localStorage.setItem('rapidplan-draft', JSON.stringify(updated));
    alert('Medical assistance info saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section7;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setMonitoring(null);
    setTreatment(null);
    setComments('');
    alert('Medical assistance cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 7: Medical Assistance</h2>

      <div className="styled-fields decon-layout">
        <div className="decon-row">
          <label className="decon-label">Medical Monitoring:</label>
          <label>
            <input
              type="radio"
              name="monitoring"
              checked={monitoring === true}
              onChange={() => setMonitoring(true)}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="monitoring"
              checked={monitoring === false}
              onChange={() => setMonitoring(false)}
            /> No
          </label>

          <label className="decon-label" style={{ marginLeft: '2rem' }}>
            Treatment &amp; Transport In-place:
          </label>
          <label>
            <input
              type="radio"
              name="treatment"
              checked={treatment === true}
              onChange={() => setTreatment(true)}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="treatment"
              checked={treatment === false}
              onChange={() => setTreatment(false)}
            /> No
          </label>
        </div>

        <div className="decon-comments">
          <label>
            Comments:
            <textarea
              className="form-input"
              rows="3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
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
