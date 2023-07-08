import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const useGetListProduct = () => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetListProduct-${1}`],
    () => FetchApi.getListProduct(),
  );
  return {
    listProduct: data,
    refetchListProduct: refetch,
    isLoadingListProduct: isLoading,
    isFetchingListProduct: isFetching,
  };
};

export {useGetListProduct};
