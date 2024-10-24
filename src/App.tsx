import React, { useState } from 'react';
import { Search, TrendingUp, PieChart, Briefcase } from 'lucide-react';
import Filters from './components/Filters';
import StockList from './components/StockList';
import SectorHeatmap from './components/SectorHeatmap';
import StockPatterns from './components/StockPatterns';

function App() {
  const [activeTab, setActiveTab] = useState('screener');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StockScope</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('screener')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'screener' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Search className="inline-block h-4 w-4 mr-1" />
                Screener
              </button>
              <button 
                onClick={() => setActiveTab('patterns')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'patterns' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <PieChart className="inline-block h-4 w-4 mr-1" />
                Patterns
              </button>
              <button 
                onClick={() => setActiveTab('sectors')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'sectors' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Briefcase className="inline-block h-4 w-4 mr-1" />
                Sectors
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'screener' && (
          <div className="space-y-6">
            <Filters />
            <StockList />
          </div>
        )}
        {activeTab === 'patterns' && <StockPatterns />}
        {activeTab === 'sectors' && <SectorHeatmap />}
      </main>
    </div>
  );
}

export default App;