import { Link } from 'react-router';
import type { Customer } from '../types/global';

export function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <div className="customer-card">
      <Link
        key={customer.id}
        to={`/customer/${customer.id}`}
        className="border rounded-xl shadow p-4 hover:bg-gray-100 transition"
      >
        <img src={`https://i.pravatar.cc/40?u=${customer.id}`} alt="avatar" className="w-10 h-10 float-left" />
        <div>
          <h3>{customer.firstName} {customer.lastName}</h3>
          <p>{customer.email}</p>
        </div>
      </Link>
    </div>
  );
}