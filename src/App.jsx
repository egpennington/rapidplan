import Header from './components/Header'
import Section1Incident from './components/Section1Incident'
import Section3Hazard from './components/Section3hazard'
import Section4HazardMonitoring from './components/Section4HarzardMonitoring'
import Section5Decon from './components/Section5Decon'
import Section6Comms from './components/Section6Comms'
import Section7Medical from './components/Section7Medical'
import Section8SiteMap from './components/Section8Sitemap'
import Section9EntryObjectives from './components/Section9EntryObjectives'
import Section10SOPs from './components/Section10SOPs'
import Section11EmergencyProcedures from './components/Section11EmergencyProcedures'
import Section12Signatures from './components/Section12Signatures'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <div id="export-section" className="export-section">

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <img src="/images/logo-green.png" alt="RapidPlan Logo" style={{ height: '50px' }} />
            <div>
              <h2 style={{ margin: 0 }}>RapidPlan</h2>
              <p style={{ margin: 0, fontStyle: 'italic', color: '#444' }}>When seconds matter.</p>
            </div>
          </div>

          <Section1Incident />
          <Section3Hazard />
          <Section4HazardMonitoring />
          <Section5Decon />
          <Section6Comms />
          <Section7Medical />
          <Section8SiteMap />
          <Section9EntryObjectives />
          <Section10SOPs />
          <Section11EmergencyProcedures />
          <Section12Signatures />

          <div
            className="export-footer"
            style={{
              marginTop: '3rem',
              fontSize: '1.2rem',
              textAlign: 'center',
              borderTop: '1px solid #ccc',
              paddingTop: '1rem',
              color: '#555',
            }}
          >
            <div><strong>RapidPlan</strong> – Incident Response App</div>
            <div>Generated on: {new Date().toLocaleString()}</div>
            <div style={{ fontStyle: 'italic', color: '#999' }}>Draft Report</div>
          </div>

        </div>

        <div className="form-actions">
          <button className="about-button" onClick={handleDownloadPDF}>
            Download PDF
          </button>
          <button className="about-button" onClick={() => window.print()}>
            Print Report
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

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
      scale: 1.5,              // Lower scale to avoid blank image issues
      useCORS: true,           // Enables external image capture (local included)
      allowTaint: true,        // Allows base64 data URLs
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // Delay lets DOM and images fully render before capture
  setTimeout(() => {
    window.html2pdf().set(options).from(element).save();
  }, 300);
}