import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const cartdata = {

    cartItems: [
        {
            product_id: 101,
            product_name: "Bamboo Toothbrush (Pack of 4)",
            product_price: 299,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1589365252845-092198ba5334?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            original_price: 399,
        },
        {
            product_id: 102,
            product_name: "Reusable Cotton Produce Bags",
            product_price: 450,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1634640872379-a5f9f335c835?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            original_price: 599,
        },
    ],
    shipping_fee: 50,
    discount_applied: 0,
}

export async function GET() {

    return NextResponse.json(cartdata)

}

