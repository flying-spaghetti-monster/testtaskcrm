import { Link } from 'react-router';
import type { Customer } from '../types/global';
import { Avatar, Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

export function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          backgroundColor: "grey.100",
        },
      }}
    >
      <CardActionArea component={Link} to={`/customer/${customer.id}`}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt={`${customer.firstName} ${customer.lastName}`}
            src={`https://i.pravatar.cc/40?u=${customer.id}`}
            sx={{ width: 56, height: 56 }}
          />

          <Box>
            <Typography variant="h6">
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {customer.email}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}