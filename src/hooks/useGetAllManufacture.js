import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {FetchApi, useAppLanguage} from '../utils';

const useGetAllManufacture = props => {
  const {Strings} = useAppLanguage();
  const {data, isLoading, refetch, isFetching} = useQuery(
    [`useGetAllManufacture-${1}`],
    () => FetchApi.getAllManufacture(),
  );
  const [dataWithAll, setDataWithAll] = useState();

  useEffect(() => {
    if (data?.Data && props?.type === 'all') {
      const allManufactureWithAll = data?.Data || [];
      allManufactureWithAll.unshift({
        ten_hangxe: Strings.All,
        ma_hangxe: 'all',
      });
      setDataWithAll({...data, DATA: allManufactureWithAll});
    }
  }, [data]);

  return {
    allManufacture: dataWithAll || data,
    refetchAllManufacture: refetch,
    isLoadingAllManufacture: isLoading,
    isFetchingAllManufacture: isFetching,
  };
};

export {useGetAllManufacture};
