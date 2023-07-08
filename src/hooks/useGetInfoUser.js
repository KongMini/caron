import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {FetchApi} from '../utils';
import {useAppAccount} from '../utils';

const type = 'Profile';

const useGetInfoUser = () => {
  const [account, setAccount] = useAppAccount();
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetInfoUser-${1}`],
    () => FetchApi.profile(),
  );

  useEffect(() => {
    if (data?._data?.user_info) {
      const acc = {...account};
      account.user_info = {...account.user_info, ...data._data.user_info};
      setAccount(acc);
    }
  }, [data]);

  return {
    profile: data?._data?.user_info,
    ['refetch' + type]: refetch,
    ['isLoading' + type]: isLoading,
    ['isFetching' + type]: isFetching,
  };
};

export {useGetInfoUser};
