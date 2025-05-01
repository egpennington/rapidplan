import Header from './components/Header'
import Section1Incident from './components/Section1Incident'
import Section3Hazard from './components/Section3hazard'
import Section4HazardMonitoring from './components/Section4HarzardMonitoring'

export default function App() {
  return (
    <>
      <Header />
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
    </>    
  )
}

function handleDownloadPDF() {
  const element = document.getElementById('export-section');

  const options = {
    margin: 0.5,
    filename: 'rapidplan-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // html2pdf is available globally if loaded from CDN
  window.html2pdf().set(options).from(element).save();
}
