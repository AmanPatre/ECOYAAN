'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ChevronRight, Smartphone, CreditCard, Building2, Wallet, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const UPI_APPS = [
    { name: 'PhonePe', color: '#5f259f', emoji: '📱' },
    { name: 'GPay', color: '#4285f4', emoji: '🟦' },
    { name: 'Paytm', color: '#00baf2', emoji: '🔷' },
    { name: 'BHIM', color: '#00a859', emoji: '🟩' },
];
const paymentOptions = [
    {
        id: 'upi',
        label: 'UPI',
        icon: <Smartphone size={18} />,
        badge: 'Upto 5% cashback',
        logos: ['🔵', '🟢', '🟠'],
    },
    {
        id: 'cards',
        label: 'Cards',
        icon: <CreditCard size={18} />,
        logos: ['💳', '🔴', '🔵'],
    },
    {
        id: 'netbanking',
        label: 'Netbanking',
        icon: <Building2 size={18} />,
        logos: ['🏦', '🟡', '🟢', '🔵'],
    },
    {
        id: 'wallet',
        label: 'Wallet',
        icon: <Wallet size={18} />,
        logos: ['👝', '💜', '🔵'],
    },
    {
        id: 'paylater',
        label: 'Pay Later',
        icon: <Clock size={18} />,
        logos: ['⏰'],
    },
];


export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, subtotal, grandTotal, shippingAddress, setPaymentMethod, paymentMethod } = useCart();
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [paying, setPaying] = useState(false);

    const handlePay = async () => {
        setPaying(true);
        setPaymentMethod(selectedMethod);
        await new Promise(r => setTimeout(r, 1800));
        router.push('/success');
    };

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 48 }}>
            <div style={{ height: 32 }} />
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>


                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>


                    <div style={{ flex: '1 1 520px', minWidth: 0 }}>


                        {shippingAddress && (
                            <div
                                className="card"
                                style={{
                                    padding: '18px 22px',
                                    marginBottom: 16,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    gap: 12,
                                }}
                            >
                                <div>
                                    <p style={{ fontSize: 12, color: '#888', marginBottom: 4, fontWeight: 500 }}>
                                        📍 Delivering to
                                    </p>
                                    <p style={{ fontWeight: 700, fontSize: 15, color: '#212121', marginBottom: 2 }}>
                                        {shippingAddress.fullName}
                                    </p>
                                    <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>
                                        {shippingAddress.addressLine}<br />
                                        {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                                    </p>
                                    <p style={{ fontSize: 13, color: '#555', marginTop: 2 }}>
                                        Phone: {shippingAddress.phone}
                                    </p>
                                </div>
                                <button
                                    className="btn-eco-outline"
                                    onClick={() => router.push('/checkout')}
                                    style={{ flexShrink: 0 }}
                                >
                                    Change
                                </button>
                            </div>
                        )}


                        <div className="card" style={{ overflow: 'hidden' }}>

                            <div
                                style={{
                                    padding: '16px 22px',
                                    borderBottom: '1px solid #f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    background: 'linear-gradient(135deg, #f8fff8, #f0faf0)',
                                }}
                            >
                                <span style={{ fontWeight: 800, fontSize: 16, color: '#212121' }}>
                                    Payment Options
                                </span>

                            </div>

                            <div style={{ display: 'flex', minHeight: 360 }}>

                                <div
                                    style={{
                                        width: 170,
                                        borderRight: '1px solid #f0f0f0',
                                        background: '#fafafa',
                                    }}
                                >
                                    {paymentOptions.map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSelectedMethod(opt.id)}
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                background: selectedMethod === opt.id ? 'white' : 'transparent',
                                                border: 'none',
                                                borderLeft: selectedMethod === opt.id ? '3px solid #277c4e' : '3px solid transparent',
                                                borderBottom: '1px solid #f0f0f0',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: selectedMethod === opt.id ? '#277c4e' : '#555' }}>
                                                    {opt.icon}
                                                    <span style={{ fontSize: 13, fontWeight: selectedMethod === opt.id ? 700 : 500 }}>
                                                        {opt.label}
                                                    </span>
                                                </div>
                                                {opt.badge && (
                                                    <span style={{ fontSize: 10, color: '#277c4e', display: 'block', marginTop: 2 }}>
                                                        {opt.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronRight size={14} color="#ccc" />
                                        </button>
                                    ))}
                                </div>


                                <div style={{ flex: 1, padding: 22 }}>
                                    {selectedMethod === 'upi' && (
                                        <>

                                            <div
                                                style={{
                                                    background: 'linear-gradient(135deg, #e3f2fd, #e8f5e9)',
                                                    border: '1px solid #b2dfdb',
                                                    borderRadius: 8,
                                                    padding: '10px 14px',
                                                    fontSize: 13,
                                                    color: '#1a5c38',
                                                    fontWeight: 500,
                                                    marginBottom: 18,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                }}
                                            >
                                                🎁 Get upto 5% cashback on super money UPI
                                            </div>


                                            <div
                                                style={{
                                                    border: '1.5px solid #e0e0e0',
                                                    borderRadius: 12,
                                                    padding: 20,
                                                    textAlign: 'center',
                                                    background: 'white',
                                                    marginBottom: 16,
                                                }}
                                            >
                                                <p style={{ fontSize: 12, color: '#888', marginBottom: 12, fontWeight: 500 }}>
                                                    UPI QR Code
                                                </p>

                                                <div
                                                    style={{
                                                        width: 160,
                                                        height: 160,
                                                        margin: '0 auto',
                                                        borderRadius: 8,
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        border: '1px solid #e0e0e0',
                                                    }}
                                                >
                                                    <Image
                                                        src="/QR.png"
                                                        alt="UPI QR Code"
                                                        fill
                                                        style={{ objectFit: 'contain' }}
                                                        unoptimized
                                                    />
                                                </div>


                                            </div>


                                            <div>
                                                <label className="form-label">Or enter UPI ID</label>
                                                <div style={{ display: 'flex', gap: 8 }}>
                                                    <input
                                                        className="form-input"
                                                        placeholder="yourname@upi"
                                                        value={upiId}
                                                        onChange={e => setUpiId(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn-eco-outline"
                                                        style={{ flexShrink: 0, fontSize: 13 }}
                                                    >
                                                        Verify
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {selectedMethod === 'cards' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                            <div>
                                                <label className="form-label">Card Number</label>
                                                <input className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} />
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                                <div>
                                                    <label className="form-label">Expiry (MM/YY)</label>
                                                    <input className="form-input" placeholder="MM/YY" maxLength={5} />
                                                </div>
                                                <div>
                                                    <label className="form-label">CVV</label>
                                                    <input className="form-input" placeholder="•••" maxLength={3} type="password" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="form-label">Cardholder Name</label>
                                                <input className="form-input" placeholder="Name as on card" />
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === 'netbanking' && (
                                        <div>
                                            <p style={{ fontSize: 13, color: '#555', marginBottom: 14, fontWeight: 500 }}>
                                                Select your bank:
                                            </p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                                {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak', 'PNB'].map(bank => (
                                                    <button
                                                        key={bank}
                                                        className="payment-option"
                                                        style={{ justifyContent: 'flex-start', gap: 10, fontSize: 13 }}
                                                    >
                                                        🏦 {bank}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === 'wallet' && (
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                            {['Paytm Wallet', 'PhonePe', 'Amazon Pay', 'Mobikwik'].map(w => (
                                                <button
                                                    key={w}
                                                    className="payment-option"
                                                    style={{ justifyContent: 'flex-start', gap: 10, fontSize: 13 }}
                                                >
                                                    👝 {w}
                                                </button>
                                            ))}
                                        </div>
                                    )}


                                </div>
                            </div>


                            <div style={{ padding: '18px 22px', borderTop: '1px solid #f0f0f0', background: 'white' }}>
                                <button
                                    className="btn-eco-primary"
                                    style={{ width: '100%', padding: '15px 0', fontSize: 16 }}
                                    onClick={handlePay}
                                    disabled={paying}
                                >
                                    {paying ? (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                            <span
                                                style={{
                                                    width: 18, height: 18,
                                                    border: '2px solid rgba(255,255,255,0.4)',
                                                    borderTopColor: 'white', borderRadius: '50%',
                                                    animation: 'spin 0.7s linear infinite', display: 'inline-block'
                                                }}
                                            />
                                            Processing Payment...
                                        </span>
                                    ) : (
                                        <> Pay Securely ₹{grandTotal.toLocaleString('en-IN')}</>
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>


                    <div style={{ width: 320, flexShrink: 0 }}>

                        <div
                            className="card"
                            style={{
                                padding: 22,
                                marginBottom: 16,
                                background: 'linear-gradient(135deg, #f8fff8 0%, #edfaed 100%)',
                                borderColor: '#c8e6c9',
                            }}
                        >
                            <p style={{ fontSize: 13, color: '#555', marginBottom: 4, fontWeight: 500 }}>
                                Price Summary
                            </p>
                            <p style={{ fontSize: 28, fontWeight: 900, color: '#212121', marginBottom: 16 }}>
                                ₹{grandTotal.toLocaleString('en-IN')}
                            </p>
                            <div style={{ fontSize: 13, color: '#666' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span>Shipping</span>
                                    <span>₹{shippingFee}</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontWeight: 800,
                                        fontSize: 15,
                                        borderTop: '1px dashed #bbb',
                                        paddingTop: 10,
                                        marginTop: 6,
                                        color: '#212121',
                                    }}
                                >
                                    <span>Total</span>
                                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>


                        <div className="card" style={{ padding: 22 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#212121', marginBottom: 16 }}>
                                Order Summary
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {cartItems.map(item => (
                                    <div key={item.product_id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <div
                                            style={{
                                                width: 54,
                                                height: 54,
                                                borderRadius: 8,
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                position: 'relative',
                                                border: '1px solid #eee',
                                                background: '#f5faf5',
                                            }}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.product_name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                unoptimized
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
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
