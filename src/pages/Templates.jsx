import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VILLA_TEMPLATES } from '../data/villaTemplates';
import { useVillaStore } from '../store/villaStore';

export default function Templates() {
  const navigate = useNavigate();
  const loadTemplate = useVillaStore(state => state.loadTemplate);

  const handleTemplateSelect = (templateId) => {
    loadTemplate(templateId);
    navigate('/builder');
  };

  return (
    <div className="page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Villa Templates</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Choose a template to start with and customize it to your needs
          </p>
        </motion.div>

        <div className="template-grid" style={{ marginTop: '3rem' }}>
          {VILLA_TEMPLATES.map((template, index) => (
            <motion.div
              key={template.id}
              className="template-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="template-icon">{template.image}</div>
              <h3 className="template-title">{template.name}</h3>
              <p className="template-description">{template.description}</p>
              <div className="template-stats">
                <span className="badge badge-primary">
                  🏢 {template.floors} Floor{template.floors > 1 ? 's' : ''}
                </span>
                <span className="badge badge-primary">
                  📐 {template.totalArea}m²
                </span>
                <span className="badge badge-primary">
                  {template.style}
                </span>
                {template.features.pool && (
                  <span className="badge badge-success">
                    🏊 Pool
                  </span>
                )}
                {template.features.garage && (
                  <span className="badge badge-success">
                    🚗 Garage
                  </span>
                )}
              </div>
              <button
                className="btn btn-primary w-full"
                style={{ marginTop: '1rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateSelect(template.id);
                }}
              >
                Use This Template
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/builder')}
          >
            Or Start From Scratch
          </button>
        </div>
      </div>
    </div>
  );
}
