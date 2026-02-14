import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, Home, ChevronLeft, ShieldCheck, UserCog, Heart, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/services/firebase';
import logo from '@/assets/hope logo.png';
import loginBg from '@/assets/login-bg.png';
import loginVideo from '@/assets/login-page-video.mp4';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  // Seamless Video Loop Monitoring
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video stays playing
    const handlePlay = () => {
      if (video.paused) {
        video.play().catch(() => { });
      }
    };

    // Robust resume on focus/visibility change
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        handlePlay();
      }
    };

    video.play().catch(() => { });

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handlePlay);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handlePlay);
    };
  }, []);

  // Persistent Login Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !isLoading) {
        // Find existing role from localStorage
        const storedRole = localStorage.getItem('userRole');

        if (storedRole) {
          if (storedRole === 'SUPER_ADMIN' || storedRole === 'ADMIN') {
            navigate('/super-admin/dashboard');
          } else if (storedRole === 'DONOR') {
            navigate('/donor-dashboard');
          }
        } else {
          // If role is missing but user exists, try to determine role from email
          const lowerEmail = user.email.toLowerCase();
          let role = 'DONOR';
          let path = '/donor-dashboard';

          if (lowerEmail === 'superadmin@hope3.org' || lowerEmail === 'superadmin@gmail.com') {
            role = 'SUPER_ADMIN';
            path = '/super-admin/dashboard';
          } else if (lowerEmail === 'admin@hope3.org') {
            role = 'ADMIN';
            path = '/super-admin/dashboard';
          }

          localStorage.setItem('userRole', role);
          navigate(path);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Demo credentials for testing
  const demoAccounts = [
    { role: 'Super Admin', email: 'superadmin@hope3.org', password: 'super123', color: '#ef4444', Icon: ShieldCheck },
    { role: 'Admin', email: 'admin@hope3.org', password: 'admin123', color: '#00d1c1', Icon: UserCog },
    { role: 'Donor', email: 'donor@hope3.org', password: 'donor123', color: '#fbbf24', Icon: Heart }
  ];

  const fillCredentials = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const lowerEmail = user.email.toLowerCase();

      // Determine role based on email (as per current logic)
      // Note: In production, consider using Firestore or Firebase Custom Claims for roles
      let role = 'ADMIN';
      let path = '/admin-dashboard';

      if (lowerEmail === 'superadmin@hope3.org' || lowerEmail === 'superadmin@gmail.com') {
        role = 'SUPER_ADMIN';
        path = '/super-admin/dashboard';
      } else if (lowerEmail === 'admin@hope3.org') {
        role = 'ADMIN';
        path = '/super-admin/dashboard';
      } else if (lowerEmail.includes('donor')) {
        role = 'DONOR';
        path = '/donor-dashboard';
      }

      localStorage.setItem('userRole', role);
      navigate(path);
    } catch (err) {
      console.error("Login error:", err);
      let message = "Invalid email or password. Please try again.";

      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = "Invalid email or password.";
      } else if (err.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      } else if (err.code === 'auth/too-many-requests') {
        message = "Too many failed attempts. Please try again later.";
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const lowerEmail = user.email.toLowerCase();

      // Role logic for Google Users
      let role = 'DONOR'; // Default to donor for general Google sign-ins
      let path = '/donor-dashboard';

      if (lowerEmail === 'superadmin@hope3.org' || lowerEmail === 'superadmin@gmail.com') {
        role = 'SUPER_ADMIN';
        path = '/super-admin/dashboard';
      }

      localStorage.setItem('userRole', role);
      navigate(path);
    } catch (err) {
      console.error("Google Login error:", err);
      if (err.code !== 'auth/cancelled-popup-request') {
        setError("Could not complete Google sign-in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
          muted
          loop
          playsInline
          preload="auto"
          className="bg-video"
          ref={videoRef}
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

          <div className="demo-credentials-section">
            {demoAccounts.map((account, index) => (
              <div
                key={account.role}
                className="demo-account-icon-btn"
                onClick={() => fillCredentials(account)}
                title={`${account.role}: ${account.email}`}
                style={{ '--accent-color': account.color }}
              >
                <account.Icon size={24} color={account.color} />
              </div>
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="login-error-message"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
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

            <div className="login-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="google-signin-btn"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              <span>Continue with Google</span>
            </button>
          </form>



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
          z-index: 1;
        }

        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        .illustration-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%);
          z-index: 2;
          padding: 5rem;
          display: flex;
          align-items: flex-end;
        }

        .illustration-content {
          max-width: 500px;
          color: white;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
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
          color: white;
        }

        .illustration-content p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        .login-side-form {
          flex: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
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
          margin-bottom: 1rem;
        }

        .back-to-home {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 0.8rem;
          transition: var(--transition);
        }

        .back-to-home:hover {
          color: var(--primary);
        }

        .login-logo-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.8rem;
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

        .login-error-message {
          background: #fef2f2;
          color: #ef4444;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.2rem;
          border: 1px solid #fee2e2;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
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
          margin-top: 0.5rem;
        }

        .login-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 209, 193, 0.3);
          background: #00beaf;
        }

        .login-submit-btn:active {
          transform: translateY(0);
        }

        /* Demo Credentials - Icons Row */
        .demo-credentials-section {
          margin-bottom: 1.2rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 1.2rem;
        }

        .demo-account-icon-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .demo-account-icon-btn:hover {
          transform: translateY(-3px) scale(1.1);
          border-color: var(--accent-color);
          box-shadow: 0 8px 15px rgba(0,0,0,0.1);
          background: #fff;
        }

        .demo-account-icon-btn:active {
          transform: translateY(-1px) scale(1);
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0.3rem 0;
          color: #94a3b8;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .login-divider::before,
        .login-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .google-signin-btn {
          width: 100%;
          padding: 1rem;
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          color: #475569;
        }

        .google-signin-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .google-signin-btn img {
          width: 20px;
          height: 20px;
        }

        .login-footer {
          margin-top: 1.5rem;
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
