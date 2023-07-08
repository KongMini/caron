import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'ListCity';

const useGetListCity = () => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetListCity-${1}`],
    () => FetchApi.getAlltinhthanh(),
  );
  return {
    listCity: data,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetListCity};
