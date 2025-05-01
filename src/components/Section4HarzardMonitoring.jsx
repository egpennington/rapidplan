import { useState, useEffect } from 'react';

export default function Section4HazardMonitoring() {
  const defaultTools = {
    wetPhPaper: false,
    hcTube: false,
    radDosimeter: false,
    multiRae: false,
    chemRae: false,
    heatGun: false,
    bearPaw: false,
    radiationInstrument: false,
    customTool: '',
    customToolChecked: false
  };

  const [tools, setTools] = useState(defaultTools);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section4) {
      setTools(saved.section4.tools || defaultTools);
      setComments(saved.section4.comments || '');
    }
  }, []);

  const handleCheckboxChange = (key) => {
    setTools(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCustomToolChange = (e) => {
    setTools(prev => ({ ...prev, customTool: e.target.value }));
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    const updated = {
      ...existing,
      section4: {
        tools,
        comments
      }
    };
    localStorage.setItem('rapidplan-draft', JSON.stringify(updated));
    alert('Hazard monitoring saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section4;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setTools(defaultTools);
    setComments('');
    alert('Hazard monitoring cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 4: Hazard Monitoring</h2>

      <div className="styled-fields hazard-grid">
        {[
          { label: 'Wet pH Paper', key: 'wetPhPaper' },
          { label: 'HC Tube', key: 'hcTube' },
          { label: 'Rad Dosimeter', key: 'radDosimeter' },
          { label: 'MultiRae Plus', key: 'multiRae' },
          { label: 'Chem Rae', key: 'chemRae' },
          { label: 'Heat Gun / TIC', key: 'heatGun' },
          { label: 'Bear Paw', key: 'bearPaw' },
          { label: 'Radiation Instrument', key: 'radiationInstrument' },
        ].map(({ label, key }) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={tools[key]}
              onChange={() => handleCheckboxChange(key)}
            />{' '}
            {label}
          </label>
        ))}

        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={tools.customToolChecked}
            onChange={() => handleCheckboxChange('customToolChecked')}
          />{' '}
          <input
            type="text"
            className="form-input"
            placeholder="Other..."
            value={tools.customTool}
            onChange={handleCustomToolChange}
          />
        </label>

        <label className="hazard-comments">
          Comments:
          <textarea
            className="form-input"
            rows="3"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
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