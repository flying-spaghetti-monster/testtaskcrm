import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { fetchCustomers } from '../api/customers';
import type { Customer, ResponseCustomer } from '../types/global';
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

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

export const DashboardPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<
    ResponseCustomer,
    Error,
    InfiniteData<ResponseCustomer>,
    [string, Filters],
    number
  >({
    queryKey: ["customers", filters],
    queryFn: ({ pageParam = 0 }) => fetchCustomers({ page: pageParam, ...filters }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap(p => p.customers).length;
      return totalFetched < lastPage.total ? allPages.length : undefined;
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string | undefined) => {
      setFilters(prev => ({ ...prev, [key]: value }));
      refetch();
    },
    [refetch]
  );

  const customers = useMemo(
    () => data?.pages.flatMap((p: ResponseCustomer) => p.customers) || [],
    [data]
  );

  const loadMore = useCallback(
    (reset: boolean) => {
      if (reset) {
        refetch();
      } else {
        fetchNextPage();
      }
    },
    [fetchNextPage, refetch]
  );

  const contextValue = useMemo(
    () => ({
      customers,
      hasMore: !!hasNextPage,
      loadMore,
      isLoading,
      isFetchingNextPage,
      handleFilterChange,
    }),
    [customers, hasNextPage, loadMore, handleFilterChange]
  );

  return <DashboardPageContext.Provider value={contextValue}>{children}</DashboardPageContext.Provider>;
};
