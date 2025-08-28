import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { CustomerCard } from './CustomerCard';
import type { Customer } from '../types/global';

type CustomerListProps = {
  customers: Customer[];
  hasMore: boolean;
  loadMore: () => void,
};

export function CustomerList({ customers, loadMore, hasMore }: CustomerListProps) {
  return (
    <InfiniteLoader
      isItemLoaded={(index) => !!customers[index]}
      itemCount={hasMore ? customers.length + 1 : customers.length}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={600}
          itemCount={customers.length}
          itemSize={80}
          width="100%"
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ index, style }) =>
            customers[index] ? (
              <div style={style}>
                <CustomerCard customer={customers[index]} />
              </div>
            ) : (
              <div style={style}>Loading...</div>
            )
          }
        </List>
      )}
    </InfiniteLoader>
  );
}