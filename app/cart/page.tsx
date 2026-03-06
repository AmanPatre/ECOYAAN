import { CartData } from '../context/CartContext';
import CartPageClient from './CartPageClient';

async function getCartData(): Promise<CartData> {
    const URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const res = await fetch(`${URL}/api/cart`, { cache: "no-store" });
    if (!res.ok) throw new Error('Failed to fetch cart data');
    return res.json();



}
export default async function () {
    const cartData = await getCartData();
    return <CartPageClient initial={cartData} />
}