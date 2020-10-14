import React, { useEffect } from 'react';
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useOrder } from '../../contexts/order';
import { applyPriceMask, applyPhoneMask } from '../../utils/MaskUtil';
import OrderModal from '../OrderModal';

export default function OrderList() {
  const {
    orders,
    getOrders,
    setOrder,
    setDisplayBasic,
  } = useOrder();

  function formatDate(date) {
    return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
  }

  function onRowClick(data) {
    setDisplayBasic(true);
    setOrder(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div className="card">
        <DataTable value={orders} onRowClick={({ data }) => onRowClick(data)}>
          <Column field="createAt" body={val => formatDate(val.createdAt)} header="Date"></Column>
          <Column field="client.name" header="Client Name"></Column>
          <Column field="client.phone" body={val => applyPhoneMask(val.client.phone)} header="Phone"></Column>
          <Column field="client.email" header="E-mail"></Column>
          <Column field="totalPrice" body={val => applyPriceMask(val.totalPrice, '$')} header="Total Value"></Column>
        </DataTable>
      </div>

      <OrderModal />
    </div>
  );
}
