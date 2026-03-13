'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Tag, Plus, MapPin, Trash2, CheckCircle2, ChevronLeft, ArrowRight, Edit2 } from 'lucide-react';
import { useCart, ShippingAddress } from '../context/CartContext';

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    pinCode?: string;
    city?: string;
    state?: string;
    addressLine?: string;
    label?: string;
}

interface InputFieldProps {
    label: string;
    field: keyof ShippingAddress;
    type?: string;
    placeholder?: string;
    maxLength?: number;
    value: string;
    error?: string;
    onChange: (field: keyof ShippingAddress, value: string) => void;
}

function InputField({ label, field, type = 'text', placeholder, maxLength, value, error, onChange }: InputFieldProps) {
    return (
        <div>
            <label className="form-label">
                {label} <span style={{ color: '#e53935' }}>*</span>
            </label>
            <input
                type={type}
                className={`form-input${error ? ' error' : ''}`}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={e => onChange(field, e.target.value)}
            />
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

const INDIAN_STATES = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal',
];

const ADDRESS_LABELS = ['Home', 'Work', 'Other'];

const emptyForm: ShippingAddress = {
    fullName: '',
    email: '',
    phone: '',
    pinCode: '',
    city: '',
    state: '',
    addressLine: '',
    label: 'Home',
};

export default function CheckoutPage() {
    const router = useRouter();
    const {
        cartItems, shippingFee, subtotal, grandTotal,
        savedAddresses, selectedAddressIndex,
        addSavedAddress, removeSavedAddress, selectSavedAddress
    } = useCart();

    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [form, setForm] = useState<ShippingAddress>(emptyForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (savedAddresses.length === 0) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    }, [savedAddresses.length]);

    const validate = (): boolean => {
        const errs: FormErrors = {};
        if (!form.fullName.trim()) errs.fullName = 'Full name is required';
        if (!form.email.trim()) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = 'Enter a valid email address';
        }
        if (!form.phone.trim()) {
            errs.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
            errs.phone = 'Enter a valid 10-digit Indian mobile number';
        }
        if (!form.pinCode.trim()) {
            errs.pinCode = 'PIN code is required';
        } else if (!/^\d{6}$/.test(form.pinCode)) {
            errs.pinCode = 'PIN code must be 6 digits';
        }
        if (!form.city.trim()) errs.city = 'City is required';
        if (!form.state.trim()) errs.state = 'State is required';
        if (!form.addressLine?.trim()) errs.addressLine = 'Address is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSaveAddress = () => {
        if (!validate()) return;
        if (editingIndex !== null) {
            const updated = [...savedAddresses];
            updated[editingIndex] = form;
            removeSavedAddress(editingIndex);
            addSavedAddress(form);
            selectSavedAddress(editingIndex);
        } else {
            addSavedAddress(form);
        }
        setForm(emptyForm);
        setErrors({});
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleEditAddress = (index: number) => {
        setForm(savedAddresses[index]);
        setEditingIndex(index);
        setShowForm(true);
        setErrors({});
    };

    const handleCancelForm = () => {
        setForm(emptyForm);
        setErrors({});
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleSubmit = async () => {
        if (selectedAddressIndex < 0 || selectedAddressIndex >= savedAddresses.length) return;
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 400));
        router.push('/payment');
    };

    const handleChange = (field: keyof ShippingAddress, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const canProceed = selectedAddressIndex >= 0 && selectedAddressIndex < savedAddresses.length && !showForm;

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 96 }}>
            <div style={{ height: 32 }} />
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>

                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>


                    <div style={{ flex: '1 1 540px', minWidth: 0 }}>


                        {savedAddresses.length > 0 && !showForm && (
                            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                    <h2 style={{ fontSize: 17, fontWeight: 800, color: '#212121' }}>
                                        Saved Addresses
                                    </h2>
                                    <button
                                        onClick={() => { setShowForm(true); setEditingIndex(null); setForm(emptyForm); setErrors({}); }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            background: 'var(--eco-green-light)', color: 'var(--eco-green)',
                                            border: '1.5px solid var(--eco-green)', borderRadius: 8,
                                            padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <Plus size={14} /> Add New Address
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {savedAddresses.map((addr, idx) => {
                                        const isSelected = selectedAddressIndex === idx;
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => selectSavedAddress(idx)}
                                                style={{
                                                    border: `2px solid ${isSelected ? 'var(--eco-green)' : '#e0e0e0'}`,
                                                    borderRadius: 10,
                                                    padding: '14px 16px',
                                                    cursor: 'pointer',
                                                    background: isSelected ? 'var(--eco-green-light)' : 'white',
                                                    transition: 'all 0.2s',
                                                    position: 'relative',
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                                    <div style={{ marginTop: 2 }}>
                                                        {isSelected
                                                            ? <CheckCircle2 size={18} color="var(--eco-green)" />
                                                            : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #ccc' }} />
                                                        }
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                            <span style={{ fontSize: 14, fontWeight: 700, color: '#212121' }}>{addr.fullName}</span>
                                                            {addr.label && (
                                                                <span style={{
                                                                    fontSize: 10, fontWeight: 700,
                                                                    background: isSelected ? 'var(--eco-green)' : '#eee',
                                                                    color: isSelected ? 'white' : '#666',
                                                                    borderRadius: 4, padding: '2px 7px',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px',
                                                                }}>
                                                                    {addr.label}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>
                                                            {addr.addressLine}, {addr.city}, {addr.state} - {addr.pinCode}
                                                        </p>
                                                        <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                                                            {addr.phone} &nbsp;·&nbsp; {addr.email}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                                        <button
                                                            onClick={e => { e.stopPropagation(); handleEditAddress(idx); }}
                                                            style={{
                                                                width: 30, height: 30, borderRadius: 6, border: '1px solid #e0e0e0',
                                                                background: 'white', cursor: 'pointer', display: 'flex',
                                                                alignItems: 'center', justifyContent: 'center', color: '#555',
                                                                transition: 'all 0.15s',
                                                            }}
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={13} />
                                                        </button>
                                                        <button
                                                            onClick={e => { e.stopPropagation(); removeSavedAddress(idx); }}
                                                            style={{
                                                                width: 30, height: 30, borderRadius: 6, border: '1px solid #fecdd3',
                                                                background: '#fff5f5', cursor: 'pointer', display: 'flex',
                                                                alignItems: 'center', justifyContent: 'center', color: '#e53935',
                                                                transition: 'all 0.15s',
                                                            }}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}


                        {showForm && (
                            <div className="card" style={{ padding: 28, marginBottom: 16 }}>
                                <h2 style={{ fontSize: 17, fontWeight: 800, color: '#212121', marginBottom: 20 }}>
                                    {editingIndex !== null ? 'Edit Address' : 'Add New Address'}
                                </h2>


                                <div style={{ marginBottom: 18 }}>
                                    <label className="form-label">Address Type</label>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {ADDRESS_LABELS.map(lbl => (
                                            <button
                                                key={lbl}
                                                type="button"
                                                onClick={() => handleChange('label', lbl)}
                                                style={{
                                                    padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                                                    border: `1.5px solid ${form.label === lbl ? 'var(--eco-green)' : '#ddd'}`,
                                                    background: form.label === lbl ? 'var(--eco-green-light)' : 'white',
                                                    color: form.label === lbl ? 'var(--eco-green)' : '#666',
                                                    cursor: 'pointer', transition: 'all 0.15s',
                                                }}
                                            >
                                                {lbl}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                    <InputField
                                        label="Full Name"
                                        field="fullName"
                                        placeholder="Enter your full name"
                                        value={form.fullName}
                                        error={errors.fullName}
                                        onChange={handleChange}
                                    />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <InputField
                                            label="Email Address"
                                            field="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={form.email}
                                            error={errors.email}
                                            onChange={handleChange}
                                        />
                                        <InputField
                                            label="Phone Number"
                                            field="phone"
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            maxLength={10}
                                            value={form.phone}
                                            error={errors.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <InputField
                                        label="Full Address"
                                        field="addressLine"
                                        placeholder="House / Flat no., Street, Colony"
                                        value={form.addressLine || ''}
                                        error={errors.addressLine}
                                        onChange={handleChange}
                                    />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                        <InputField
                                            label="PIN Code"
                                            field="pinCode"
                                            placeholder="6-digit PIN"
                                            maxLength={6}
                                            value={form.pinCode}
                                            error={errors.pinCode}
                                            onChange={handleChange}
                                        />
                                        <InputField
                                            label="City"
                                            field="city"
                                            placeholder="City"
                                            value={form.city}
                                            error={errors.city}
                                            onChange={handleChange}
                                        />
                                        <div>
                                            <label className="form-label">
                                                State <span style={{ color: '#e53935' }}>*</span>
                                            </label>
                                            <select
                                                className={`form-input${errors.state ? ' error' : ''}`}
                                                value={form.state}
                                                onChange={e => handleChange('state', e.target.value)}
                                            >
                                                <option value="">Select state</option>
                                                {INDIAN_STATES.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            {errors.state && <p className="form-error">{errors.state}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                    <button
                                        onClick={handleSaveAddress}
                                        className="btn-eco-primary"
                                        style={{ flex: 1, padding: '13px 0', fontSize: 15 }}
                                    >
                                        {editingIndex !== null ? '✓ Update Address' : '✓ Save Address'}
                                    </button>
                                    {savedAddresses.length > 0 && (
                                        <button
                                            onClick={handleCancelForm}
                                            style={{
                                                padding: '13px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                                                border: '1.5px solid #ddd', background: 'white', color: '#666',
                                                cursor: 'pointer', transition: 'all 0.2s',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}


                        {savedAddresses.length === 0 && !showForm && (
                            <div
                                className="card"
                                style={{ padding: 48, textAlign: 'center', marginBottom: 16 }}
                            >
                                <MapPin size={36} color="#ccc" style={{ margin: '0 auto 12px' }} />
                                <p style={{ fontSize: 15, fontWeight: 600, color: '#888', marginBottom: 6 }}>
                                    No saved addresses yet
                                </p>
                                <p style={{ fontSize: 13, color: '#aaa', marginBottom: 20 }}>
                                    Add a delivery address to continue
                                </p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="btn-eco-primary"
                                    style={{ padding: '10px 24px' }}
                                >
                                    <Plus size={15} /> Add Address
                                </button>
                            </div>
                        )}
                    </div>


                    <div style={{ width: 320, flexShrink: 0 }}>
                        <div className="card" style={{ padding: 22 }}>
                            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#212121', marginBottom: 18 }}>
                                Order Summary
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
                                {cartItems.map(item => (
                                    <div key={item.product_id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <div
                                            style={{
                                                width: 56, height: 56, borderRadius: 8, overflow: 'hidden',
                                                flexShrink: 0, position: 'relative', border: '1px solid #eee', background: '#f5faf5',
                                            }}
                                        >
                                            <Image
                                                src={item.image} alt={item.product_name}
                                                fill style={{ objectFit: 'cover' }} unoptimized
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 12, color: '#212121', fontWeight: 500, lineHeight: 1.4 }}>
                                                {item.product_name}
                                            </p>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#277c4e', marginTop: 4 }}>
                                                ₹{item.product_price.toLocaleString('en-IN')} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                style={{
                                    border: '1px solid #e0e0e0', borderRadius: 8, padding: '12px 14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    cursor: 'pointer', marginBottom: 18, transition: 'background 0.2s',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Tag size={16} color="#277c4e" />
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#277c4e' }}>
                                        Offers &amp; Coupons
                                    </span>
                                </div>
                                <span style={{ color: '#aaa', fontSize: 18 }}>›</span>
                            </div>

                            <div style={{ borderTop: '1px solid #eee', paddingTop: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#555', marginBottom: 8 }}>
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#555', marginBottom: 16 }}>
                                    <span>Shipping</span>
                                    <span>₹{shippingFee}</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: 17, fontWeight: 800, color: '#212121',
                                        borderTop: '1.5px solid #eee', paddingTop: 12,
                                    }}
                                >
                                    <span>You Pay</span>
                                    <span style={{ color: '#277c4e' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderTop: '1px solid #e0e0e0',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
                    zIndex: 50,
                    padding: '14px 24px',
                }}
            >
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 12 }}>
                        <ShieldCheck size={14} color="#277c4e" />
                        <span>100% secure · UPI · Cards · Netbanking</span>
                    </div>


                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            onClick={() => router.back()}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '11px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                                border: '1.5px solid #ddd', background: 'white', color: '#555',
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>
                        <button
                            className="btn-eco-primary"
                            style={{ padding: '11px 24px', fontSize: 15, opacity: canProceed ? 1 : 0.55, cursor: canProceed ? 'pointer' : 'not-allowed' }}
                            onClick={handleSubmit}
                            disabled={!canProceed || submitting}
                        >
                            {submitting ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span
                                        style={{
                                            width: 15, height: 15,
                                            border: '2px solid rgba(255,255,255,0.4)',
                                            borderTopColor: 'white', borderRadius: '50%',
                                            animation: 'spin 0.7s linear infinite', display: 'inline-block',
                                        }}
                                    />
                                    Processing...
                                </span>
                            ) : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    Next Step <ArrowRight size={16} />
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}