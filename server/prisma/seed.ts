import { PrismaClient } from '@prisma/client';
import customers from './customers.json';
import orders from './orders.json';
// import fs from "fs";

const prisma = new PrismaClient();

type Customers = {
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

type Orders = {
  number: number;
  price: number;
  currency: string;
  itemName: string;
  amount: number;
  customerId: number;
  createdAt: Date;
  shippedAt: Date;
};

async function fillCustomers(): Promise<void> {
  const data: Customers[] = customers.map(customer => ({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    gender: customer.gender,
    country: customer.country,
    city: customer.city,
    state: customer.state,
    postCode: Number(customer.postCode),
    street: customer.street,
    streetNumber: Number(customer.streetNumber),
  }));

  // const countriesArr = Array.from(
  //   new Set(customers.map((customer) => customer.country))
  // );

  // fs.writeFileSync("countryList.json", JSON.stringify(countriesArr, null, 2));

  await prisma.customers.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ Customers inserted');
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fillOrders(): Promise<void> {
  const selectedCustomers = await prisma.customers.findMany({
    take: 3,
  });

  if (selectedCustomers.length < 0) {
    console.log('Not enough customers to link orders');
    return;
  }
  const ordersData: Orders[] = [];

  orders.forEach(order => {
    const customerId = randomInt(1, 3);
    ordersData.push({
      number: order.number,
      price: order['price '],
      currency: order.currency,
      itemName: order.itemName,
      amount: order.amount,
      customerId: customerId,
      createdAt: new Date(order.createdAt),
      shippedAt: new Date(order.shippedAt),
    });
  });

  await prisma.orders.createMany({
    data: ordersData,
  });

  console.log('Orders inserted');
}

export async function main() {
  await fillCustomers();
  await fillOrders();
}

main();
