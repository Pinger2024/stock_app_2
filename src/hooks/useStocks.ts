import { useQuery } from 'react-query';
import axios from 'axios';

export const useStocks = () => {
  return useQuery('stocks', async () => {
    const { data } = await axios.get('https://stockscope-api.onrender.com/api/stocks');
    return data;
  });
};
