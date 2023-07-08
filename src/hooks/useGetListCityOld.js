import {useQuery} from 'react-query';
import {FetchApi} from '../utils';

const useGetListCityOld = () => {
  const listCity = useQuery([`ListCityOld-${1}`], FetchApi.getAlltinhthanhOld);
  return listCity;
};

export {useGetListCityOld};
