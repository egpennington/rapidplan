import { useState } from 'react';
import { APP_VERSION } from '../version';

import Header from './components/Header';
import Section1Incident from './components/Section1Incident';
import Section2Organization from './components/Section2Organization';
import Section3Hazard from './components/Section3hazard';
import Section4HazardMonitoring from './components/Section4HarzardMonitoring';
import Section5Decon from './components/Section5Decon';
import Section6Comms from './components/Section6Comms';
import Section7Medical from './components/Section7Medical';
import Section8SiteMap from './components/Section8SiteMap';
import Section9EntryObjectives from './components/Section9EntryObjectives';
import Section10SOPs from './components/Section10SOPs';
import Section11EmergencyProcedures from './components/Section11EmergencyProcedures';
import Section12SafetyBriefing from './components/Section12SafetyBriefing';
import Footer from './components/Footer';

/* Reset Rapid Plan Form */
function handleResetPlan() {
  const [toastMessage, setToastMessage] = useState(null);

  const confirmed = confirm("⚠️ Are you sure you want to clear the entire Rapid Plan?\nUnsaved data will be lost.");

  if (confirmed) {
    localStorage.removeItem('rapidplan-draft');
    location.reload(); // Refresh app cleanly
  } else {
    setToastMessage("Plan reset canceled. Save your data before clearing.");
    setTimeout(() => setToastMessage(null), 3000);
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [addedChemicals, setAddedChemicals] = useState({ selected: '', items: [] });

  const handleStart = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <div className="splash-screen" onClick={handleStart}>
        <img src="./images/splash.png" alt="RapidPlan Splash" className="splash-image" />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main>
        <div id="export-section" className="export-section">
          {/* All main content below */}
          <Section1Incident />
          <hr className="section-divider" />
          <Section2Organization />
          <hr className="section-divider" />
          <Section3Hazard addedChemicals={addedChemicals} setAddedChemicals={setAddedChemicals} />
          <hr className="section-divider" />
          <Section4HazardMonitoring />
          <hr className="section-divider" />
          <Section5Decon />
          <hr className="section-divider" />
          <Section6Comms />
          <hr className="section-divider" />
          <Section7Medical />
          <hr className="section-divider" />
          <Section8SiteMap />
          <hr className="section-divider" />
          <Section9EntryObjectives />
          <hr className="section-divider" />
          <Section10SOPs />
          <hr className="section-divider" />
          <Section11EmergencyProcedures />
          <Section12SafetyBriefing />

          {addedChemicals.items.length > 0 && (
            <section>
              <h3 style={{ fontSize: '1.6rem', marginTop: '2rem' }}>Selected Chemicals</h3>
              {addedChemicals.items.map((chem, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                  <strong>{chem.material}</strong><br />
                  State: {chem.physicalState}, pH: {chem.pH}, IDLH: {chem.IDLH}, FP: {chem.FP}, IP: {chem.IP},<br />
                  VP: {chem.VP}, VD: {chem.VD}, SG: {chem.SG}, LEL: {chem.LEL}
                </div>
              ))}
            </section>
          )}

          <div className="export-footer" style={{ marginTop: '3rem', fontSize: '1.2rem', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '1rem', color: '#555' }}>
            <div><strong>RapidPlan v{APP_VERSION}</strong> – Incident Response App</div>
            <div>Generated on: {new Date().toLocaleString()}</div>
            <div style={{ fontStyle: 'italic', color: '#999' }}>Draft Report</div>
          </div>
        </div>

        <div className="form-actions">
          <button className="about-button download-btn" onClick={handleDownloadPDF}><i className="fa-solid fa-circle-arrow-down"></i> Download PDF</button>
          <button className="about-button download-btn" onClick={() => window.print()}><i className="fa-solid fa-print"></i> Print Report</button>
        </div>
      </main>
      <Footer version={APP_VERSION} />
    </div>
  );

  function handleDownloadPDF() {
    const element = document.getElementById('export-section');

    if (!element) {
      alert("Export section not found.");
      return;
    }

    element.style.display = 'block';
    element.style.visibility = 'visible';

    const options = {
      margin: 0.5,
      filename: 'rapidplan-report.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    setTimeout(() => {
      window.html2pdf().set(options).from(element).save();
    }, 300);
  }
}