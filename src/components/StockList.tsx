import React from 'react';
import { ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { useStocks } from '../hooks/useStocks';

const StockList = () => {
  const { data: stocks, isLoading, error } = useStocks();

  if (isLoading) return <div className="text-center py-4">Loading stocks...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error loading stocks</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticker</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">RS Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks?.map((stock: any) => (
              <tr key={stock.ticker} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.ticker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.sector}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.industry}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">${stock.close}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{stock.volume}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{stock.rs_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockList;
