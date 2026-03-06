'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Tag } from 'lucide-react';
import { useCart, ShippingAddress } from '../context/CartContext';

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    pinCode?: string;
    city?: string;
    state?: string;
    addressLine?: string;
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

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, shippingFee, subtotal, grandTotal, setShippingAddress } = useCart();

    const [form, setForm] = useState<ShippingAddress>({
        fullName: '',
        email: '',
        phone: '',
        pinCode: '',
        city: '',
        state: '',
        addressLine: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

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

    const handleSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 400));
        setShippingAddress(form);
        router.push('/payment');
    };

    const handleChange = (field: keyof ShippingAddress, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 48 }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>

                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

                    <div style={{ flex: '1 1 540px', minWidth: 0 }}>
                        <div className="card" style={{ padding: 28 }}>

                            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#212121', marginBottom: 24 }}>
                                Shipping Address
                            </h2>

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

                            <button
                                className="btn-eco-primary"
                                style={{ width: '100%', marginTop: 28, padding: '14px 0', fontSize: 16 }}
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span
                                            style={{
                                                width: 16, height: 16,
                                                border: '2px solid rgba(255,255,255,0.4)',
                                                borderTopColor: 'white', borderRadius: '50%',
                                                animation: 'spin 0.7s linear infinite', display: 'inline-block',
                                            }}
                                        />
                                        Processing...
                                    </span>
                                ) : (
                                    'Proceed to Pay →'
                                )}
                            </button>
                            <p
                                style={{
                                    textAlign: 'center', fontSize: 12, color: '#999', marginTop: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                                }}
                            >
                                <ShieldCheck size={13} color="#277c4e" />
                                100% secure payments · UPI · Cards · Netbanking
                            </p>
                        </div>
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
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}