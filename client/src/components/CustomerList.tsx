import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { CustomerCard } from './CustomerCard';
import type { Customer } from '../types/global';

type CustomerListProps = {
  customers: Customer[];
  hasMore: boolean;
  loadMore: () => void,
};

export const CustomerList: React.FC<CustomerListProps> = ({ customers, hasMore, loadMore }) => {
  const itemCount = hasMore ? customers.length + 1 : customers.length;

  const isItemLoaded = (index: number) => !hasMore || index < customers.length;

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMore}>
      {({ onItemsRendered, ref }) => (
        <List
          height={600}
          width="100%"
          itemCount={itemCount}
          itemSize={80}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ index, style }) =>
            customers[index] ? (
              <div style={style}>
                <CustomerCard customer={customers[index]} />
              </div>
            ) : (
              <div style={{ ...style, textAlign: "center", lineHeight: "80px" }}>Loading...</div>
            )
          }
        </List>
      )}
    </InfiniteLoader>
  );
};