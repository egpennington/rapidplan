import { useState } from 'react';
import { APP_VERSION } from '/version.js';
import Toast from './Toast';

export default function AboutModal({ onClose }) {
  const [view, setView] = useState('about');

  return (
    <div className="about-overlay" onClick={onClose}>
      <div className="about-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{view === 'about' ? 'About RapidPlan: ' : 'How to Use RapidPlan'}</h2>

        {view === 'about' && (
          <>
            <p><img src="/images/logo-green.png" className="logo-sm" alt="Rapid Plan R logo in green" /><strong>RapidPlan</strong> is a mobile-first emergency response tool for creating fast, accurate Site Safety and Control Plans during hazardous materials and refinery incidents.</p>
            <p><strong>📋 Based on ICS 208 Guidelines</strong></p>
            <p>Designed for clarity and speed in the field, RapidPlan features quick dropdowns, pre-filled chemical hazard data, and export-ready reports.</p>
            <p>Now featuring <strong>voice recognition</strong> in key fields like incident name and entry objectives—allowing hands-free input in critical moments.</p>
            <p><em>Offline access</em> and installable app capabilities are coming soon.</p>

            <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1.5rem' }}><strong>Version:</strong> v{APP_VERSION}</p>
          </>
        )}

        {view === 'howto' && (
          <>                
            <p><em>Each section can be independently saved, allowing responders to input and review data without affecting the rest of the plan.</em></p><br />
            <ul className="about-list">              
              <li>
                <strong>Incident Info (Section 1):</strong> Enter the name, location, and operational period of the incident.<br />
                <em>Tip:</em> You can use <strong>🎤 voice input</strong> for both the incident name and location.<br />
                <em>Note:</em> Date and Time auto-fill when you open Section 1, and are saved only when you tap <strong>Save Draft</strong>.
              </li>

              <li>
                <strong>Organization (Section 2):</strong> Assign roles for Incident Command, Supervisors, Entry Team, Decon Team, and PPE level required.
              </li>
              <li>
                <strong>Hazard & Chemical Selection (Section 3):</strong> Select up to 4 known materials from the top 30 most common refinery chemicals. View hazard info like pH, IDLH, FP, etc. Use ❌ to remove individual chemical.
                <p className="about-footnote">
                    Based on OSHA, EPA Tier II reporting, and industry guidelines (API, NFPA 472, CHEMTREC, FEMA), this list covers over 90% of chemicals responders typically encounter in refinery incidents.
                </p>
              </li>
              <li>
                <strong>Hazard Monitoring (Section 4):</strong> Select instruments used (e.g., MultiRae, heat gun, radiation meter).
              </li>
              <li>
                <strong>Decontamination (Section 5):</strong> Specify if standard procedures are followed. Add notes if any are modified.
              </li>
              <li>
                <strong>Communications (Section 6):</strong> Enter radio channels/frequency(ies).
              </li>
              <li>
                <strong>Medical (Section 7):</strong> Indicate medical access and special instructions.
              </li>
              <li>
                <strong>Site Map (Section 8):</strong> 📷 Upload up to 4 photos of the site layout, including zones, staging, or access routes.<br />
                <small>Drawing in the app is not supported — but you can sketch on paper or a whiteboard and snap a photo.</small>
              </li>
              <li>
                <strong>Entry Objectives (Section 9):</strong> List all objectives to be performed by the Entry Team in  Exclusion Zone and any parameters which will alter or stop entry operations.
              </li>
              <li>
                <strong>SOPs & Emergencies (Section 10–11):</strong> List safe work practices and note any changes during abnormal conditions.
              </li>
              <li>
                <strong>Safety Briefing (Section 12):</strong> The responder confirms the safety plan by checking the acknowledgment box and entering their name.<br />
                <small>Date and time are auto-filled when this section is opened, and saved when you tap <strong>Save Draft</strong>.</small>
              </li>
            </ul>
          </>
        )}

        <div className="modal-buttons">
          <button
            className="about-button"
            onClick={() => setView(view === 'about' ? 'howto' : 'about')}
          >
            {view === 'about' ? (
                <>
                    <i className="fa-solid fa-book-open-reader" style={{ marginRight: '0.5rem' }}></i>
                    How to Use RapidPlan
                </>
                ) : (
                <>
                    <i className="fa-solid fa-circle-info" style={{ marginRight: '0.5rem' }}></i>
                    About RapidPlan
                </>
            )}
          </button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}