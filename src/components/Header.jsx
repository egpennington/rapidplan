import { useState } from 'react';
import { APP_VERSION } from '/version.js';
import AboutModal from './AboutModal';

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
          <button className="about-button" onClick={() => setShowAbout(true)}>
            <i class="fa-solid fa-circle-info"></i> About
          </button>
          {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

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
    </header>
  );
}

