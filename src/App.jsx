import { useState } from 'react';

import Header from './components/Header'
import Section1Incident from './components/Section1Incident'
import Section3Hazard from './components/Section3hazard'
import Section4HazardMonitoring from './components/Section4HarzardMonitoring'
import Section5Decon from './components/Section5Decon'
import Section6Comms from './components/Section6Comms'
import Section7Medical from './components/Section7Medical'
import Section8SiteMap from './components/Section8SiteMap'
import Section9EntryObjectives from './components/Section9EntryObjectives'
import Section10SOPs from './components/Section10SOPs'
import Section11EmergencyProcedures from './components/Section11EmergencyProcedures'
import Section12SafetyBriefing from './components/Section12SafetyBriefing';
import Footer from './components/Footer'

export default function App() {
  const [addedChemicals, setAddedChemicals] = useState({ selected: '', items: [] });

  function handleDownloadPDF() {
    const element = document.getElementById('export-section');
  
    if (!element) {
      alert("Export section not found.");
      return;
    }
  
    // Force redraw to prevent blank capture
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

  return (
    <div className="app-container">
      <Header />
      <main>
        <div id="export-section" className="export-section">
          <Section1Incident />
          <Section3Hazard addedChemicals={addedChemicals} setAddedChemicals={setAddedChemicals} />
          <Section4HazardMonitoring />
          <Section5Decon />
          <Section6Comms />
          <Section7Medical />
          <Section8SiteMap />
          <Section9EntryObjectives />
          <Section10SOPs />
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
        </div>

        <div className="form-actions">
          <button className="about-button download-btn" onClick={handleDownloadPDF}><i className="fa-solid fa-circle-arrow-down"></i> Download PDF</button>
          <button className="about-button download-btn" onClick={() => window.print()}><i className="fa-solid fa-print"></i> Print Report</button>
        </div>
      </main>
      <Footer />
    </div>
  );  
}