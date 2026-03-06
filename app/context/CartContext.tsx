"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    original_price?: number;

}
export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
    addressLine?: string;

}

export interface CartData {
    cartItems: CartItem[];
    shipping_fee: number;
    discount_applied: number;

}

export interface CartContextType {
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
    shippingAddress: ShippingAddress | null;
    paymentMethod: string;
    setCartData: (data: CartData) => void;
    updateQuantity: (productId: number, delta: number) => void;
    setShippingAddress: (address: ShippingAddress) => void;
    setPaymentMethod: (method: string) => void;
    subtotal: number;
    grandTotal: number;

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingFee, setShippingFee] = useState(50);
    const [discountApplied, setDiscountApplied] = useState(0);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const setCartData = (data: CartData) => {
        setCartItems(data.cartItems);
        setShippingFee(data.shipping_fee);
        setDiscountApplied(data.discount_applied);
    }

    const updateQuantity = (productId: number, delta: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product_id === productId
                    ? { ...item, quantity: item.quantity + delta }
                    : item
            )
        );
    }

    const subTotal = cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);

    const Total = subTotal + shippingFee - discountApplied;

    return (
        <CartContext.Provider value={{
            cartItems,
            shippingFee,
            discountApplied,
            shippingAddress,
            paymentMethod,
            setCartData,
            updateQuantity,
            setShippingAddress,
            setPaymentMethod,
            subtotal: subTotal,
            grandTotal: Total,
        }}>
            {children}
        </CartContext.Provider>
    )




}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
