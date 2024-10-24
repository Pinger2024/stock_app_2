import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const Filters = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Stock Screener</h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Advanced Filters
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search by symbol or company name..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {showAdvanced && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Market Cap</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Any</option>
              <option>Mega ($200B+)</option>
              <option>Large ($10B-$200B)</option>
              <option>Mid ($2B-$10B)</option>
              <option>Small ($300M-$2B)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sector</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>All Sectors</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Financial</option>
              <option>Consumer Cyclical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">P/E Ratio</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Any</option>
              <option>Under 5</option>
              <option>5-10</option>
              <option>10-20</option>
              <option>20-50</option>
              <option>Over 50</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dividend Yield</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Any</option>
              <option>None (0%)</option>
              <option>Low (0-2%)</option>
              <option>Medium (2-5%)</option>
              <option>High (5%+)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;