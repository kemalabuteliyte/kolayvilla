import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = { hasError: true, error, errorInfo };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem',
          background: 'var(--bg-main)',
          color: 'var(--text-primary)'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '3rem',
            borderRadius: '1rem',
            maxWidth: '600px',
            textAlign: 'center',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details style={{
                background: 'var(--bg-tertiary)',
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'left',
                marginBottom: '1rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Error Details
                </summary>
                <pre style={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  color: 'var(--danger)'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
