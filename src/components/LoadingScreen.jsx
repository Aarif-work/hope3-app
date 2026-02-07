import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import loadingVideo from '../assets/video/loading page.mp4';
import logo from '../assets/hope logo.png';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + 2; // Slightly faster progress for video feel
            });
        }, 50);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Background Video - Fully Viewed */}
            <div className="video-background">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="loading-video"
                >
                    <source src={loadingVideo} type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>

            <div className="loading-content">
                <motion.div
                    className="loading-center-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="loading-logo-wrap"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <img src={logo} alt="HOPE3 Logo" className="loading-logo" />
                        <div className="loading-brand">
                            <span className="brand-h">HOPE3</span>
                            <span className="brand-f">Foundation</span>
                        </div>
                    </motion.div>

                    <div className="progress-container">
                        <div className="progress-track">
                            <motion.div
                                className="progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="progress-text">{progress}%</div>
                    </div>

                    <motion.p
                        className="loading-tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Building the foundation for a better tomorrow.
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
