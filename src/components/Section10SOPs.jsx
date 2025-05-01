import { useState, useEffect } from 'react';

export default function Section10SOPs() {
  const [formData, setFormData] = useState({
    modified: '',
    comments: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section10) {
      setFormData(saved.section10);
    }
  }, []);

  const handleCheckboxChange = (value) => {
    setFormData(prev => ({ ...prev, modified: value }));
  };

  const handleCommentChange = (e) => {
    setFormData(prev => ({ ...prev, comments: e.target.value }));
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem('rapidplan-draft', JSON.stringify({
      ...existing,
      section10: formData
    }));
    alert('SOP info saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section10;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setFormData({ modified: '', comments: '' });
    alert('SOP info cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 10: SOPs and Safe Work Practices</h2>

      <div className="styled-fields decon-layout">
        <div className="decon-row">
          <span className="decon-label">Modifications to Documented SOPs or Work Practices:</span>
          <label>
            <input
              type="checkbox"
              checked={formData.modified === 'yes'}
              onChange={() => handleCheckboxChange('yes')}
            /> Yes
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.modified === 'no'}
              onChange={() => handleCheckboxChange('no')}
            /> No
          </label>
        </div>

        <div className="decon-comments">
          <textarea
            className="form-input"
            rows="4"
            placeholder="Details or explanation of SOP modifications..."
            value={formData.comments}
            onChange={handleCommentChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}