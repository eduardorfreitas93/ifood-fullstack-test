import React from 'react';

import {
  Title,
} from './styles';

import Search from '../../components/Search';
import OrderList from '../../components/OrderList';
import { OrderProvider } from '../../contexts/order';

export default function OrderPage() {
  return (
    <div className="p-d-flex p-flex-column p-m-6">
      <div className="p-text-left p-mb-5">
        <Title>Order List</Title>
      </div>

      <OrderProvider>
        <Search />
        <OrderList />
      </OrderProvider>
    </div>
  );
}
