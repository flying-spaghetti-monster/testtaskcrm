import { CustomerList } from '../components/CustomerList';
import { GenderFilter } from '../components/filters/GenderFilter';
import { CountryFilter } from '../components/filters/CountryFilter';
import { CityFilter } from '../components/filters/CityFilter';
import { useDashboardPage } from '../context/DashboardPageContext';
import { Card, CardContent, Grid } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export function Dashboard() {
  const {
    customers,
    hasMore,
    loadMore,
    handleFilterChange,
  } = useDashboardPage();

  return (
    <Grid container columns={1}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", padding: "2rem 0" }}
    >
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <GenderFilter onChange={(value) => handleFilterChange("gender", value || undefined)} />
          <CountryFilter onChange={(value) => handleFilterChange("country", value || undefined)} />
          <CityFilter onChange={(value) => handleFilterChange("city", value || undefined)} />
        </CardContent>

        <CardContent className="p-6">
          <CustomerList customers={customers} loadMore={() => loadMore(false)} hasMore={hasMore} />
        </CardContent>
      </Card>
      <Toaster toastOptions={{
        style: {
          zIndex: 9999, // higher than modal (adjust as needed)
        },
      }} />
    </Grid>

  );
}