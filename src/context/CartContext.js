import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }

  function clearCart() {
    setCart([]);
  }

  function removeFromCart(indexToRemove) {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function createOrder(orderData = {}) {
    if (cart.length === 0) return false;

    const total = cart.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + item.price * quantity;
    }, 0);

    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      status: "Em preparo",
      address: orderData.address || "",
      paymentMethod: orderData.paymentMethod || "",
      total,
      createdAt: new Date().toLocaleString("pt-BR"),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);

    return true;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        clearCart,
        removeFromCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}