import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import groupImage from '../assets/group image/group image.png';
import logo from '../assets/hope logo.png';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="loading-bg-layers">
                <div className="loading-blob blob-1"></div>
                <div className="loading-blob blob-2"></div>
            </div>

            <div className="loading-content">
                <motion.div
                    className="loading-image-container"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <img src={groupImage} alt="HOPE3 Foundation" className="loading-group-img" />
                    <div className="image-overlay-gradient"></div>
                </motion.div>

                <div className="loading-footer-content">
                    <motion.div
                        className="loading-logo-wrap"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
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
                        transition={{ delay: 0.8 }}
                    >
                        Building the foundation for a better tomorrow.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
