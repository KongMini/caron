import {useWatch} from 'react-hook-form';
import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'District';

const useGetDistrict = control => {
  const watchAll = useWatch({control});

  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetDistrict-${watchAll.city}`],
    () => FetchApi.getAlldistrict(watchAll.city),
    {enabled: watchAll.city ? true : false},
  );
  return {
    listDistrict: data,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetDistrict};
