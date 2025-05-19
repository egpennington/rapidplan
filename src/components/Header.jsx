import { useState } from 'react';
import { APP_VERSION } from '/version.js';
import AboutModal from './AboutModal';

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);
  const [aboutView, setAboutView] = useState('about')

  return (
    <header>
      <nav className="nav-bar">
        <img src="/images/logo-green.png" className="logo" alt="Rapid Plan R logo in green" />
        <div>
          <h1>RapidPlan</h1>
          <p>Mission focused. When seconds matter.</p>
        </div>
        <div className="nav-actions">
          <button
            className="about-button about"
            onClick={() => {
              setAboutView('about');
              setShowAbout(true);
            }}
          >
            <i className="fa-solid fa-circle-info"></i> About
          </button>

          <button
            className="about-button"
            onClick={() => {
              setAboutView('howto');
              setShowAbout(true);
            }}
          >
            <i className="fa-solid fa-book-open-reader"></i> How to
          </button>

          {showAbout && (
            <AboutModal
              onClose={() => setShowAbout(false)}
              initialView={aboutView}
            />
          )}
        </div>

      </nav>
    </header>
  );
}

