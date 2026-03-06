'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { CartData } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import CartItemCard from '../components/CartItemCard';
import ProgressSteps from '../components/ProgressSteps';
interface Props {
    initial: CartData;
}


export default function CartPageClient({ initial }: Props) {
    const router = useRouter();
    const { cartItems, shippingFee, subtotal, grandTotal, setCartData } = useCart();

    useEffect(() => {
        setCartData(initial);

    }, []);

    const totalSavings = initial.cartItems.reduce((sum, item) => {
        const orig = item.original_price ?? item.product_price;
        return sum + (orig - item.product_price) * item.quantity;
    }, 0);

    return (<>
        <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 40 }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                <h1
                    style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#212121',
                        marginBottom: 20,
                    }}
                >
                    Your Cart
                </h1>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 600px', minWidth: 0 }}>
                        <div className="card" style={{ padding: '8px 24px' }}>
                            {cartItems.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
                                    <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                                    <p style={{ fontSize: 16, fontWeight: 500 }}>Your cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            padding: '12px 0',
                                            borderBottom: '1px solid #eee',
                                            fontSize: 13,
                                            color: '#666',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Total items: {cartItems.reduce((s, i) => s + i.quantity, 0)}
                                    </div>
                                    {cartItems.map(item => (
                                        <CartItemCard key={item.product_id} item={item} />
                                    ))}

                                    {/* Totals below items */}
                                    <div style={{ paddingTop: 16, paddingBottom: 8 }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: 14,
                                                color: '#555',
                                                marginBottom: 8,
                                            }}
                                        >
                                            <span>Subtotal:</span>
                                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: 14,
                                                color: '#555',
                                                marginBottom: 12,
                                            }}
                                        >
                                            <span>Delivery Fee:</span>
                                            <span>₹{shippingFee}</span>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: 17,
                                                fontWeight: 800,
                                                color: '#212121',
                                                borderTop: '1px solid #eee',
                                                paddingTop: 12,
                                            }}
                                        >
                                            <span>Grand Total:</span>
                                            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>


                    </div>
                    <div style={{ width: 320, flexShrink: 0 }}>
                        {/* Pricing card */}
                        <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 14,
                                    color: '#555',
                                    marginBottom: 8,
                                }}
                            >
                                <span>Subtotal:</span>
                                <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 14,
                                    color: '#555',
                                    marginBottom: 16,
                                }}
                            >
                                <span>Delivery Fee:</span>
                                <span style={{ fontWeight: 600 }}>₹{shippingFee}</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 18,
                                    fontWeight: 800,
                                    color: '#212121',
                                    borderTop: '1px solid #eee',
                                    paddingTop: 14,
                                    marginBottom: 16,
                                }}
                            >
                                <span>Total:</span>
                                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                            </div>

                            <button
                                className="btn-eco-primary"
                                style={{ width: '100%', fontSize: 15, padding: '13px 0' }}
                                onClick={() => router.push('/checkout')}
                            >
                                Proceed to Checkout →
                            </button>

                            {/* WhatsApp */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginTop: 14,
                                    justifyContent: 'center',
                                    fontSize: 13,
                                    color: '#555',
                                    cursor: 'pointer',
                                }}
                            >


                            </div>
                        </div>

                        {/* Savings banner */}
                        {totalSavings > 0 && (
                            <div className="savings-banner" style={{ marginBottom: 16 }}>
                                <Sparkles size={22} color="#277c4e" />
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: 14, color: '#1a5c38' }}>
                                        You saved ₹{totalSavings.toLocaleString('en-IN')} in total
                                    </p>
                                    <p style={{ fontSize: 12, color: '#277c4e', marginTop: 2 }}>
                                        Great choice! You&apos;re making sustainable shopping more rewarding.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Delivery address preview */}
                        <div className="card" style={{ padding: 20 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                <span style={{ fontWeight: 700, fontSize: 14, color: '#212121' }}>
                                    Delivery address:
                                </span>
                                <Link href="/checkout">
                                    <button className="btn-eco-outline" style={{ fontSize: 12, padding: '4px 12px' }}>
                                        Change
                                    </button>
                                </Link>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 6,
                                    color: '#555',
                                    fontSize: 13,
                                }}
                            >
                                <MapPin size={14} color="#277c4e" style={{ marginTop: 2, flexShrink: 0 }} />
                                <span>Add your delivery address during checkout</span>
                            </div>
                        </div>
                    </div>




                </div>

            </div>
        </div>

    </>)



}