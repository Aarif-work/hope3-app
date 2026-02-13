import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import Modal from '../../components/SuperAdmin/Modal';
import {
    Plus,
    Edit,
    Trash2,
    DollarSign,
    Briefcase
} from 'lucide-react';

const FundUsage = () => {
    const [categories, setCategories] = useState([
        { id: 1, title: 'College Fees', description: 'Covering degree fees for 45 students in professional courses.', allocatedAmount: 25000, metric: '100% Paid' },
        { id: 2, title: 'Food Support', description: 'Healthy breakfast and lunch provided 6 days a week.', allocatedAmount: 8200, metric: '2,400 Meals/mo' },
        { id: 3, title: 'Hostel & Housing', description: 'Safe accommodation for students coming from rural areas.', allocatedAmount: 12500, metric: '32 Students' },
        { id: 4, title: 'New Laptops', description: 'Essential hardware for UX, Design, and Development students.', allocatedAmount: 15000, metric: '15 High-end Units' },
        { id: 5, title: 'Study Resources', description: 'Subscriptions to premium global learning platforms.', allocatedAmount: 1850, metric: 'Global Access' },
        { id: 6, title: 'Fresh Fruits', description: 'Seasonal fresh fruits delivered daily for student energy.', allocatedAmount: 2200, metric: 'Daily Serving' },
        { id: 7, title: 'High Protein (Eggs)', description: 'Ensuring balanced protein intake for every student daily.', allocatedAmount: 1400, metric: '120 Eggs Daily' },
        { id: 8, title: 'Infrastructure', description: '24/7 Power backup, high-speed WiFi, and clean water.', allocatedAmount: 2800, metric: 'Smart Center' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', allocatedAmount: '', metric: '' });

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData(category);
        } else {
            setEditingCategory(null);
            setFormData({ title: '', description: '', allocatedAmount: '', metric: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            setCategories(categories.map(c => c.id === editingCategory.id ? { ...formData, id: c.id } : c));
        } else {
            setCategories([...categories, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const colDefs = useMemo(() => [
        { field: 'title', headerName: 'Category Title', flex: 1.2, minWidth: 180, cellStyle: { fontWeight: 600 } },
        {
            field: 'description',
            headerName: 'Description',
            flex: 2,
            minWidth: 250,
            cellStyle: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        },
        {
            field: 'allocatedAmount',
            headerName: 'Allocated Amount',
            cellRenderer: (params) => (
                <span style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>
                    ${Number(params.value).toLocaleString()}
                </span>
            )
        },
        {
            field: 'metric',
            headerName: 'Impact Metric',
            minWidth: 150,
            cellRenderer: (params) => (
                <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--admin-primary-light)',
                    color: 'var(--admin-primary)',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                }}>
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Actions',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', height: '100%' }}>
                    <button className="action-btn" onClick={() => handleOpenModal(params.data)}>
                        <Edit size={16} />
                    </button>
                    <button className="action-btn action-btn-delete" onClick={() => handleDelete(params.data.id)}>
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            width: 120,
            sortable: false,
            filter: false
        }
    ], [categories]);

    return (
        <SuperAdminLayout
            title="Fund Usage Management"
            subtitle="Manage and allocate funds across different support categories"
        >
            <div className="admin-card">
                <div className="card-header">
                    <h3 className="card-title">Usage Categories</h3>
                    <button className="admin-btn admin-btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} /> Add Category
                    </button>
                </div>
                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <AdminTable rowData={categories} colDefs={colDefs} />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="admin-grid-2-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '0' }}>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Title</label>
                            <input
                                className="admin-input"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="e.g. Food Support"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Impact Metric</label>
                            <input
                                className="admin-input"
                                value={formData.metric}
                                onChange={e => setFormData({ ...formData, metric: e.target.value })}
                                required
                                placeholder="e.g. 100% Paid"
                            />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Description</label>
                        <textarea
                            className="admin-input"
                            style={{ minHeight: '80px', padding: '0.75rem', height: 'auto' }}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="Briefly describe the purpose"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Allocated Amount ($)</label>
                        <input
                            type="number"
                            className="admin-input"
                            value={formData.allocatedAmount}
                            onChange={e => setFormData({ ...formData, allocatedAmount: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="admin-btn admin-btn-primary">
                            {editingCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </Modal>
        </SuperAdminLayout>
    );
};

export default FundUsage;
