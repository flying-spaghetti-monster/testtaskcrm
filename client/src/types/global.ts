export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  postCode: number;
  street: string;
  streetNumber: number;
};

export type Order = {
  id: number;
  number: number;
  price: number;
  currency: string;
  itemName: string;
  amount: number;
  customerId: number;
  createdAt: Date;
  shippedAt: Date;
};

export type ResponseCustomer = { customers: Customer[], total: number };