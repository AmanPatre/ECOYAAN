"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    label?: string;
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
    savedAddresses: ShippingAddress[];
    selectedAddressIndex: number;
    paymentMethod: string;
    setCartData: (data: CartData) => void;
    updateQuantity: (productId: number, delta: number) => void;
    setShippingAddress: (address: ShippingAddress) => void;
    addSavedAddress: (address: ShippingAddress) => void;
    removeSavedAddress: (index: number) => void;
    selectSavedAddress: (index: number) => void;
    setPaymentMethod: (method: string) => void;
    subtotal: number;
    grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function readLocalStorage<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeLocalStorage(key: string, value: unknown) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingFee, setShippingFee] = useState(50);
    const [discountApplied, setDiscountApplied] = useState(0);
    const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const storedAddresses = readLocalStorage<ShippingAddress[]>('eco_saved_addresses', []);
        const storedIndex = readLocalStorage<number>('eco_selected_address_index', -1);
        const storedPayment = readLocalStorage<string>('eco_payment_method', 'UPI');
        setSavedAddresses(storedAddresses);
        setSelectedAddressIndex(storedIndex);
        setPaymentMethod(storedPayment);
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        writeLocalStorage('eco_saved_addresses', savedAddresses);
    }, [savedAddresses, hydrated]);

    useEffect(() => {
        if (!hydrated) return;
        writeLocalStorage('eco_selected_address_index', selectedAddressIndex);
    }, [selectedAddressIndex, hydrated]);

    useEffect(() => {
        if (!hydrated) return;
        writeLocalStorage('eco_payment_method', paymentMethod);
    }, [paymentMethod, hydrated]);

    const setCartData = (data: CartData) => {
        setCartItems(data.cartItems);
        setShippingFee(data.shipping_fee);
        setDiscountApplied(data.discount_applied);
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product_id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const addSavedAddress = (address: ShippingAddress) => {
        setSavedAddresses(prev => {
            const updated = [...prev, address];
            setSelectedAddressIndex(updated.length - 1);
            return updated;
        });
    };

    const removeSavedAddress = (index: number) => {
        setSavedAddresses(prev => {
            const updated = prev.filter((_, i) => i !== index);
            if (selectedAddressIndex >= updated.length) {
                setSelectedAddressIndex(updated.length - 1);
            }
            return updated;
        });
    };

    const selectSavedAddress = (index: number) => {
        setSelectedAddressIndex(index);
    };

    const shippingAddress = selectedAddressIndex >= 0 && selectedAddressIndex < savedAddresses.length
        ? savedAddresses[selectedAddressIndex]
        : null;

    const setShippingAddress = (address: ShippingAddress) => {
        addSavedAddress(address);
    };

    const subTotal = cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
    const Total = subTotal + shippingFee - discountApplied;

    return (
        <CartContext.Provider value={{
            cartItems,
            shippingFee,
            discountApplied,
            shippingAddress,
            savedAddresses,
            selectedAddressIndex,
            paymentMethod,
            setCartData,
            updateQuantity,
            setShippingAddress,
            addSavedAddress,
            removeSavedAddress,
            selectSavedAddress,
            setPaymentMethod,
            subtotal: subTotal,
            grandTotal: Total,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
