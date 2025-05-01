import { useState, useEffect } from 'react';

export default function Section5Decon() {
  const [deconRequired, setDeconRequired] = useState(null);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section5) {
      setDeconRequired(saved.section5.deconRequired ?? null);
      setComments(saved.section5.comments || '');
    }
  }, []);

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    const updated = {
      ...existing,
      section5: {
        deconRequired,
        comments,
      },
    };
    localStorage.setItem('rapidplan-draft', JSON.stringify(updated));
    alert('Decon Procedures saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section5;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setDeconRequired(null);
    setComments('');
    alert('Decon Procedures cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 5: Decontamination Procedures</h2>

      <div className="styled-fields decon-layout">
        <div className="decon-row">
            <label className="decon-label">Standard Decontamination Procedures:</label>
            <label>
            <input
                type="radio"
                name="decon"
                checked={deconRequired === true}
                onChange={() => setDeconRequired(true)}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="decon"
                checked={deconRequired === false}
                onChange={() => setDeconRequired(false)}
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
