import { useEffect, useState } from 'react';
import { CustomerList } from '../components/CustomerList';
import { GenderFilter } from '../components/filters/GenderFilter';
import { CountryFilter } from '../components/filters/CountryFilter';
import { CityFilter } from '../components/filters/CityFilter';
import { fetchCustomers } from '../api/customers';
import type { Customer } from '../types/global';

type Filters = {
  gender?: string;
  country?: string;
  city?: string;
};

export function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // функция загрузки данных
  const loadMore = async (reset: boolean = false) => {
    if (loading) return;

    setLoading(true);

    const nextPage = reset ? 0 : page;
    const data = await fetchCustomers({ page: nextPage, ...filters });

    if (reset) {
      setCustomers(data);
      setPage(1);
      setHasMore(data.length > 0);
    } else {
      setCustomers([...customers, ...data]);
      setPage(nextPage + 1);
      if (data.length === 0) setHasMore(false);
    }

    setLoading(false);
  };

  const handleFilterChange = (key: keyof Filters, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  console.log(filters);

  useEffect(() => {
    loadMore(true);
  }, [filters.gender, filters.country, filters.city]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <GenderFilter onChange={(value) => handleFilterChange("gender", value || undefined)} />
        <CountryFilter onChange={(value) => handleFilterChange("country", value || undefined)} />
        <CityFilter onChange={(value) => handleFilterChange("city", value || undefined)} />
      </div>

      <CustomerList customers={customers} loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}