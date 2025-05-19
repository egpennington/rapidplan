import { useState, useEffect } from 'react';

export default function Section8SiteMap() {
  const [formData, setFormData] = useState({
    checklist: {
      cp: false,
      zones: false,
      assemblyAreas: false,
      escapeRoutes: false,
      weather: false,
    },
    comments: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const maxImages = 4;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rapidplan-draft'));
    if (saved?.section8) {
        setFormData({
          checklist: {
            cp: saved.section8.checklist?.cp || false,
            zones: saved.section8.checklist?.zones || false,
            assemblyAreas: saved.section8.checklist?.assemblyAreas || false,
            escapeRoutes: saved.section8.checklist?.escapeRoutes || false,
            weather: saved.section8.checklist?.weather || false,
          },
          comments: saved.section8.comments || '',
          images: saved.section8.images || [],
        });
        setImagePreviews(saved.section8.images || []);
    }      
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [name]: checked,
      },
    }));
  };

  const handleCommentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      comments: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > maxImages) {
      alert(`Only up to ${maxImages} images allowed.`);
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const updated = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updated);
    setFormData((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const saveDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    localStorage.setItem(
      'rapidplan-draft',
      JSON.stringify({ ...existing, section8: formData })
    );
    alert('Site Map info saved.');
  };

  const clearDraft = () => {
    const existing = JSON.parse(localStorage.getItem('rapidplan-draft')) || {};
    delete existing.section8;
    localStorage.setItem('rapidplan-draft', JSON.stringify(existing));
    setFormData({
      checklist: {
        cp: false,
        zones: false,
        assemblyAreas: false,
        escapeRoutes: false,
        weather: false,
      },
      comments: '',
      images: [],
    });
    setImagePreviews([]);
    alert('Site Map info cleared.');
  };

  return (
    <section>
      <h2 className="section-heading">Section 8: Site
        <p className="site-tip">
          Take a photo of the site layout, staging area, or zone boundaries to document conditions in real time. You can also snap a whiteboard or hand-drawn sketch — all images are saved as permanent, timestamped records in your plan.
        </p>
      </h2>
      
      <p>up to 4 Site Map Images (camera supported)</p>

      <label className="custom-file-upload">
        <i className="fa-solid fa-camera" style={{ marginRight: '0.5rem' }}></i>
         Upload Site Map Images
        <input
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleImageUpload}
        />
      </label>

        {imagePreviews.length > 0 && (
          <>
            <p style={{ fontWeight: 'bold' }}>Attached Site Map Images:</p>
            <div className="site-map-preview-grid">
              {imagePreviews.map((src, index) => (
                <div key={index} className="preview-container">
                  <img src={src} alt={`Site map ${index + 1}`} />
                  <button className="remove-image-btn" onClick={() => removeImage(index)} type="button">✕</button>
                </div>
              ))}
            </div>
          </>
        )}

      <div className="styled-fields">
        <p style={{ fontWeight: 'bold' }}>Checklist for Map Assessment:</p>
        <label><input type="checkbox" name="cp" checked={formData.checklist.cp} onChange={handleCheckboxChange} /> Command Post (CP)</label>
        <label><input type="checkbox" name="zones" checked={formData.checklist.zones} onChange={handleCheckboxChange} /> Zones</label>
        <label><input type="checkbox" name="assemblyAreas" checked={formData.checklist.assemblyAreas} onChange={handleCheckboxChange} /> Assembly Areas</label>
        <label><input type="checkbox" name="escapeRoutes" checked={formData.checklist.escapeRoutes} onChange={handleCheckboxChange} /> Escape Routes</label>
        <label><input type="checkbox" name="weather" checked={formData.checklist.weather} onChange={handleCheckboxChange} /> Weather</label>

        <div className="hazard-comments">
            <label>
                Additional Notes on Site Map (optional):
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleCommentChange}
                    className="form-input"
                    rows="3"
                    placeholder="e.g., Hazmat staging on west side, no direct escape route from Zones B/D..."
                />
            </label>  
        </div>
      </div>

      <div className="form-actions">
        <button className="about-button" onClick={saveDraft}>Save Draft</button>
        <button className="close-button" onClick={clearDraft}>Clear Draft</button>
      </div>
    </section>
  );
}