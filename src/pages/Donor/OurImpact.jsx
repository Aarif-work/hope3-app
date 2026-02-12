import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Heart,
    Shield,
    GraduationCap,
    Utensils,
    Home,
    Laptop,
    BookOpen,
    Apple,
    Zap,
    Droplets
} from 'lucide-react';

const OurImpact = ({ foundationData }) => {
    const fundUsage = [
        {
            title: 'College Fees',
            amount: '₹250,500',
            subtitle: 'Annual Tuition',
            desc: 'Covering degree fees for 45 students in professional courses.',
            icon: GraduationCap,
            color: '#00d1c1',
            metric: '100% Paid'
        },
        {
            title: 'Food Support',
            amount: '₹82,000',
            subtitle: 'Campus Meals',
            desc: 'Healthy breakfast and lunch provided 6 days a week.',
            icon: Utensils,
            color: '#fbbf24',
            metric: '2,400 Meals/mo'
        },
        {
            title: 'Hostel & Housing',
            amount: '₹125,000',
            subtitle: 'Safe Stay',
            desc: 'Accommodation for students coming from rural areas.',
            icon: Home,
            color: '#8b5cf6',
            metric: '32 Students'
        },
        {
            title: 'New Laptops',
            amount: '₹150,000',
            subtitle: 'Tech Assets',
            desc: 'Essential hardware for UX, Design, and Development.',
            icon: Laptop,
            color: '#3b82f6',
            metric: '15 High-end Units'
        },
        {
            title: 'Study Resources',
            amount: '₹18,500',
            subtitle: 'Learning Tools',
            desc: 'Subscriptions to premium global learning platforms.',
            icon: BookOpen,
            color: '#ec4899',
            metric: 'Global Access'
        },
        {
            title: 'Fresh Fruits',
            amount: '₹22,000',
            subtitle: 'Nutrition',
            desc: 'Seasonal fresh fruits delivered daily for energy.',
            icon: Apple,
            color: '#10b981',
            metric: 'Daily Serving'
        },
        {
            title: 'High Protein (Eggs)',
            amount: '₹14,000',
            subtitle: 'Daily Diet',
            desc: 'Ensuring balanced protein intake for every student.',
            icon: Activity,
            color: '#f59e0b',
            metric: '120 Eggs Daily'
        },
        {
            title: 'Infrastructure',
            amount: '₹28,000',
            subtitle: 'Utilities',
            desc: '24/7 Power backup, high-speed WiFi, and clean water.',
            icon: Zap,
            color: '#6366f1',
            metric: 'Smart Center'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
        >
            <div className="card-clean" style={{
                padding: window.innerWidth <= 768 ? '2rem' : '3.5rem',
                background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                marginBottom: '3.5rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: window.innerWidth <= 768 ? '1.5rem' : '2.25rem',
                        fontWeight: 900,
                        marginBottom: '1.25rem',
                        color: '#ffffff',
                        letterSpacing: '-0.02em'
                    }}>
                        Our Collective Impact
                    </h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: '1.8',
                        fontSize: window.innerWidth <= 768 ? '1rem' : '1.15rem',
                        maxWidth: '750px',
                        marginBottom: '3rem'
                    }}>
                        Transforming lives through a <strong style={{ color: '#00d1c1' }}>100% free education model</strong>.
                        Every rupee you donate directly funds student success, from high-end tech to daily nutrition.
                    </p>

                    <div style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        display: 'grid',
                        maxWidth: '600px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1rem 1.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(0,209,193,0.1)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(0,209,193,0.2)'
                            }}>
                                <Shield size={24} color="#00d1c1" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Transparent</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>100% Direct Channel</p>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1rem 1.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(239,68,68,0.1)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(239,68,68,0.2)'
                            }}>
                                <Heart size={24} color="#ef4444" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Compassionate</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Student-First Approach</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0,209,193,0.08) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '20%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Activity size={24} color="#00d1c1" /> Current Fund Usage
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {fundUsage.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="card-clean"
                        style={{
                            padding: '2rem',
                            background: 'white',
                            border: '1px solid rgba(0,0,0,0.04)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                color: item.color,
                                background: `${item.color}15`,
                                width: '56px', height: '56px',
                                borderRadius: '16px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <item.icon size={28} />
                            </div>
                            <span style={{
                                padding: '0.4rem 0.8rem',
                                background: '#f8fafc',
                                borderRadius: '50px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                color: '#64748b',
                                border: '1px solid #f1f5f9'
                            }}>
                                {item.metric}
                            </span>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                                {item.subtitle}
                            </div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>{item.title}</h4>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: '0.5rem 0' }}>{item.amount}</div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>{item.desc}</p>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                            Verified Allocation
                        </div>
                    </motion.div>
                ))}
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem', color: '#1e293b' }}>Foundation Milestones</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {[
                    { title: 'Students Enrolled', value: '120+', desc: 'Active students pursuing various professional degrees.' },
                    { title: 'Graduate Success', value: '85%', desc: 'Alumni who secured jobs within 6 months of graduation.' },
                    { title: 'Infrastructure', value: '2 Centers', desc: 'Fully equipped learning centers with computing labs.' }
                ].map((impact, i) => (
                    <div key={i} className="card-clean" style={{ padding: '2.5rem', background: 'white', borderBottom: '4px solid var(--primary)' }}>
                        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><Activity size={32} /></div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>{impact.title}</h4>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1e293b', marginBottom: '0.75rem' }}>{impact.value}</div>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>{impact.desc}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default OurImpact;
