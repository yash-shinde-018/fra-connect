import React, { useState } from 'react';

const AssetMappingPage: React.FC = () => {
  const [selectedAssetType, setSelectedAssetType] = useState('all');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock asset data
  const assets = [
    { id: 'farm-1', type: 'Agricultural Land', name: 'Farm Plot A', village: 'Village A', confidence: 95, area: '2.3 ha', coordinates: '78.45, 17.12' },
    { id: 'farm-2', type: 'Agricultural Land', name: 'Farm Plot B', village: 'Village A', confidence: 87, area: '1.8 ha', coordinates: '78.46, 17.13' },
    { id: 'pond-1', type: 'Pond', name: 'Community Pond', village: 'Village A', confidence: 92, area: '0.5 ha', coordinates: '78.44, 17.11' },
    { id: 'forest-1', type: 'Forest Patch', name: 'Deciduous Forest', village: 'Village B', confidence: 88, area: '5.2 ha', coordinates: '78.55, 17.22' },
    { id: 'well-1', type: 'Borewell', name: 'Borewell #123', village: 'Village B', confidence: 96, depth: '45m', coordinates: '78.56, 17.23' },
    { id: 'well-2', type: 'Borewell', name: 'Borewell #124', village: 'Village B', confidence: 78, depth: '38m', coordinates: '78.57, 17.24' },
    { id: 'road-1', type: 'Road', name: 'Village Road', village: 'Village C', confidence: 91, length: '1.2 km', coordinates: '78.65, 17.32' },
    { id: 'stream-1', type: 'Stream', name: 'Seasonal Stream', village: 'Village C', confidence: 85, length: '0.8 km', coordinates: '78.66, 17.33' },
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesType = selectedAssetType === 'all' || asset.type === selectedAssetType;
    const matchesConfidence = asset.confidence >= confidenceThreshold;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.village.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesConfidence && matchesSearch;
  });

  const assetTypes = ['all', 'Agricultural Land', 'Forest Patch', 'Pond', 'Borewell', 'Road', 'Stream'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Asset Mapping</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-detected assets and infrastructure
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Assets
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="search"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search by name or village..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Asset Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asset Type
                  </label>
                  <div className="space-y-2">
                    {assetTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          id={`type-${type}`}
                          name="asset-type"
                          type="radio"
                          checked={selectedAssetType === type}
                          onChange={() => setSelectedAssetType(type)}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={`type-${type}`} className="ml-3 block text-sm text-gray-700 capitalize">
                          {type === 'all' ? 'All Assets' : type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Confidence Threshold */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confidence Threshold: {confidenceThreshold}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Assets</span>
                    <span className="text-sm font-medium text-gray-900">{assets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Filtered Assets</span>
                    <span className="text-sm font-medium text-gray-900">{filteredAssets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Avg Confidence</span>
                    <span className="text-sm font-medium text-gray-900">
                      {filteredAssets.length > 0 
                        ? Math.round(filteredAssets.reduce((sum, asset) => sum + asset.confidence, 0) / filteredAssets.length) + '%' 
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Map View */}
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Map</h3>
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Asset Map</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Interactive map showing AI-detected assets would be displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Asset List */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Detected Assets</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    List of AI-detected assets in the current view
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {filteredAssets.map((asset) => (
                      <li key={asset.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                asset.type === 'Agricultural Land' ? 'bg-green-100' :
                                asset.type === 'Forest Patch' ? 'bg-emerald-100' :
                                asset.type === 'Pond' ? 'bg-blue-100' :
                                asset.type === 'Borewell' ? 'bg-cyan-100' :
                                asset.type === 'Road' ? 'bg-yellow-100' :
                                'bg-purple-100'
                              }`}>
                                {asset.type === 'Agricultural Land' && (
                                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                                  </svg>
                                )}
                                {asset.type === 'Forest Patch' && (
                                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                  </svg>
                                )}
                                {asset.type === 'Pond' && (
                                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                  </svg>
                                )}
                                {asset.type === 'Borewell' && (
                                  <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                )}
                                {asset.type === 'Road' && (
                                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                  </svg>
                                )}
                                {asset.type === 'Stream' && (
                                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18m0 0l-4-4m4 4l4-4" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                <div className="text-sm text-gray-500">{asset.village}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900 mr-4">
                                <div className="font-medium">{asset.type}</div>
                                <div className="text-gray-500">
                                  {asset.area && `Area: ${asset.area}`}
                                  {asset.depth && `Depth: ${asset.depth}`}
                                  {asset.length && `Length: ${asset.length}`}
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {asset.confidence}% confidence
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMappingPage;