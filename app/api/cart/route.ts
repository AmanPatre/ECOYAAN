import { NextResponse } from 'next/server';

const cartdata = {

    cartItems: [
        {
            product_id: 101,
            product_name: "Bamboo Toothbrush (Pack of 4)",
            product_price: 299,
            quantity: 2,
            image: "https://via.placeholder.com/150/c8e6c9/277c4e?text=Bamboo",
            original_price: 399,
        },
        {
            product_id: 102,
            product_name: "Reusable Cotton Produce Bags",
            product_price: 450,
            quantity: 1,
            image: "https://via.placeholder.com/150/c8e6c9/277c4e?text=Bags",
            original_price: 599,
        },
    ],
    shipping_fee: 50,
    discount_applied: 0,
}

export async function GET() {

    return NextResponse.json(cartdata)

}

