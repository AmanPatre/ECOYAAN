'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, User, MapPin, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>



            <header className="navbar">
                <div
                    style={{
                        maxWidth: 1280,
                        margin: '0 auto',
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                    }}
                >

                    <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #277c4e, #4caf50)',
                                    borderRadius: '50%',
                                    width: 36,
                                    height: 36,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <span style={{ color: 'white', fontSize: 18 }}>🌿</span>
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 20, color: '#277c4e', lineHeight: 1.1 }}>
                                    Ecoyaan
                                </div>
                                <div style={{ fontSize: 10, color: '#888', fontWeight: 400 }}>
                                    Sustainability made easy
                                </div>
                            </div>
                        </div>
                    </Link>





                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
                            <input
                                type="text"
                                placeholder="Search for eco-friendly products..."
                                style={{
                                    width: '100%',
                                    border: '1.5px solid #ddd',
                                    borderRadius: 24,
                                    padding: '9px 16px 9px 40px',
                                    fontSize: 14,
                                    fontFamily: 'Inter, sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    background: '#fafafa',
                                }}
                                onFocus={e => ((e.target as HTMLInputElement).style.borderColor = '#277c4e')}
                                onBlur={e => ((e.target as HTMLInputElement).style.borderColor = '#ddd')}
                            />
                            <Search
                                size={16}
                                color="#999"
                                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
                            />
                        </div>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                        <button
                            style={{
                                background: 'none',
                                border: '1.5px solid #ddd',
                                borderRadius: '50%',
                                width: 38,
                                height: 38,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                color: '#555',
                            }}
                            title="Account"
                        >
                            <User size={18} />
                        </button>
                        <button
                            style={{
                                background: 'none',
                                border: '1.5px solid #ddd',
                                borderRadius: '50%',
                                width: 38,
                                height: 38,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                color: '#555',
                            }}
                            title="Wishlist"
                        >
                            <Heart size={18} />
                        </button>
                        <Link href="/cart" style={{ textDecoration: 'none' }}>
                            <div style={{ position: 'relative' }}>
                                <button
                                    style={{
                                        background: 'none',
                                        border: '1.5px solid #277c4e',
                                        borderRadius: '50%',
                                        width: 38,
                                        height: 38,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: '#277c4e',
                                        transition: 'all 0.2s',
                                    }}
                                    title="Cart"
                                >
                                    <ShoppingCart size={18} />
                                </button>
                                {cartCount > 0 && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: -6,
                                            right: -6,
                                            background: '#277c4e',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: 18,
                                            height: 18,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
