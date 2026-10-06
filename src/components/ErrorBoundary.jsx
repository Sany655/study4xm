import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    try {
      localStorage.removeItem("TISHA_BOOK_CURRENT_PAGE");
    } catch {}
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'var(--book-desk, #fdf8f4)',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '540px',
            width: '100%',
            background: 'var(--page-bg, #fff)',
            border: '2px solid var(--rose-200, #fecdd3)',
            borderRadius: '16px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 12px 30px rgba(136, 19, 55, 0.1)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-ink, #1c1917)', margin: '0 0 8px' }}>
              পৃষ্ঠা প্রদর্শনে একটি সাময়িক সমস্যা হয়েছে
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted, #78716c)', marginBottom: '24px', lineHeight: 1.6 }}>
              অ্যাপটি চালু রয়েছে। নিচের বোতামে ক্লিক করে পুনরায় পৃষ্ঠাটি লোড করুন বা মূল প্রচ্ছদে ফিরে যান।
            </p>

            {this.state.error && (
              <div style={{
                textAlign: 'left',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '0.78rem',
                color: '#991b1b',
                fontFamily: 'monospace',
                marginBottom: '20px',
                overflowX: 'auto'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  fontSize: '0.92rem',
                  fontWeight: 700
                }}
              >
                <RotateCcw size={16} />
                <span>পৃষ্ঠা রিলোড করুন</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  fontSize: '0.92rem',
                  fontWeight: 700
                }}
              >
                <Home size={16} />
                <span>মূল প্রচ্ছদে ফিরে যান</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
