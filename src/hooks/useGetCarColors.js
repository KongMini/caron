import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'CarColors';

const useGetCarColors = () => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetCarColors-${1}`],
    () => FetchApi.getAllCarColors(),
  );

  return {
    carColors: data,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetCarColors};
