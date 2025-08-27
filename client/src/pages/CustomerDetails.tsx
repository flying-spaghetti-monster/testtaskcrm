import { useEffect, useState } from 'react';
import { fetchCustomerDetails, fetchCustomerOrders } from '../api/customers';
import { OrderTable } from '../components/OrderTable';
import type { Customer, Order } from '../types/global';
import { useParams } from 'react-router';

export function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id).then(setCustomer);
      fetchCustomerOrders(id).then(setOrders);
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => history.back()}>Back</button>
      <h2>{customer.firstName} {customer.lastName}</h2>
      <img width={350} src={`https://i.pravatar.cc/?u=${customer.id}`} />
      <p>Email: {customer.email}</p>
      <p>Gender: {customer.gender}</p>
      <p>Address: {customer.street} {customer.streetNumber}, {customer.city}, {customer.state}, {customer.country}</p>
      <h2>Orders</h2>
      {orders.length > 0 && <OrderTable orders={orders} />}
    </div>
  );
}