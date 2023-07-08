import {useEffect} from 'react';
import {useWatch} from 'react-hook-form';
import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'AllTypeCar';

const useGetAllTypeCar = () => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetAllTypeCar-${1}`],
    () => FetchApi.getAllTypeCar(),
  );

  return {
    allTypeCar: data,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetAllTypeCar};
