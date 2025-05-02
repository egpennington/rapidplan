import { useState, useEffect } from 'react';
import { useCustomSpeechRecognition } from '../hooks/SpeechRecognition';

export default function Section9EntryObjectives() {
  const [objectives, setObjectives] = useState('');
  const [activeField, setActiveField] = useState(null);

  const {
    transcript,
    setTranscript,
    listening,
    startListening
  } = useCustomSpeechRecognition();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section9) {
      setObjectives(saved.section9);
    }
  }, []);

  useEffect(() => {
    if (!listening && transcript && activeField === 'objectives') {
      setObjectives((prev) => prev ? `${prev} ${transcript}` : transcript);
      setTranscript('');
      setActiveField(null);
    }
  }, [listening, transcript, activeField, setTranscript]);

  const handleVoiceInput = (field) => {
    setActiveField(field);
    startListening();
  };

  const handleChange = (e) => {
    setObjectives(e.target.value);
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem(
      'rapidplan-draft',
      JSON.stringify({ ...existing, section9: objectives })
    );
    alert('Entry Objectives saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section9;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setObjectives('');
    alert('Entry Objectives cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 9: Entry Objectives</h2>
      <div className="styled-fields">
        <div className="hazard-comments">
          <label htmlFor="objectives">Entry Objectives:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <textarea
              id="objectives"
              value={objectives}
              onChange={handleChange}
              className="form-input"
              rows="5"
              placeholder="Describe entry goals, known hazards, and specific areas of concern..."
            />
            <button
              type="button"
              className={`voice-btn ${listening && activeField === 'objectives' ? 'listening' : ''}`}
              onClick={() => handleVoiceInput('objectives')}
              title="Start voice input"
            >
              🎤
            </button>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}