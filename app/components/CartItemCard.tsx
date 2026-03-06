'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Copy } from 'lucide-react';
import { CartItem as CartItemType } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface Props {
    item: CartItemType;
}

export default function CartItemCard({ item }: Props) {
    const { updateQuantity } = useCart();


    const savings = item.original_price
        ? (item.original_price - item.product_price) * item.quantity
        : 0;

    return (
        <div
            style={{
                display: 'flex',
                gap: 16,
                padding: '20px 0',
                borderBottom: '1px solid #f0f0f0',
                alignItems: 'flex-start',
            }}
        >






            <div
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid #eee',
                    position: 'relative',
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


            <div style={{ flex: 1, minWidth: 0 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p
                        style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: '#212121',
                            lineHeight: 1.4,
                            flex: 1,
                        }}
                    >
                        {item.product_name}
                    </p>
                    <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                        <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 2 }}
                            title="Add to Wishlist"
                        >
                            <Heart size={16} />
                        </button>
                        <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 2 }}
                            title="Copy link"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>


                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#212121' }}>
                        ₹{item.product_price.toLocaleString('en-IN')}
                    </span>
                    {item.original_price && (
                        <span style={{ fontSize: 13, color: '#999', textDecoration: 'line-through' }}>
                            ₹{item.original_price.toLocaleString('en-IN')}
                        </span>
                    )}
                    {savings > 0 && (
                        <span
                            style={{
                                fontSize: 12,
                                color: '#277c4e',
                                fontWeight: 600,
                                background: '#e8f5e9',
                                padding: '2px 8px',
                                borderRadius: 4,
                            }}
                        >
                            You Save ₹{savings.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>


                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 12,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>Qty:</span>
                        <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.product_id, -1)}
                            disabled={item.quantity <= 1}
                            style={{ opacity: item.quantity <= 1 ? 0.4 : 1 }}
                        >
                            −
                        </button>
                        <span
                            style={{
                                minWidth: 24,
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: 15,
                                color: '#212121',
                            }}
                        >
                            {item.quantity}
                        </span>
                        <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.product_id, 1)}
                        >
                            +
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
