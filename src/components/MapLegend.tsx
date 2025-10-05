import React from 'react';

const MapLegend: React.FC = () => {
  const legendItems = [
    { color: 'bg-green-500', label: 'Approved Claims', opacity: 'opacity-50' },
    { color: 'bg-yellow-500', label: 'Pending Claims', opacity: 'opacity-50' },
    { color: 'bg-purple-500', label: 'Farm Plots', opacity: 'opacity-40' },
    { color: 'bg-green-700', label: 'Forest Areas', opacity: 'opacity-60' },
    { color: 'bg-blue-500', label: 'Water Bodies', opacity: 'opacity-70' },
    { color: 'bg-red-500', label: 'Wells', opacity: 'opacity-100' },
    { color: 'bg-orange-500', label: 'Homesteads', opacity: 'opacity-100' },
    { color: 'bg-gray-500', label: 'Roads', opacity: 'opacity-100' },
    { color: 'bg-blue-500 border-2 border-dashed', label: 'Streams', opacity: 'opacity-100' },
    { color: 'bg-blue-500 border-2 border-dotted', label: 'Village Boundaries', opacity: 'opacity-100' },
  ];

  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
      <h3 className="font-bold text-lg mb-3">Map Legend</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-4 h-4 ${item.color} ${item.opacity} mr-2`}></div>
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status Indicators</h4>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved/Granted
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        <p>Click on features to view details</p>
      </div>
    </div>
  );
};

export default MapLegend;