import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DebugMapCanvas: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, info]);
    console.log(info);
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      addDebugInfo('Initializing debug map...');
      
      try {
        // Test basic map initialization
        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
          center: [0, 0],
          zoom: 1,
          attributionControl: false
        });

        addDebugInfo('Map object created');

        map.on('load', () => {
          addDebugInfo('Map loaded successfully');
          mapRef.current = map;
        });

        map.on('error', (e) => {
          addDebugInfo('Map error: ' + (e.error?.message || e.message || 'Unknown error'));
        });

        // Clean up
        return () => {
          if (mapRef.current) {
            mapRef.current.remove();
            addDebugInfo('Map cleaned up');
          }
        };
      } catch (e: any) {
        addDebugInfo('Map initialization error: ' + e.message);
      }
    }
  }, []);

  return (
    <div className="h-full w-full flex">
      <div className="w-1/2 h-full">
        <div ref={mapContainerRef} className="w-full h-full bg-gray-200" />
      </div>
      <div className="w-1/2 h-full p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Debug Information</h2>
        <ul className="space-y-2">
          {debugInfo.map((info, index) => (
            <li key={index} className="p-2 bg-white rounded shadow">
              {info}
            </li>
          ))}
        </ul>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default DebugMapCanvas;