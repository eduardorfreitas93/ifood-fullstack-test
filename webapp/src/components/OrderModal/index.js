import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { useOrder } from '../../contexts/order';
import { applyPriceMask, applyPhoneMask } from '../../utils/MaskUtil';

export default function OrderModal() {
  const {
    order,
    displayBasic,
    setDisplayBasic,
  } = useOrder();

  return (
    <Dialog header="Order Details" visible={displayBasic} style={{ width: '50vw' }} onHide={() => setDisplayBasic(false)}>
      <div className="p-grid p-justify-center">
        {!!order.client &&
        <>
          <div className="p-col p-text-center">
            Client: {order.client.name}
          </div>
          <div className="p-col p-text-center">
            Phone: {applyPhoneMask(order.client.phone)}
          </div>
          <div className="p-col p-text-center">
            E-mail: {order.client.email}
          </div>
        </>
        }
      </div>
      <DataTable value={order.items}>
        <Column field="description" header="Description"></Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column field="price" body={val => applyPriceMask(val.price, '$')} header="Unit Price"></Column>
        <Column field="totalPrice" body={val => applyPriceMask(val.totalPrice, '$')} header="Total"></Column>
      </DataTable>
    </Dialog>
  );
}
