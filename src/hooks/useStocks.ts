import { useQuery } from 'react-query';

const fetchStocks = async () => {
  const res = await fetch(`https://stockscope-api.onrender.com/api/stocks`);
  if (!res.ok) {
    throw new Error('Error fetching stocks');
  }
  return res.json();
};

export const useStocks = () => {
  return useQuery('stocks', fetchStocks, {
    staleTime: 60000, // 1 minute
    cacheTime: 5 * 60000, // 5 minutes
    onError: (error: any) => {
      console.error('Error fetching stocks:', error);
    }
  });
};
