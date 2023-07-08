import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const type = 'Advisers';

const useGetAdviser = gara_id => {
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetAdviser-${gara_id}`],
    () => FetchApi.advisers(gara_id),
  );
  const [advisersFilter, setAdvisersFilter] = useState([]);

  console.log('feqf', gara_id);

  useEffect(() => {
    if (Array.isArray(data?._data)) {
      const filter = data?._data.map(item => {
        return {
          name: `${item.first_name || ''} ${item.last_name || ''}`,
          id: item.id,
          gara_id: item.gara_id,
        };
      });
      setAdvisersFilter([...filter]);
    }
  }, [data]);

  return {
    advisers: advisersFilter || [],
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetAdviser};
