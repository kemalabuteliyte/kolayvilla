import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: '🏗️',
      title: 'Visual Builder',
      description: 'Design your villa with an intuitive drag-and-drop interface'
    },
    {
      icon: '🎨',
      title: 'Customizable Rooms',
      description: 'Customize every detail from electrical outlets to flooring'
    },
    {
      icon: '📐',
      title: 'Multiple Floors',
      description: 'Create villas with up to 4 floors'
    },
    {
      icon: '🏊',
      title: 'Outdoor Features',
      description: 'Add pools, gardens, terraces, and more'
    },
    {
      icon: '📋',
      title: 'Premade Templates',
      description: 'Start with professional templates and customize'
    },
    {
      icon: '💾',
      title: 'Save & Export',
      description: 'Save your design and export detailed plans'
    }
  ];

  return (
    <div className="page">
      <div className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">Design Your Dream Villa</h1>
            <p className="hero-subtitle">
              Create detailed architecture plans with our interactive visual builder.
              Customize every room, feature, and detail of your perfect home.
            </p>
            <div className="flex gap-2 justify-center" style={{ marginTop: '2rem' }}>
              <Link to="/builder" className="btn btn-primary btn-lg">
                Start Building
              </Link>
              <Link to="/templates" className="btn btn-secondary btn-lg">
                View Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem' }}>
          Everything You Need to Design Your Villa
        </h2>
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Start?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Begin with a template or create your villa from scratch
          </p>
          <Link to="/builder" className="btn btn-primary btn-lg">
            Launch Builder
          </Link>
        </div>
      </div>
    </div>
  );
}
