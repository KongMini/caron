import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'ListCaronGarage';

const useGetListCaronGarage = () => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetListCaronGarage-${1}`],
    () => FetchApi.getListCaronGarage(),
  );

  return {
    listCaronGarage: data,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetListCaronGarage};
