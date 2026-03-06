'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
    const router = useRouter();
    const { grandTotal, shippingAddress, cartItems } = useCart();
    const [visible, setVisible] = useState(false);

    const orderId = `ECO-${Math.floor(Math.random() * 900000 + 100000)}`;


    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const deliveryStr = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0faf0 0%, #e8f5e9 50%, #f1f8e9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
            }}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: 20,
                    boxShadow: '0 12px 48px rgba(39,124,78,0.15)',
                    padding: '48px 40px',
                    maxWidth: 560,
                    width: '100%',
                    textAlign: 'center',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
            >

                <div
                    style={{
                        width: 90,
                        height: 90,
                        background: 'linear-gradient(135deg, #277c4e, #4caf50)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: 40,
                        boxShadow: '0 8px 24px rgba(39,124,78,0.3)',
                        animation: visible ? 'scaleIn 0.5s ease 0.2s both' : 'none',
                    }}
                >
                    ✓
                </div>


                <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>

                <h1
                    style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: '#212121',
                        marginBottom: 10,
                        lineHeight: 1.3,
                    }}
                >
                    Order Placed Successfully!
                </h1>
                <p style={{ color: '#666', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
                    Thank you for choosing eco-friendly! Your order has been confirmed and is being processed.
                </p>


                <div
                    style={{
                        background: '#f8fff8',
                        border: '1.5px solid #c8e6c9',
                        borderRadius: 12,
                        padding: '20px 24px',
                        marginBottom: 24,
                        textAlign: 'left',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 16,
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <p style={{ fontSize: 11, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Order ID
                            </p>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#277c4e', marginTop: 4 }}>
                                {orderId}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: 11, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Amount Paid
                            </p>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#212121', marginTop: 4 }}>
                                ₹{grandTotal.toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>

                    {shippingAddress && (
                        <div style={{ marginBottom: 16 }}>
                            <p style={{ fontSize: 11, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Delivering To
                            </p>
                            <p style={{ fontSize: 13, color: '#444', marginTop: 4, lineHeight: 1.5 }}>
                                {shippingAddress.fullName} · {shippingAddress.city}, {shippingAddress.state}
                            </p>
                        </div>
                    )}

                    <div>
                        <p style={{ fontSize: 11, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Expected Delivery
                        </p>
                        <p style={{ fontSize: 13, color: '#277c4e', fontWeight: 700, marginTop: 4 }}>
                            {deliveryStr}
                        </p>
                    </div>
                </div>


                {cartItems.length > 0 && (
                    <div
                        style={{
                            background: '#fafafa',
                            border: '1px solid #eee',
                            borderRadius: 10,
                            padding: '14px 18px',
                            marginBottom: 24,
                            textAlign: 'left',
                        }}
                    >
                        <p style={{ fontSize: 12, color: '#888', fontWeight: 600, marginBottom: 10 }}>
                            {cartItems.reduce((s, i) => s + i.quantity, 0)} items ordered
                        </p>
                        {cartItems.map(item => (
                            <div
                                key={item.product_id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 13,
                                    color: '#555',
                                    marginBottom: 6,
                                }}
                            >
                                <span style={{ flex: 1, marginRight: 8 }}>
                                    {item.product_name} × {item.quantity}
                                </span>
                                <span style={{ fontWeight: 600, flexShrink: 0 }}>
                                    ₹{(item.product_price * item.quantity).toLocaleString('en-IN')}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button
                        className="btn-eco-primary"
                        style={{ flex: 1, minWidth: 140, fontSize: 14 }}
                        onClick={() => router.push('/cart')}
                    >
                        Continue Shopping
                    </button>
                    <button
                        className="btn-eco-outline"
                        style={{ flex: 1, minWidth: 140, fontSize: 14, padding: '12px 16px' }}
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.print();
                            }
                        }}
                    >
                        Print Receipt
                    </button>
                </div>

                <p style={{ fontSize: 12, color: '#aaa', marginTop: 20 }}>
                    A confirmation email has been sent to{' '}
                    <strong style={{ color: '#277c4e' }}>{shippingAddress?.email || 'your email'}</strong>
                </p>
            </div>

            <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
