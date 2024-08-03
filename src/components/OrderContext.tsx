// src/contexts/OrderContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { OrderModel } from '../models/OrderModel';
import { ProductModel } from '../models/ProductModel';

interface OrderContextType {
  orderedItems: OrderModel[];
  addToOrder: (product: ProductModel) => void;
  removeFromOrder: (productId: number) => void;
  calculateTotalAmount: () => number;

}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderedItems, setOrderedItems] = useState<OrderModel[]>([]);

  const addToOrder = (product: ProductModel) => {
    setOrderedItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.id 
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.amount
              } 
            : item
        );
      } else {
        const newOrderItem: OrderModel = {
          productId: product.id,
          quantity: 1,
          amount: product.price,
          total: product.price,
          product: product // Add this line

        };
        return [...prevItems, newOrderItem];
      }
    });
  };

  const removeFromOrder = (productId: number) => {
    setOrderedItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.productId === productId 
            ? { 
                ...item, 
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.amount
              } 
            : item
        );
      } else {
        return prevItems.filter(item => item.productId !== productId);
      }
    });
  };

  const calculateTotalAmount = () => {
    return orderedItems.reduce((total, item) => total + item.total, 0);
  };

  return (
    <OrderContext.Provider value={{ orderedItems, addToOrder, removeFromOrder,calculateTotalAmount }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};