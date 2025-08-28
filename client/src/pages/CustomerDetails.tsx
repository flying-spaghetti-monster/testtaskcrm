import { useEffect, useState } from 'react';
import { fetchCustomerDetails, fetchCustomerOrders } from '../api/customers';
import { OrderTable } from '../components/OrderTable';
import type { Customer, Order } from '../types/global';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent, Grid, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id).then(setCustomer);
      fetchCustomerOrders(id).then(setOrders);
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      justifyContent="center"
      alignItems="flex-start"
      style={{ minHeight: "100vh", padding: "2rem 0", gap: "2rem" }}
    >
      <Stack spacing={2}>
        <Item>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </Item>
        <Item>      <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex justify-center">
                <img
                  src={`https://i.pravatar.cc/250?u=${customer.id}`}
                  alt="avatar"
                  className="rounded-2xl shadow-md"
                  width={250}
                  height={250}
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <h2 className="text-2xl font-semibold">
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {customer.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Gender:</span> {customer.gender}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span>{" "}
                  {customer.street} {customer.streetNumber},{" "}
                  {customer.city}, {customer.state}, {customer.country}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </Item>
        <Item>
          <Card className="shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            {orders.length > 0 ? (
              <OrderTable orders={orders} />
            ) : (
              <div className="text-center text-gray-500 italic p-4">
                No orders found
              </div>
            )}
          </Card>
        </Item>
      </Stack>
    </Grid>
  );
}