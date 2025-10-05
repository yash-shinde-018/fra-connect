import React, { useState, useEffect } from 'react';
import maplibregl from 'maplibre-gl';

interface LayerControlProps {
  map: maplibregl.Map | null;
}

const LayerControl: React.FC<LayerControlProps> = ({ map }) => {
  const [layers, setLayers] = useState([
    { id: 'claims', name: 'Forest Claims', visible: true, opacity: 1, layerIds: ['patta-boundaries-approved', 'patta-boundaries-pending', 'patta-b-boundaries-approved', 'patta-c-boundaries-approved', 'patta-c-boundaries-pending', 'patta-boundaries-outline', 'patta-b-boundaries-outline', 'patta-c-boundaries-outline'] },
    { id: 'boundaries', name: 'Village Boundaries', visible: true, opacity: 1, layerIds: ['village-boundaries', 'village-b-boundaries', 'village-c-boundaries'] },
    { id: 'farms', name: 'Farm Plots', visible: true, opacity: 1, layerIds: ['farm-plots', 'farm-c-plots'] },
    { id: 'forests', name: 'Forest Areas', visible: true, opacity: 1, layerIds: ['forest-areas'] },
    { id: 'water', name: 'Water Bodies', visible: true, opacity: 1, layerIds: ['water-bodies', 'water-c-bodies'] },
    { id: 'infrastructure', name: 'Infrastructure', visible: true, opacity: 1, layerIds: ['wells', 'wells-c', 'homesteads', 'streams', 'roads'] },
  ]);

  // Apply changes to map when layers state changes
  useEffect(() => {
    if (map) {
      layers.forEach(layerGroup => {
        layerGroup.layerIds.forEach(layerId => {
          try {
            if (map.getLayer(layerId)) {
              map.setLayoutProperty(layerId, 'visibility', layerGroup.visible ? 'visible' : 'none');
              // Update opacity based on layer type
              if (map.getLayer(layerId)?.type === 'fill') {
                map.setPaintProperty(layerId, 'fill-opacity', layerGroup.visible ? layerGroup.opacity * (layerId.includes('boundaries') ? 1 : 0.5) : 0);
              } else if (map.getLayer(layerId)?.type === 'line') {
                map.setPaintProperty(layerId, 'line-opacity', layerGroup.visible ? layerGroup.opacity : 0);
              } else if (map.getLayer(layerId)?.type === 'circle') {
                map.setPaintProperty(layerId, 'circle-opacity', layerGroup.visible ? layerGroup.opacity : 0);
              }
            }
          } catch (e) {
            console.warn(`Could not update layer ${layerId}:`, e);
          }
        });
      });
    }
  }, [layers, map]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id 
        ? { ...layer, visible: !layer.visible } 
        : layer
    ));
  };

  const updateOpacity = (id: string, opacity: number) => {
    setLayers(layers.map(layer => 
      layer.id === id 
        ? { ...layer, opacity } 
        : layer
    ));
  };

  // Don't render anything if map is not provided
  if (!map) {
    return null;
  }

  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
      <h3 className="font-bold text-lg mb-3">Map Layers</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {layers.map(layer => (
          <div key={layer.id} className="border-b pb-2 last:border-b-0">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={layer.visible}
                  onChange={() => toggleLayer(layer.id)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">{layer.name}</span>
              </label>
            </div>
            {layer.visible && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-gray-500">Opacity:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layer.opacity}
                  onChange={(e) => updateOpacity(layer.id, parseFloat(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-gray-500 w-8">{Math.round(layer.opacity * 100)}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;