import type { Order } from '../types/global';

export function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Order #</th>
          <th>Date</th>
          <th>Total</th>
          <th>Item</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.number}</td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>{order.price} {order.currency}</td>
            <td>{order.itemName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}