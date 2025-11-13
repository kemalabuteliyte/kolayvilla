import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const [stats, setStats] = useState({
    roomTypes: 0,
    features: 0,
    templates: 0,
    satisfied: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const targets = { roomTypes: 40, features: 100, templates: 6, satisfied: 98 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        roomTypes: Math.floor(targets.roomTypes * progress),
        features: Math.floor(targets.features * progress),
        templates: Math.floor(targets.templates * progress),
        satisfied: Math.floor(targets.satisfied * progress)
      });

      if (currentStep >= steps) {
        setStats(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: '🏗️',
      title: 'Visual Builder',
      description: 'Design your villa with an intuitive drag-and-drop interface',
      details: 'Full control over room placement, sizing, and arrangement'
    },
    {
      icon: '🎨',
      title: 'Customizable Rooms',
      description: 'Customize every detail from electrical outlets to flooring',
      details: '40+ room types with 100+ customization options'
    },
    {
      icon: '📐',
      title: 'Multiple Floors',
      description: 'Create villas with up to 4 floors',
      details: 'Independent floor design with real-time 3D preview'
    },
    {
      icon: '🏊',
      title: 'Outdoor Features',
      description: 'Add pools, gardens, terraces, and more',
      details: 'Complete outdoor space planning tools'
    },
    {
      icon: '📋',
      title: 'Premade Templates',
      description: 'Start with professional templates and customize',
      details: '6 professionally designed villa templates'
    },
    {
      icon: '💾',
      title: 'Save & Export',
      description: 'Save your design and export detailed plans',
      details: 'Auto-save, local storage, and export to JSON'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      icon: '⚙️',
      title: 'Configure Your Villa',
      description: 'Set basic parameters like number of floors, plot size, and style preferences'
    },
    {
      step: 2,
      icon: '🏗️',
      title: 'Build Floor Plans',
      description: 'Drag and drop rooms, resize them, and arrange your perfect layout'
    },
    {
      step: 3,
      icon: '✨',
      title: 'Customize Details',
      description: 'Add features like windows, doors, electrical outlets, and finishes'
    },
    {
      step: 4,
      icon: '💾',
      title: 'Save & Export',
      description: 'Save your design and export detailed architectural plans'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'This tool made designing my dream home so easy! I could visualize everything before construction.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Architect',
      content: 'Perfect for quick prototyping and client presentations. The level of detail is impressive.',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Emma Williams',
      role: 'Interior Designer',
      content: 'The customization options are endless. I use this for all my villa projects now.',
      avatar: '👩‍🎨',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Is KolayVilla free to use?',
      answer: 'Yes! KolayVilla is completely free. You can design unlimited villas and export your plans.'
    },
    {
      question: 'Can I save my designs?',
      answer: 'Absolutely! Your designs are auto-saved to your browser every 30 seconds. You can also export them as JSON files.'
    },
    {
      question: 'How many room types are available?',
      answer: 'We offer 40+ room types including bedrooms, living areas, kitchens, bathrooms, offices, and specialized spaces.'
    },
    {
      question: 'Can I customize room features?',
      answer: 'Yes! Each room has 100+ customization options including windows, doors, electrical outlets, flooring, lighting, and more.'
    },
    {
      question: 'What export formats are supported?',
      answer: 'Currently you can export your villa design as a JSON file which contains all details including room layouts, features, and specifications.'
    },
    {
      question: 'Is there a mobile version?',
      answer: 'KolayVilla works best on desktop/laptop computers for the detailed design work. Mobile support is planned for future releases.'
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page">
      {/* Hero Section */}
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

            {/* Animated Stats */}
            <div className="hero-stats">
              <div className="stat-box">
                <div className="stat-number">{stats.roomTypes}+</div>
                <div className="stat-label">Room Types</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.features}+</div>
                <div className="stat-label">Features</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.templates}</div>
                <div className="stat-label">Templates</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.satisfied}%</div>
                <div className="stat-label">Satisfied</div>
              </div>
            </div>

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

      {/* Features Section */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center section-title">
            Everything You Need to Design Your Villa
          </h2>
          <p className="text-center section-subtitle">
            Professional-grade tools for creating perfect villa plans
          </p>
        </motion.div>

        <div className="grid grid-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card card-hover feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <p className="feature-details">{feature.details}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center section-title">How It Works</h2>
            <p className="text-center section-subtitle">
              Four simple steps to create your dream villa
            </p>
          </motion.div>

          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container" style={{ marginTop: '6rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center section-title">What Our Users Say</h2>
          <p className="text-center section-subtitle">
            Trusted by homeowners, architects, and designers
          </p>
        </motion.div>

        <div className="grid grid-3" style={{ marginTop: '3rem' }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="testimonial-rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center section-title">Frequently Asked Questions</h2>
            <p className="text-center section-subtitle">
              Everything you need to know about KolayVilla
            </p>
          </motion.div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
                </div>
                {openFaq === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-box"
          >
            <h2 className="cta-title">Ready to Start Designing?</h2>
            <p className="cta-subtitle">
              Create your perfect villa in minutes with our intuitive builder
            </p>
            <div className="flex gap-2 justify-center" style={{ marginTop: '2rem' }}>
              <Link to="/builder" className="btn btn-primary btn-lg">
                Launch Builder
              </Link>
              <Link to="/templates" className="btn btn-secondary btn-lg">
                Browse Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-brand">KolayVilla</h3>
              <p className="footer-description">
                Professional villa design tool for creating detailed architecture plans with ease.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">🐦 Twitter</a>
                <a href="#" className="social-link">📘 Facebook</a>
                <a href="#" className="social-link">📸 Instagram</a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-links">
                <li><Link to="/builder">Builder</Link></li>
                <li><Link to="/templates">Templates</Link></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-links">
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#tutorials">Tutorials</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 KolayVilla. All rights reserved.</p>
            <p>Made with ❤️ for villa designers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
