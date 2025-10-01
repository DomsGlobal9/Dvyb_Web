import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // All orders

  // Add new order
  const addOrder = (order) => {
    const newOrder = {
      id: '#' + uuidv4().slice(0, 8),
      date: new Date().toLocaleString(),
      status: 'Active', // default status on order creation
      paymentMethod: order.paymentMethod || 'Cash on delivery',
      products: order.products || [],
      total: order.total || '₹0.00',
      ...order.extraData, // any extra info
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Get orders by status
  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  // Filter orders by date
  const filterOrdersByDate = (status, filterType) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    return getOrdersByStatus(status).filter((order) => {
      const orderDate = new Date(order.date);
      switch (filterType) {
        case 'Last Week':
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(currentDate - 7);
          return orderDate >= oneWeekAgo;
        case 'Last Month':
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(currentMonth - 1);
          return orderDate >= oneMonthAgo;
        case 'Last 3 Month':
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(currentMonth - 3);
          return orderDate >= threeMonthsAgo;
        case 'Last 6 Month':
          const sixMonthsAgo = new Date(now);
          sixMonthsAgo.setMonth(currentMonth - 6);
          return orderDate >= sixMonthsAgo;
        case '2023':
          return orderDate.getFullYear() === 2023;
        case '2024':
          return orderDate.getFullYear() === 2024;
        default:
          return true;
      }
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrdersByStatus,
        filterOrdersByDate,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
