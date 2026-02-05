import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Facebook,
    Instagram,
    Twitter,
    Play,
    Search,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/hope logo.png';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-container">
                <div className="organic-blob blob-1"></div>
                <div className="organic-blob blob-2" style={{ top: '70%', left: '10%' }}></div>
            </div>

            <div className="app-container">
                {/* Navbar with Text Brand */}
                <nav className="navbar">
                    <div className="nav-logo-group" onClick={() => navigate('/')}>
                        <div className="nav-logo">
                            <img src={logo} alt="HOPE3 Logo" />
                        </div>
                        <div className="nav-brand-text">HOPE3 Academy</div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="hero">
                    <div className="hero-dots dots-left dot-pattern" style={{ width: '100px', height: '100px' }}></div>

                    <div style={{ textAlign: 'center', marginBottom: '-2rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Our Focus</span>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.5 }}></div>
                        </div>
                    </div>

                    {/* Infographic Section (Top Area) */}
                    <div className="infographic-container">
                        {/* Node 1: Students (Green Theme) */}
                        <motion.div
                            className="info-node node-left theme-green"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="node-content text-left">
                                <h2 className="node-title">Students</h2>
                                <p className="node-desc">Empowering challenged students to realize their true potential.</p>
                            </div>
                            <div className="node-circle-wrap">
                                <div className="node-circle-bg"></div>
                                <div className="circle-pointer pointer-left"></div>
                                <motion.div
                                    className="node-main-circle"
                                    onClick={() => navigate('/apply')}
                                >
                                    <Search size={72} strokeWidth={1.5} className="node-icon" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Node 2: Others (Yellow Theme) */}
                        <motion.div
                            className="info-node node-right theme-yellow"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="node-content text-right">
                                <h2 className="node-title">Management</h2>
                                <p className="node-desc">Unified portal for administrators and donors to access their specific dashboards.</p>
                            </div>
                            <div className="node-circle-wrap">
                                <div className="node-circle-bg"></div>
                                <div className="circle-pointer pointer-right"></div>
                                <motion.div
                                    className="node-main-circle"
                                    onClick={() => navigate('/login')}
                                >
                                    <Play size={72} className="node-icon play-icon" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Foundation Story Content (Bottom Area) */}
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
                            Bringing Creative Education into life
                        </h1>
                        <p className="hero-description" style={{ fontSize: '0.95rem', lineHeight: '1.7', opacity: 0.8 }}>
                            HOPE3 Foundation started with the vision to empower earnest, circumstantially challenged students to realize their true potential through higher education, parallel immersive learning, one-on-one mentorship, and a powerful network of academic and industry partners.
                        </p>
                        <p className="hero-description" style={{ marginTop: '1.5rem', fontWeight: '800', fontSize: '1rem', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                            THE THREE PILLARS: EDUCATION, EMPOWERMENT AND ENTREPRENEURSHIP.
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', opacity: 0.4 }}>
                            <Facebook size={18} className="social-icon" />
                            <Instagram size={18} className="social-icon" />
                            <Twitter size={18} className="social-icon" />
                        </div>
                    </motion.div>
                </main>

                {/* Footer Labels */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '3rem', zIndex: 10 }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#1e293b', opacity: 0.4, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Impact Portal 2026</span>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
