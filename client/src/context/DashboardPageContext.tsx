import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
// import { PageDirection, CategoryResponse, Actions } from '../lib/types';
// import { useQuery } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { instance as axios } from '../api/axios';
import { fetchCustomers } from '../api/customers';
import type { Customer } from '../types/global';

type Filters = {
  gender?: string;
  country?: string;
  city?: string;
};

type DashboardPageContextType = {
  customers: Customer[],
  hasMore: boolean,
  loadMore: (reset: boolean) => void,
  handleFilterChange: (key: keyof Filters, value: string | undefined) => void;
};

const DashboardPageContext = createContext<DashboardPageContextType | undefined>(undefined);

export const useDashboardPage = () => {
  const context = useContext(DashboardPageContext);
  if (!context) {
    throw new Error("useDashboardPage must be used within a DashboardPageProvider");
  }
  return context;
};

export const DashboardPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async (reset: boolean = false) => {
    if (loading) return;

    setLoading(true);

    const nextPage = reset ? 0 : page;
    const data = await fetchCustomers({ page: nextPage, ...filters });

    if (reset) {
      console.log(data)
      setCustomers(data.customers);
      setPage(1);
      setHasMore(data.total > 0);
    } else {
      setCustomers([...customers, ...data.customers]);
      setPage(nextPage + 1);
      if (data.total === 0) setHasMore(false);
    }

    setLoading(false);
  };

  const handleFilterChange = useCallback((key: keyof Filters, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    loadMore(true);
  }, [filters.gender, filters.country, filters.city]);

  const contextValue = useMemo(
    () => ({
      customers,
      hasMore,
      loadMore,
      handleFilterChange,
    }),
    [
      customers,
      hasMore,
      loadMore,
      handleFilterChange
    ]
  );

  return (
    <DashboardPageContext.Provider
      value={contextValue}
    >
      {children}
    </DashboardPageContext.Provider>
  );
};
