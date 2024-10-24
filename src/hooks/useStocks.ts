import { useState, useEffect } from 'react';

export const useStocks = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('https://stockscope.onrender.com/api/stocks');
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || 'Failed to fetch stocks');
        }
        const stocks = await response.json();
        setData(stocks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return { data, isLoading, error };
};
