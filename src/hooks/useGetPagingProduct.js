import {useInfiniteQuery} from 'react-query';
import {FetchApi} from '../utils';

const TAG = 'PagingProduct';

const useGetPagingProduct = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchedAfterMount,
    refetch,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  } = useInfiniteQuery(
    `useGetListProduct-${1}`,
    ({pageParam = 0}) => {
      return FetchApi.getListProductPaging({
        pageIndex: pageParam,
        sortType: 'asc',
      });
    },
    {
      getNextPageParam: lastGroup => {
        return lastGroup?.nextPage;
      },
    },
  );

  return {
    listProductPaging: data,
    ['refetch' + TAG]: refetch,
    ['isLoading' + TAG]: isLoading,
    ['isFetching' + TAG]: isFetching,
    ['fetchNextPage' + TAG]: fetchNextPage,
    ['isFetchedAfterMount' + TAG]: isFetchedAfterMount,
    ['isFetchedAfterMount' + TAG]: isFetchedAfterMount,
    ['isError' + TAG]: isError,
    ['error' + TAG]: error,
    ['isFetchingNextPage' + TAG]: isFetchingNextPage,
    ['hasNextPage' + TAG]: hasNextPage,
    ['isRefetching' + TAG]: isRefetching,
  };
};

export {useGetPagingProduct};
