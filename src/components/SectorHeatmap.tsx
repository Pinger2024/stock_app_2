import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Technology',
    size: 400,
    color: '#4f46e5',
    children: [
      { name: 'Software', size: 150 },
      { name: 'Hardware', size: 120 },
      { name: 'Semiconductors', size: 130 }
    ]
  },
  {
    name: 'Healthcare',
    size: 300,
    color: '#06b6d4',
    children: [
      { name: 'Biotech', size: 100 },
      { name: 'Equipment', size: 100 },
      { name: 'Services', size: 100 }
    ]
  },
  {
    name: 'Financial',
    size: 300,
    color: '#8b5cf6',
    children: [
      { name: 'Banks', size: 120 },
      { name: 'Insurance', size: 80 },
      { name: 'Real Estate', size: 100 }
    ]
  }
];

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, name, value } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? root.color : `${root.color}${90 - (index + 1) * 20}`,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {name}
        </text>
      )}
    </g>
  );
};

const SectorHeatmap = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Sector Performance</h2>
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorHeatmap;