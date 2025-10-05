import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const SimpleMapCanvas = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      try {
        console.log('Initializing simple map...');
        
        // Initialize map with error handling
        const initializeMap = () => {
          try {
            const map = new maplibregl.Map({
              container: mapContainerRef.current,
              style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
              center: [78.55, 17.25],
              zoom: 11,
              attributionControl: false
            });

            // Add navigation controls
            map.addControl(new maplibregl.NavigationControl(), 'top-right');
            
            // Set up event listeners
            map.on('load', () => {
              console.log('Simple map loaded successfully');
              setMapLoaded(true);
              mapRef.current = map;
            });

            // Handle map errors
            map.on('error', (e) => {
              console.error('Simple map error:', e);
              setError('Map loading failed: ' + (e.error?.message || e.message || 'Unknown error'));
            });

            // Clean up on unmount
            return () => {
              if (mapRef.current) {
                mapRef.current.remove();
              }
            };
          } catch (initError) {
            console.error('Simple map initialization error:', initError);
            setError('Map initialization failed: ' + initError.message);
          }
        };

        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(initializeMap, 100);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error('Simple map setup error:', e);
        setError('Map setup failed: ' + e.message);
      }
    }
  }, []);

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-50">
        <div className="text-center p-4 bg-white rounded-lg shadow-lg max-w-md">
          <h3 className="text-lg font-medium text-red-800">Map Loading Error</h3>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <p className="mt-2 text-xs text-gray-500">Check browser console for more details</p>
          <button 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => window.location.reload()}
          >
            Reload Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="absolute inset-0 bg-gray-100" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading simple map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleMapCanvas;