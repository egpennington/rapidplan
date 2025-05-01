import { useState } from 'react';

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
            className="niosh-link"
          >
            <i className="fa fa-book"></i> Niosh
          </a>
        </div>
      </nav>

      {showAbout && (
        <div className="about-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={e => e.stopPropagation()}>
            <h2>About RapidPlan</h2>
            <p>RapidPlan is a mobile-first emergency response tool designed for use in hazardous materials and refinery incidents.</p>
            <p>It streamlines the Site Safety and Control Plan process, offering quick dropdowns, auto-fill chemical data, and form export options.</p>
            <button className="close-button" onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
}

