import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Home, ChevronLeft } from 'lucide-react';
import logo from '@/assets/hope logo.png';
import loginBg from '@/assets/login-bg.png';
import loginVideo from '@/assets/login-page-video.mp4';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials for testing
  const demoAccounts = [
    { role: 'Super Admin', email: 'superadmin@hope3.org', password: 'super123', color: '#ef4444' },
    { role: 'Admin', email: 'admin@hope3.org', password: 'admin123', color: '#00d1c1' },
    { role: 'Donor', email: 'donor@hope3.org', password: 'donor123', color: '#fbbf24' }
  ];

  const fillCredentials = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Artificial delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerEmail = email.toLowerCase();

    // Reset permissions
    localStorage.removeItem('userRole');

    if ((lowerEmail === 'superadmin@hope3.org' || lowerEmail === 'superadmin@gmail.com') && password === 'super123') {
      localStorage.setItem('userRole', 'SUPER_ADMIN');
      navigate('/super-admin/dashboard');
    } else if (lowerEmail === 'admin@hope3.org' && password === 'admin123') {
      localStorage.setItem('userRole', 'ADMIN');
      navigate('/super-admin/dashboard'); // Redirect to same dashboard, but sidebar will be filtered
    } else if (lowerEmail.includes('donor')) {
      localStorage.setItem('userRole', 'DONOR');
      navigate('/donor-dashboard');
    } else {
      // Fallback/Legacy
      localStorage.setItem('userRole', 'ADMIN');
      navigate('/admin-dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-side-illustration">
        <div className="illustration-overlay">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="illustration-content"
          >
            <div className="illustration-tag">Portal Access</div>
            <h1>Empowering Future Leaders.</h1>
            <p>Access your workspace and continue building the foundation for a better tomorrow.</p>
          </motion.div>
        </div>
        <video
          src={loginVideo}
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
        />
      </div>

      <div className="login-side-form">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="login-form-container"
        >
          <div className="login-header">
            <div className="back-to-home" onClick={() => navigate('/')}>
              <ChevronLeft size={18} />
              <span>Back to Site</span>
            </div>
            <div className="login-logo-group">
              <img src={logo} alt="HOPE3 Logo" className="login-logo" />
              <div className="login-brand-text">HOPE3 Academy</div>
            </div>
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Work Email</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hope3.org"
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`login-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials - Text Only */}
          <div className="demo-credentials-section">
            {demoAccounts.map((account, index) => (
              <div
                key={account.role}
                className="demo-account-text"
                onClick={() => fillCredentials(account)}
              >
                {account.email} / {account.password}
              </div>
            ))}
          </div>

          <div className="login-footer">
            <p>Are you a student? <span onClick={() => navigate('/apply')}>Start Application</span></p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .login-page-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background: #fff;
          overflow: hidden;
        }

        .login-side-illustration {
          flex: 7;
          position: relative;
          background: #f8fafc;
          display: none;
        }

        @media (min-width: 1024px) {
          .login-side-illustration {
            display: block;
          }
        }

        .bg-video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
        }

        .illustration-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
          z-index: 2;
          padding: 5rem;
          display: flex;
          align-items: flex-end;
        }

        .illustration-content {
          max-width: 500px;
          color: #1e293b;
          text-shadow: 0 2px 10px rgba(255,255,255,1);
        }

        .illustration-tag {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--primary);
          color: white;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 20px rgba(0, 209, 193, 0.2);
        }

        .illustration-content h1 {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.04em;
          color: #111827;
        }

        .illustration-content p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #475569;
          font-weight: 600;
        }

        .login-side-form {
          flex: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: white;
          position: relative;
          z-index: 10;
          border-left: 1px solid #f1f5f9;
          overflow: hidden;
        }

        .login-side-form::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url(${loginBg});
          background-size: cover;
          background-position: center;
          filter: blur(3px); /* 10% Blur effect */
          opacity: 0.12;
          z-index: -1;
          transform: scale(1.05); /* Minimal scale for light blur */
        }

        .login-form-container {
          width: 100%;
          max-width: 440px;
        }

        .login-header {
          margin-bottom: 2rem;
        }

        .back-to-home {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: var(--transition);
        }

        .back-to-home:hover {
          color: var(--primary);
        }

        .login-logo-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .login-logo {
          height: 38px;
        }

        .login-brand-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          font-weight: 850;
          color: #111827;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .login-header h2 {
          font-size: 2rem;
          font-weight: 900;
          color: #111827;
          margin-bottom: 0.3rem;
          letter-spacing: -0.03em;
        }

        .login-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-pass-link {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          cursor: pointer;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          transition: var(--transition);
        }

        .input-with-icon input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .input-with-icon input:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(0, 209, 193, 0.1);
        }

        .input-with-icon input:focus + .input-icon {
          color: var(--primary);
        }

        .form-options {
          display: flex;
          align-items: center;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 28px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: #64748b;
          user-select: none;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 18px;
          width: 18px;
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
        }

        .checkbox-container:hover input ~ .checkmark {
          background-color: #e2e8f0;
        }

        .checkbox-container input:checked ~ .checkmark {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        .checkbox-container .checkmark:after {
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .login-submit-btn {
          width: 100%;
          padding: 1.1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(0, 209, 193, 0.2);
          margin-top: 1rem;
        }

        .login-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 209, 193, 0.3);
          background: #00beaf;
        }

        .login-submit-btn:active {
          transform: translateY(0);
        }

        }

        /* Demo Credentials - Text Only */
        .demo-credentials-section {
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .demo-account-text {
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease;
          text-align: center;
          font-family: 'Courier New', monospace;
        }

        .demo-account-text:hover {
          opacity: 0.7;
          text-decoration: underline;
        }

        .login-footer {
          margin-top: 3rem;
          text-align: center;
        }

        .login-footer p {
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .login-footer span {
          color: var(--primary);
          font-weight: 700;
          cursor: pointer;
          margin-left: 0.2rem;
          transition: var(--transition);
        }

        .login-footer span:hover {
          text-decoration: underline;
        }

        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
