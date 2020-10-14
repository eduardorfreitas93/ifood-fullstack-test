import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useOrder } from '../../contexts/order';

export default function Search() {
  const {
    getOrders,
  } = useOrder();

  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  function search() {
    let startDate = start;
    let endDate = end;
    if (start && !end) {
      setEnd(start);
      endDate = start;
    }

    if (end && !start) {
      setStart(end);
      startDate = end;
    }

    const params = {
      start: startDate ? new Date(startDate).toUTCString() : '',
      end: endDate ? new Date(endDate).toUTCString() : '',
      name: name || '',
      phone: phone || '',
      email: email || '',
    };
    getOrders(params);
  }

  return (
    <div>
      <div className="p-fluid p-formgrid p-grid p-justify-center">
        <div className="p-field p-col">
          <label htmlFor="start">Start Date</label>
          <Calendar dateFormat="yy/mm/dd" id="icon" value={start} onChange={(e) => setStart(e.value)} showIcon />
        </div>
        <div className="p-field p-col">
          <label htmlFor="end">End Date</label>
          <Calendar dateFormat="yy/mm/dd" id="icon" value={end} onChange={(e) => setEnd(e.value)} showIcon />
        </div>

        <div className="p-field p-col">
          <label htmlFor="name">Client Name</label>
          <InputText id="name" type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="p-field p-col">
          <label htmlFor="phone">Phone</label>
          <InputText id="phone" type="text" onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="p-field p-col">
          <label htmlFor="email">E-mail</label>
          <InputText id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="p-grid p-justify-center">
        <div className="p-col p-text-center">
          <Button label="Search" onClick={search} />
        </div>
      </div>
    </div>
  );
}
