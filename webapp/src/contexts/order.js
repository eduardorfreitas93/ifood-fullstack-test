import React, { createContext, useState, useContext } from 'react';
import toastr from 'toastr';

import api from '../config/api';

const initState = {
  orders: [],
  order: {},
  displayBasic: false,
  getOrders: () => {},
  setOrder: () => {},
  setDisplayBasic: () => {},
};

const OrderContext = createContext(initState);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});

  const [displayBasic, setDisplayBasic] = useState(false);

  async function getOrders(params = { name: '', phone: '', email: '' }) {
    try {
      const { data } = await api.get('/orders', {
        params,
      });

      if (typeof data === 'object') {
        setOrders(data);
        return;
      }
      setOrders([]);
    } catch (e) {
      toastr.error('Something went wrong', 'Error');
      console.log(e);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        order,
        displayBasic,
        getOrders,
        setOrder,
        setDisplayBasic,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder() {
  const context = useContext(OrderContext);

  return context;
}
