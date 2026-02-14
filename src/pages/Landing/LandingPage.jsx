import React from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
    Facebook,
    Instagram,
    Twitter,
    Search,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Heart,
    GraduationCap,
    UserCog
} from 'lucide-react';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';
import logo from '@/assets/hope logo.png';
import groupImg1 from '@/assets/group image/group image.png';
import groupImg2 from '@/assets/group image/image.png';
import groupImg3 from '@/assets/group image/image copy.png';

const LandingPage = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const images = [groupImg1, groupImg2, groupImg3];

    // Auto-rotate images every 4 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleHover = (e, color) => {
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 40,
            spread: 70,
            origin: { x, y },
            colors: [color, '#ffffff', '#fbbf24'],
            zIndex: 1, // Set lower than the circle to appear "behind" or at same level
            startVelocity: 30,
            gravity: 0.8,
            ticks: 60,
            shapes: ['circle', 'square'],
            scalar: 0.7
        });
    };

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
                                    onMouseEnter={(e) => handleHover(e, '#00d1c1')}
                                >
                                    <GraduationCap size={56} strokeWidth={1.5} className="node-icon" />
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
                                    onClick={() => {
                                        const user = auth.currentUser;
                                        if (user) {
                                            const role = localStorage.getItem('userRole');
                                            if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
                                                navigate('/super-admin/dashboard');
                                            } else if (role === 'DONOR') {
                                                navigate('/donor-dashboard');
                                            } else {
                                                navigate('/login');
                                            }
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                    onMouseEnter={(e) => handleHover(e, '#fbbf24')}
                                >
                                    <UserCog size={56} strokeWidth={1.5} className="node-icon" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Group Image Section - Carousel */}
                    <motion.div
                        className="hero-media-wrap"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="media-mask">
                            <motion.div className="carousel-container">
                                {images.map((img, index) => (
                                    <motion.img
                                        key={index}
                                        src={img}
                                        alt={`HOPE3 Group ${index + 1}`}
                                        className="hero-group-image carousel-image"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: currentImageIndex === index ? 1 : 0,
                                            scale: currentImageIndex === index ? 1 : 1.1
                                        }}
                                        transition={{ duration: 0.8 }}
                                        style={{
                                            position: currentImageIndex === index ? 'relative' : 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                ))}
                            </motion.div>
                            <div className="media-overlay-effects">
                                <div className="shiny-sweep"></div>
                            </div>
                        </div>

                        {/* Carousel Navigation Dots */}
                        <div className="carousel-dots">
                            {images.map((_, index) => (
                                <motion.div
                                    key={index}
                                    className={`carousel-dot ${currentImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>

                        {/* Floating Glass Badges */}
                        <motion.div
                            className="floating-badge badge-top-left"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        >
                            <Sparkles size={16} />
                            <span>2026 cohort</span>
                        </motion.div>

                        <motion.div
                            className="floating-badge badge-bottom-right"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        >
                            <ShieldCheck size={16} />
                            <span>Impact Verified</span>
                        </motion.div>

                        {/* Decorative Icons */}
                        <div className="decor-icon icon-1"><Heart size={20} /></div>
                        <div className="decor-icon icon-2"><GraduationCap size={20} /></div>

                        <div className="media-accent-glow"></div>
                    </motion.div>

                    {/* Foundation Story Content (Bottom Area) */}
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="hero-title">
                            Bringing Creative Education into life
                        </h1>
                        <p className="hero-description">
                            HOPE3 Foundation started with the vision to empower earnest, circumstantially challenged students to realize their true potential through higher education, parallel immersive learning, one-on-one mentorship, and a powerful network of academic and industry partners.
                        </p>
                        <p className="hero-description highlight-text" style={{ marginTop: '1.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                            THE THREE PILLARS: EDUCATION, EMPOWERMENT AND ENTREPRENEURSHIP.
                        </p>

                        <div className="mobile-socials" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', opacity: 0.4 }}>
                            <Facebook size={18} className="social-icon" />
                            <Instagram size={18} className="social-icon" />
                            <Twitter size={18} className="social-icon" />
                        </div>
                    </motion.div>
                </main>

                {/* Footer Labels */}
                <div className="footer-label-wrap" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '3rem', zIndex: 10 }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#1e293b', opacity: 0.4, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Impact Portal 2026</span>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
