import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const patterns = [
  {
    name: 'Double Bottom',
    description: 'A bullish reversal pattern that forms in the shape of a "W"',
    data: Array.from({ length: 20 }, (_, i) => ({
      day: i + 1,
      price: 100 - Math.sin(i / 3) * 20 + Math.random() * 5
    }))
  },
  {
    name: 'Head and Shoulders',
    description: 'A bearish reversal pattern with three peaks, the middle being the highest',
    data: Array.from({ length: 20 }, (_, i) => ({
      day: i + 1,
      price: 100 + Math.sin(i / 2) * 15 - (i / 20) * 10 + Math.random() * 5
    }))
  }
];

const StockPatterns = () => {
  return (
    <div className="space-y-6">
      {patterns.map((pattern) => (
        <div key={pattern.name} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{pattern.name}</h3>
          <p className="text-gray-600 mb-4">{pattern.description}</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pattern.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockPatterns;