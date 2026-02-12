import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, ChevronRight, ExternalLink } from 'lucide-react';

const Support = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="card-clean" style={{ padding: '2.5rem', background: 'white', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
                <HelpCircle size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Need Assistance?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Our dedicated support team is here to help you with your donations, tax receipts, or any other questions.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-premium" style={{ gap: '0.8rem' }}><Mail size={18} /> Email Us</button>
                    <button className="btn-ghost" style={{ gap: '0.8rem' }}><Phone size={18} /> Call Support</button>
                </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                    { q: "How do I download my donation receipts?", a: "You can download receipts from the 'History' tab by clicking the 'Export PDF' button next to each transaction." },
                    { q: "Can I change my monthly donation amount?", a: "Yes, you can update your recurring donation settings in the 'My Profile' section under payment methods." },
                    { q: "Is my personal information secure?", a: "We use bank-grade encryption for all transactions and never store your private financial data." }
                ].map((faq, i) => (
                    <div key={i} className="card-clean" style={{ padding: '1.5rem 2rem', background: 'white' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{faq.q}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{faq.a}</p>
                    </div>
                ))}
            </div>
            <div className="card-clean" style={{ padding: '2.5rem', background: 'white', marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Quick Links</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button className="btn-ghost" style={{ justifyContent: 'space-between', padding: '1rem 1.5rem', borderRadius: '12px' }}>
                        <span>Privacy Policy</span>
                        <ChevronRight size={18} />
                    </button>
                    <button className="btn-ghost" style={{ justifyContent: 'space-between', padding: '1rem 1.5rem', borderRadius: '12px' }}>
                        <span>Terms of Service</span>
                        <ChevronRight size={18} />
                    </button>
                    <button className="btn-ghost" style={{ justifyContent: 'space-between', padding: '1rem 1.5rem', borderRadius: '12px' }}>
                        <span>Foundation Website</span>
                        <ExternalLink size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Support;
