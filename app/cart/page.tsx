import { CartData } from '../context/CartContext';
import CartPageClient from './CartPageClient';
import { cartdata } from '../api/cart/route';

export default async function Page() {
    return <CartPageClient initial={cartdata as CartData} />
}