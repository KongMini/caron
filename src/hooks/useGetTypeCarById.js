import {useWatch} from 'react-hook-form';
import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'AllTypeCarByID';

const useGetTypeCarById = control => {
  const watchAll = useWatch({control});

  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetTypeCarById-${watchAll.manufacturer || watchAll.hangxe}`],
    () => FetchApi.getAllTypeCarById(watchAll.manufacturer || watchAll.hangxe),
    {enabled: watchAll.manufacturer || watchAll.hangxe ? true : false},
  );

  return {
    allTypeCarByID: data,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetTypeCarById};
