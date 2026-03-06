import { Inter } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}