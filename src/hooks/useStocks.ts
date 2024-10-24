import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useStocks = (filters = {}) => {
  return useQuery(['stocks', filters], async () => {
    const { data } = await axios.get(`${API_URL}/stocks/filter`, { params: filters });
    return data;
  });
};