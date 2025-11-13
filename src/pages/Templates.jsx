import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { VILLA_TEMPLATES } from '../data/villaTemplates';
import { useVillaStore } from '../store/villaStore';

export default function Templates() {
  const navigate = useNavigate();
  const loadTemplate = useVillaStore(state => state.loadTemplate);
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleTemplateSelect = (templateId) => {
    loadTemplate(templateId);
    navigate('/builder');
  };

  // Get unique styles
  const styles = ['All', ...new Set(VILLA_TEMPLATES.map(t => t.style))];

  // Filter templates by style
  const filteredTemplates = selectedStyle === 'All'
    ? VILLA_TEMPLATES
    : VILLA_TEMPLATES.filter(t => t.style === selectedStyle);

  // Calculate room count for template
  const getRoomCount = (template) => {
    let count = 0;
    Object.values(template.rooms).forEach(floor => {
      count += floor.length;
    });
    return count;
  };

  // Get room breakdown
  const getRoomBreakdown = (template) => {
    const breakdown = {};
    Object.values(template.rooms).forEach(floor => {
      floor.forEach(room => {
        const type = room.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        breakdown[type] = (breakdown[type] || 0) + 1;
      });
    });
    return breakdown;
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="templates-header"
        >
          <h1 className="section-title text-center">Villa Templates</h1>
          <p className="section-subtitle text-center">
            Choose from our professionally designed templates and customize to your needs
          </p>

          {/* Stats Overview */}
          <div className="templates-stats">
            <div className="template-stat-item">
              <div className="template-stat-number">{VILLA_TEMPLATES.length}</div>
              <div className="template-stat-label">Templates</div>
            </div>
            <div className="template-stat-item">
              <div className="template-stat-number">{styles.length - 1}</div>
              <div className="template-stat-label">Styles</div>
            </div>
            <div className="template-stat-item">
              <div className="template-stat-number">100%</div>
              <div className="template-stat-label">Customizable</div>
            </div>
          </div>
        </motion.div>

        {/* Style Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="style-filter"
        >
          <h3 className="filter-title">Filter by Style:</h3>
          <div className="style-buttons">
            {styles.map((style, index) => (
              <motion.button
                key={style}
                className={`style-btn ${selectedStyle === style ? 'active' : ''}`}
                onClick={() => setSelectedStyle(style)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {style}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <div className="template-grid-enhanced">
          <AnimatePresence mode="wait">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                className="template-card-enhanced"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                {/* Template Image/Icon */}
                <div className="template-header">
                  <div className="template-icon-large">{template.image}</div>
                  <div className="template-badge">{template.style}</div>
                </div>

                {/* Template Info */}
                <div className="template-info">
                  <h3 className="template-title-enhanced">{template.name}</h3>
                  <p className="template-description-enhanced">{template.description}</p>

                  {/* Key Stats */}
                  <div className="template-key-stats">
                    <div className="key-stat">
                      <div className="key-stat-icon">🏢</div>
                      <div className="key-stat-info">
                        <div className="key-stat-value">{template.floors}</div>
                        <div className="key-stat-label">Floors</div>
                      </div>
                    </div>
                    <div className="key-stat">
                      <div className="key-stat-icon">🚪</div>
                      <div className="key-stat-info">
                        <div className="key-stat-value">{getRoomCount(template)}</div>
                        <div className="key-stat-label">Rooms</div>
                      </div>
                    </div>
                    <div className="key-stat">
                      <div className="key-stat-icon">📐</div>
                      <div className="key-stat-info">
                        <div className="key-stat-value">{template.totalArea}</div>
                        <div className="key-stat-label">m²</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="template-features-list">
                    {template.features.pool && (
                      <div className="feature-item">
                        <span className="feature-icon">🏊</span>
                        <span>Swimming Pool</span>
                      </div>
                    )}
                    {template.features.garage && (
                      <div className="feature-item">
                        <span className="feature-icon">🚗</span>
                        <span>Garage</span>
                      </div>
                    )}
                    {template.features.gardenArea > 0 && (
                      <div className="feature-item">
                        <span className="feature-icon">🌳</span>
                        <span>Garden ({template.features.gardenArea}m²)</span>
                      </div>
                    )}
                    {template.features.terrace && (
                      <div className="feature-item">
                        <span className="feature-icon">🏖️</span>
                        <span>Terrace</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="template-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handlePreview(template)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            <div className="no-results-icon">🏗️</div>
            <h3>No templates found</h3>
            <p>Try selecting a different style filter</p>
          </motion.div>
        )}

        {/* Start From Scratch CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="start-scratch-section"
        >
          <div className="start-scratch-card">
            <div className="start-scratch-icon">🎨</div>
            <h3>Want to design from scratch?</h3>
            <p>Create your own villa design from a blank canvas with complete freedom</p>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/builder')}
            >
              Start From Scratch
            </button>
          </div>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedTemplate && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              className="modal template-preview-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">{selectedTemplate.name}</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowPreview(false)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                {/* Template Preview Content */}
                <div className="preview-content">
                  <div className="preview-icon-section">
                    <div className="preview-icon-large">{selectedTemplate.image}</div>
                    <div className="preview-style-badge">{selectedTemplate.style}</div>
                  </div>

                  <div className="preview-details">
                    <h3>Description</h3>
                    <p>{selectedTemplate.description}</p>

                    <h3>Specifications</h3>
                    <div className="spec-grid">
                      <div className="spec-item">
                        <span className="spec-label">Floors:</span>
                        <span className="spec-value">{selectedTemplate.floors}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Total Area:</span>
                        <span className="spec-value">{selectedTemplate.totalArea}m²</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Total Rooms:</span>
                        <span className="spec-value">{getRoomCount(selectedTemplate)}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Style:</span>
                        <span className="spec-value">{selectedTemplate.style}</span>
                      </div>
                    </div>

                    <h3>Room Breakdown</h3>
                    <div className="room-breakdown">
                      {Object.entries(getRoomBreakdown(selectedTemplate)).map(([type, count]) => (
                        <div key={type} className="room-breakdown-item">
                          <span className="room-type">{type}</span>
                          <span className="room-count">×{count}</span>
                        </div>
                      ))}
                    </div>

                    <h3>Features</h3>
                    <div className="preview-features">
                      <div className="preview-feature-item">
                        <span className="preview-feature-icon">🏊</span>
                        <span>Pool: {selectedTemplate.features.pool ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="preview-feature-item">
                        <span className="preview-feature-icon">🚗</span>
                        <span>Garage: {selectedTemplate.features.garage ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="preview-feature-item">
                        <span className="preview-feature-icon">🌳</span>
                        <span>Garden: {selectedTemplate.features.gardenArea}m²</span>
                      </div>
                      {selectedTemplate.features.terrace && (
                        <div className="preview-feature-item">
                          <span className="preview-feature-icon">🏖️</span>
                          <span>Terrace: Yes</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleTemplateSelect(selectedTemplate.id);
                    setShowPreview(false);
                  }}
                >
                  Use This Template
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
