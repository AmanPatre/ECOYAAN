# Ecoyaan Checkout Flow MVP

This is a simplified 3-step checkout flow built as part of the Ecoyaan frontend assessment.

## 🚀 Live Demo
[Insert Vercel Link Here]

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & inline styles for quick, responsive, consistent UI.
- **State Management**: React Context API (`CartContext`). 
    - *Why Context?* For a 3-step checkout flow without complex prop-drilling, Context API is lightweight and built into React, avoiding the boilerplate and bundle size overhead of Redux.
- **Data Fetching (SSR)**: Server Components (`page.tsx`) load the mock data synchronously/statically and pass it down to Client Components (`CartPageClient.tsx`) to hydrate the initial state. This ensures zero layout shift and fast initial loads while maintaining interactivity.
- **Icons**: `lucide-react` for clean, consistent SVG iconography.

## 📱 User Flow Structure

1. **Cart Screen (`/cart`)**: Displays items fetched via SSR. Calculates subtotal, savings, shipping, and grand total. Allows quantity adjustments.
2. **Shipping Address Screen (`/checkout`)**: A multi-step form simulation with basic HTML5/Regex validation for required fields, email format, and a 10-digit phone number.
3. **Payment Method (`/payment`)**: Simulates various payment gateways (UPI, Cards, Netbanking). Displays final address and order summary.
4. **Order Success (`/success`)**: Final confirmation state.

## 💻 How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser. Navigate to `/cart` to begin the flow.

## 📝 Notes on Implementation

- To prevent build errors on deployment platforms like Vercel (where `localhost` fetches during SSR fail), the mock cart data is exported directly from a central file instead of being fetched via an HTTP `fetch()` request. This maintains the SSR pattern while ensuring robust deployment.
- The UI mimics the clean, green-themed, trust-oriented aesthetic typical of sustainable e-commerce platforms.
