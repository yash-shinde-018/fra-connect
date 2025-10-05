import React, { useState } from 'react';

const AdminLayersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingLayer, setIsAddingLayer] = useState(false);
  const [editingLayer, setEditingLayer] = useState<any>(null);

  // Mock layer data
  const [layers, setLayers] = useState([
    { id: '1', name: 'Patta Boundaries', type: 'Vector', status: 'Published', version: '1.2', lastUpdated: '2023-05-15' },
    { id: '2', name: 'Forest Cover', type: 'Raster', status: 'Published', version: '2.1', lastUpdated: '2023-05-10' },
    { id: '3', name: 'Water Bodies', type: 'Vector', status: 'Draft', version: '0.9', lastUpdated: '2023-05-05' },
    { id: '4', name: 'Road Network', type: 'Vector', status: 'Published', version: '1.0', lastUpdated: '2023-04-28' },
    { id: '5', name: 'Homesteads', type: 'Vector', status: 'Archived', version: '1.5', lastUpdated: '2023-04-20' },
  ]);

  const layerTypes = ['Vector', 'Raster', 'Point', 'Line'];

  const filteredLayers = layers.filter(layer => 
    layer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    layer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    layer.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLayer = (layerData: any) => {
    const newLayer = {
      id: (layers.length + 1).toString(),
      ...layerData,
      status: 'Draft',
      version: '1.0',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setLayers([...layers, newLayer]);
    setIsAddingLayer(false);
  };

  const handleUpdateLayer = (layerData: any) => {
    setLayers(layers.map(layer => 
      layer.id === editingLayer.id ? { ...layer, ...layerData } : layer
    ));
    setEditingLayer(null);
  };

  const handleDeleteLayer = (layerId: string) => {
    setLayers(layers.filter(layer => layer.id !== layerId));
  };

  const toggleLayerStatus = (layerId: string) => {
    setLayers(layers.map(layer => {
      if (layer.id === layerId) {
        const newStatus = layer.status === 'Published' ? 'Draft' : 'Published';
        return { ...layer, status: newStatus };
      }
      return layer;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Layer Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage map layers and their versions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search layers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4">
              <button
                type="button"
                onClick={() => setIsAddingLayer(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Layer
              </button>
            </div>
          </div>

          {/* Layers Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredLayers.map((layer) => (
                <li key={layer.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                          {layer.type === 'Vector' && (
                            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                          )}
                          {layer.type === 'Raster' && (
                            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                          {layer.type === 'Point' && (
                            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                          {layer.type === 'Line' && (
                            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{layer.name}</div>
                          <div className="text-sm text-gray-500">
                            {layer.type} • v{layer.version} • Updated {layer.lastUpdated}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            layer.status === 'Published' ? 'bg-green-100 text-green-800' :
                            layer.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {layer.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleLayerStatus(layer.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {layer.status === 'Published' ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => setEditingLayer(layer)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteLayer(layer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
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

      {/* Add Layer Modal */}
      {isAddingLayer && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Layer
                    </h3>
                    <div className="mt-4">
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="layer-name" className="block text-sm font-medium text-gray-700">
                            Layer Name
                          </label>
                          <input
                            type="text"
                            name="layer-name"
                            id="layer-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter layer name"
                          />
                        </div>
                        <div>
                          <label htmlFor="layer-type" className="block text-sm font-medium text-gray-700">
                            Layer Type
                          </label>
                          <select
                            id="layer-type"
                            name="layer-type"
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {layerTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="layer-description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="layer-description"
                            name="layer-description"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter layer description"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleAddLayer({ name: 'New Layer', type: 'Vector', description: 'New layer description' })}
                >
                  Add Layer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddingLayer(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Layer Modal */}
      {editingLayer && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Edit Layer
                    </h3>
                    <div className="mt-4">
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="edit-layer-name" className="block text-sm font-medium text-gray-700">
                            Layer Name
                          </label>
                          <input
                            type="text"
                            name="edit-layer-name"
                            id="edit-layer-name"
                            defaultValue={editingLayer.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-layer-type" className="block text-sm font-medium text-gray-700">
                            Layer Type
                          </label>
                          <select
                            id="edit-layer-type"
                            name="edit-layer-type"
                            defaultValue={editingLayer.type}
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {layerTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="edit-layer-description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="edit-layer-description"
                            name="edit-layer-description"
                            rows={3}
                            defaultValue={editingLayer.description || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-layer-version" className="block text-sm font-medium text-gray-700">
                            Version
                          </label>
                          <input
                            type="text"
                            name="edit-layer-version"
                            id="edit-layer-version"
                            defaultValue={editingLayer.version}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleUpdateLayer({ name: 'Updated Layer', type: 'Vector', description: 'Updated description', version: '2.0' })}
                >
                  Update Layer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setEditingLayer(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayersPage;