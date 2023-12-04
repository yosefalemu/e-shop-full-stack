"use client";

import { CartContextProvider } from "@/hooks/useCart";

interface CartProviderType {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderType> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
