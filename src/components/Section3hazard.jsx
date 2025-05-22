import { useState, useEffect } from 'react';
import { chemicalData } from '../data/chemicalData';
import Toast from './Toast'

export default function Section3Hazard() {
  const [selectedChemical, setSelectedChemical] = useState('');
  const [selectedChemicals, setSelectedChemicals] = useState([]);
  const [addedIndex, setAddedIndex] = useState(null);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section3) setSelectedChemicals(saved.section3);
  }, []);

  const handleAddChemical = () => {
    const chem = chemicalData.find(c => c.material === selectedChemical);
    if (chem && !selectedChemicals.some(c => c.material === chem.material)) {
      setSelectedChemicals(prev => {
        const updated = [...prev, chem];
        setAddedIndex(updated.length - 1);
        setTimeout(() => setAddedIndex(null), 500);
        return updated;
      });
    }

    setSelectedChemical('');
  };

  const handleRemoveChemical = (index) => {
    setRemovingIndex(index);

    setTimeout(() => {
      const updated = [...selectedChemicals];
      updated.splice(index, 1);
      setSelectedChemicals(updated);

    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem('rapidplan-draft', JSON.stringify({
      ...existing,
      section3: updated
    }));

      setRemovingIndex(null);
    }, 400);
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem('rapidplan-draft', JSON.stringify({ ...existing, section3: selectedChemicals }));
    setSaveStatus('✔️ Hazard data saved');
    setTimeout(() => setSaveStatus(null), 2000);
    };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section3;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setSelectedChemicals([]);
  };

  return (
    <section>
      <h2 className="section-heading">Section 3: Hazard and Risk Analysis</h2>

      <div className="styled-fields hazard-selector">
        <div className="add-chemical-row">
          <label className="form-label">Select Material/Chemical</label>
          <div>
            <select
              className="form-select"
              value={selectedChemical}
              onChange={(e) => setSelectedChemical(e.target.value)}
            >
              <option value="">-- Choose a chemical --</option>
              {chemicalData.map((c, i) => (
                <option key={i} value={c.material}>{c.material}</option>
              ))}
            </select>
            <button className="chemical-add-btn" onClick={handleAddChemical}> <i className="fa-solid fa-plus"></i> Chemical <i className="fa-solid fa-flask"></i></button>
          </div>
        </div>

        <div className="chemical-grid">
          {selectedChemicals.map((chem, index) => (
            <div key={index} className={`hazard-card 
              ${removingIndex === index ? 'fade-out' : ''} 
              ${addedIndex === index ? 'bounce-in' : ''}`}
            >
              <button
                onClick={() => handleRemoveChemical(index)}
                className="remove-chemical-icon"
                title="Remove this chemical"
              >
                ×
              </button>
              <h3>{chem.material}</h3>
              <p><strong>State:</strong> {chem.physicalState}</p>
              {chem.MW && <p><strong>MW:</strong> {chem.MW}</p>}              
              {chem.pH && <p><strong>pH:</strong> {chem.pH}</p>}
              {chem.IDLH && <p><strong>IDLH:</strong> {chem.IDLH}</p>}
              {chem.FP && <p><strong>FP:</strong> {chem.FP}</p>}              
              {chem.VP && <p><strong>VP:</strong> {chem.VP}</p>}
              {chem.VD && <p><strong>VD:</strong> {chem.VD}</p>}
              {chem.SG && <p><strong>SG:</strong> {chem.SG}</p>}
              {chem.LEL && <p><strong>LEL:</strong> {chem.LEL}</p>}
              {chem.UEL && <p><strong>UEL:</strong> {chem.UEL}</p>}
              <div className="chemical-highlights">
                {chem.SG && chem.physicalState === "Gas" && (
                  <p>
                    <strong>SG:</strong> {chem.SG}
                    {(() => {
                      const match = chem.SG.match(/[\d.]+/);
                      const sgValue = match ? parseFloat(match[0]) : null;
                      return sgValue !== null && (
                        <span className={sgValue < 1 ? "sg-light" : "sg-heavy"}>
                          {sgValue < 1 ? " ⬆️ Lighter than air" : " ⬇️ Heavier than air"}
                        </span>
                      );
                    })()}
                  </p>
                )}

                {chem.IP && (
                  <p>
                    <strong>IP:</strong> {chem.IP}{' '}
                    {chem.material === "Emtonium" ? (
                      <span className="pid-fantasy">Only detectable by wizards ✨</span>
                    ) : (
                      !isNaN(parseFloat(chem.IP)) && parseFloat(chem.IP) <= 10.6 ? (
                        <span className="pid-ok">PID Detectable</span>
                      ) : (
                        <span className="pid-warn">Not detectable by 10.6 eV PID</span>
                      )
                    )}
                  </p>
                )}

                {chem.asphyxiant && (
                  <p className="asphyxiant-tag">
                    <i className="fa-solid fa-triangle-exclamation"></i>{' '}
                    <strong>Asphyxiant</strong> – Displaces oxygen in confined spaces
                  </p>
                )}

                {chem.carcinogen && (
                  <p className="carcinogen-tag">
                    <i className="fa-solid fa-skull-crossbones fa-sm"></i> <strong>Carcinogen</strong> – Known to cause cancer with prolonged exposure
                  </p>
                )}
              </div>

              {chem.ERGGuide && (
                <div className="erg-block">
                  <p><strong>🚨 ERG Response Data</strong></p>
                  <p><strong>Guide:</strong> {chem.ERGGuide}</p>
                  <p><strong>UN/NA:</strong> {chem.UNID}</p>
                  <p><strong>Isolation:</strong> {chem.isolation}</p>
                  <small title="See ERG Table 1 for day/night spill distances and special cases.">
                    📘 See ERG Table 1 for day/night spill distances and special cases
                  </small>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        {saveStatus && <Toast message={saveStatus} />}

        <button className="close-button" onClick={clearDraft}>Clear All</button>
      </div>
    </section>
  );
}