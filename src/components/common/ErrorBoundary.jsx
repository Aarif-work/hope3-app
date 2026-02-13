import React from 'react';

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 * 
 * Safety enhancement: Prevents the entire app from crashing due to a localized UI error.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <h1 style={{ color: '#1e293b', marginBottom: '16px' }}>Oops! Something went wrong.</h1>
                    <p style={{ color: '#64748b', maxWidth: '500px', lineHeight: '1.6' }}>
                        We're sorry for the inconvenience. A technical error occurred.
                        Please try refreshing the page or contact support if the problem persists.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '24px',
                            padding: '12px 24px',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#059669'}
                        onMouseOut={(e) => e.target.style.background = '#10b981'}
                    >
                        Refresh Page
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <pre style={{
                            marginTop: '40px',
                            textAlign: 'left',
                            background: '#fee2e2',
                            color: '#991b1b',
                            padding: '20px',
                            borderRadius: '8px',
                            overflow: 'auto',
                            maxWidth: '90%'
                        }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
