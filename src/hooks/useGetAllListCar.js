import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const useGetAllListCar = () => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetAllListCar-${1}`],
    () => FetchApi.getAllListCar(),
  );
  return {
    allListCar: data,
    refetchAllListCar: refetch,
    isLoadingAllListCar: isLoading,
    isFetchingAllListCar: isFetching,
  };
};

export {useGetAllListCar};
