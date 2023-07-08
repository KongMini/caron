import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const useGetMyCar = (numberOfHook = 1) => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetMyCar-${1}`],
    () => FetchApi.getMyCar(),
  );

  return {
    myCar: data,
    ['refetch' + numberOfHook]: refetch,
    ['isLoading' + numberOfHook]: isLoading,
    ['isFetching' + numberOfHook]: isFetching,
  };
};

export {useGetMyCar};
