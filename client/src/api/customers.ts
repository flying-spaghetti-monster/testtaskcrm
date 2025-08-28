import axios from 'axios';
import type { Customer, Order } from '../types/global';

const API_BASE = 'http://localhost:3000';

type FetchCustomersParams = {
  page?: number;
  limit?: number;
  gender?: string;
  country?: string;
  city?: string;
};

type ResponseCustomer = { customers: Customer[], total: number };

export async function fetchCustomers(params: FetchCustomersParams = {}): Promise<ResponseCustomer> {
  const { page = 0, limit = 20, gender, country, city } = params;

  const response = await axios.get<ResponseCustomer>(`${API_BASE}/customers`, {
    params: {
      skip: page * limit,
      take: limit,
      gender,
      country,
      city,
    },
  });

  return {
    customers: response.data.customers,
    total: response.data.total
  }
}

export async function fetchCustomerDetails(id: string): Promise<Customer> {
  const response = await axios.get<Customer>(`${API_BASE}/customers/${id}`);
  return response.data;
}

export async function fetchCustomerOrders(id: string): Promise<Order[]> {
  const response = await axios.get<Order[]>(`${API_BASE}/orders/${id}`);
  return response.data;
}