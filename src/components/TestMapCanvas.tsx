import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const TestMapCanvas: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      try {
        console.log('Initializing test map...');
        
        // Initialize a very simple map
        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
          center: [0, 0],
          zoom: 1
        });

        map.on('load', () => {
          console.log('Test map loaded successfully');
        });

        map.on('error', (e) => {
          console.error('Test map error:', e);
          setError('Map error: ' + (e.error?.message || e.message || 'Unknown error'));
        });

        mapRef.current = map;

        // Clean up
        return () => {
          if (mapRef.current) {
            mapRef.current.remove();
          }
        };
      } catch (e: any) {
        console.error('Test map initialization error:', e);
        setError('Map initialization error: ' + e.message);
      }
    }
  }, []);

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-100 p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-800">Test Map Error</h3>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <div ref={mapContainerRef} className="absolute inset-0 bg-gray-200" />
      <div className="absolute top-2 left-2 bg-white p-2 rounded shadow">
        <p className="text-sm">Test Map - If you see this, the map container is working</p>
      </div>
    </div>
  );
};

export default TestMapCanvas;