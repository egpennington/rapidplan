import { useState } from 'react';
import { APP_VERSION } from '/version.js';

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header>
      <nav className="nav-bar">
        <img src="/images/logo-green.png" className="logo" alt="Rapid Plan R logo in green" />
        <div>
          <h1>RapidPlan</h1>
          <p>Mission focused. When seconds matter.</p>
        </div>
        <div className="nav-actions">
          <button className="about-button" onClick={() => setShowAbout(true)}><i className="fa-solid fa-magnifying-glass"></i> About</button>
          <a
            href="https://stacks.cdc.gov/view/cdc/21265/cdc_21265_DS1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="niosh-link-btn"
          >
            <i className="fa fa-book"></i> Niosh
          </a>
        </div>
      </nav>

      {showAbout && (
        <div className="about-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={e => e.stopPropagation()}>
            <h2>About RapidPlan</h2>
            <p>RapidPlan is a mobile-first emergency response tool for creating quick, accurate Site Safety and Control Plans during hazardous materials and refinery incidents.</p>
            <p>It’s designed for speed, clarity, and offline access in the field.</p>

            <h3>How to Use RapidPlan</h3>
              <ul className="about-list">
                <li>
                  <strong>Work through each section of the form</strong> (Incident Info, Organization, Hazards, etc.).<br />
                  Use dropdowns, date pickers, and typed entries to complete each part of the plan.
                </li>

                <li>
                  <strong>🎤 integrated voice recognition</strong> is available in key sections like <em>Incident Info</em> and <em>Entry Objectives</em> hands-free for greater speed and safety.<br />
                  Tap the <strong>🎤</strong> icon and speak your input hands-free.
                </li>

                <li>
                  <strong>🧪 Hazards Section:</strong><br />
                  Select chemicals from the dropdown. They auto-fill with known safety data.<br />
                  Tap <strong>×</strong> to remove a chemical from the list.
                </li>

                <li>
                  <strong>💾 Save Your Work:</strong><br />
                  Each section has a <strong>Save Draft</strong> button. Use this to save your progress locally on your device.
                </li>

                <li>
                  <strong>❌ Clear Individual Sections:</strong><br />
                  Want to change just one part of the plan? Use the <strong>Clear Draft</strong> button inside that section to reset it only.
                </li>

                <li>
                  <strong>📄 Export the Plan:</strong><br />
                  When you’re finished, tap <strong>Download PDF</strong> or <strong>Print Report</strong> at the bottom.
                </li>
              </ul>

            <h3>📱 Installing RapidPlan (Optional)</h3>
              <ul className="about-list">
                <li>
                  On your mobile device, open this site in your browser (Chrome, Safari, or Edge).
                </li>
                <li>
                  Tap the <strong>Share</strong> or <strong>Options</strong> button in your browser.
                </li>
                <li>
                  Select <strong>"Add to Home Screen"</strong> from the menu.
                </li>
                <li>
                  RapidPlan will now install like an app and be available from your home screen—even offline <em>(feature coming soon)</em>.
                </li>
              </ul>

            <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1.5rem' }}>
            <strong>Version:</strong> v{APP_VERSION}</p>
            <button className="close-button" onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
}

