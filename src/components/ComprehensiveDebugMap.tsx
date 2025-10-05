import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const ComprehensiveDebugMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [debugSteps, setDebugSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addDebugStep = (step: string) => {
    setDebugSteps(prev => [...prev, step]);
    console.log(step);
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      try {
        addDebugStep('1. Starting map initialization...');
        
        // Step 1: Check if maplibregl is available
        if (typeof maplibregl === 'undefined') {
          throw new Error('MapLibre GL is not available');
        }
        addDebugStep('2. MapLibre GL library is available');
        
        // Step 2: Check container
        if (!mapContainerRef.current) {
          throw new Error('Map container is not available');
        }
        addDebugStep('3. Map container is available');
        
        // Step 3: Initialize map
        addDebugStep('4. Initializing MapLibre map object...');
        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
          center: [78.55, 17.25],
          zoom: 11,
          attributionControl: false
        });
        
        addDebugStep('5. Map object created successfully');
        
        // Step 4: Add event listeners
        map.on('load', () => {
          addDebugStep('6. Map loaded event fired');
          mapRef.current = map;
        });
        
        map.on('error', (e) => {
          addDebugStep('Map error: ' + (e.error?.message || e.message || 'Unknown error'));
          setError('Map error: ' + (e.error?.message || e.message || 'Unknown error'));
        });
        
        // Step 5: Add controls
        try {
          map.addControl(new maplibregl.NavigationControl(), 'top-right');
          addDebugStep('7. Navigation control added');
        } catch (controlError) {
          addDebugStep('Warning: Could not add navigation control: ' + (controlError as Error).message);
        }
        
        // Clean up
        return () => {
          addDebugStep('8. Cleaning up map resources');
          if (mapRef.current) {
            mapRef.current.remove();
          }
        };
      } catch (e: any) {
        addDebugStep('Initialization error: ' + e.message);
        setError('Initialization error: ' + e.message);
      }
    }
  }, []);

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-100 p-4">
        <div className="text-center max-w-2xl">
          <h3 className="text-xl font-bold text-red-800">Comprehensive Map Debug Error</h3>
          <p className="mt-2 text-red-600">{error}</p>
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h4 className="font-bold">Debug Steps:</h4>
            <ul className="mt-2 text-left space-y-1">
              {debugSteps.map((step, index) => (
                <li key={index} className="text-sm">- {step}</li>
              ))}
            </ul>
          </div>
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
      <div className="absolute top-2 left-2 bg-white p-2 rounded shadow z-10">
        <h3 className="font-bold">Comprehensive Map Debug</h3>
        <div className="mt-2 max-h-40 overflow-y-auto">
          {debugSteps.map((step, index) => (
            <div key={index} className="text-xs">{index + 1}. {step}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDebugMap;