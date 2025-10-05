import React, { useState, useEffect } from 'react';
// Import demo data
import villageAData from '../data/demo/village-a.geojson';
import villageBData from '../data/demo/village-b.geojson';
import villageCData from '../data/demo/village-c.geojson';

const DataTestComponent: React.FC = () => {
  const [dataInfo, setDataInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('Testing GeoJSON data loading...');
      
      const info = {
        villageA: {
          features: villageAData.features.length,
          types: [...new Set(villageAData.features.map((f: any) => f.properties?.type || f.properties?.holder_type || 'unknown'))]
        },
        villageB: {
          features: villageBData.features.length,
          types: [...new Set(villageBData.features.map((f: any) => f.properties?.type || f.properties?.holder_type || 'unknown'))]
        },
        villageC: {
          features: villageCData.features.length,
          types: [...new Set(villageCData.features.map((f: any) => f.properties?.type || f.properties?.holder_type || 'unknown'))]
        }
      };
      
      console.log('GeoJSON data loaded successfully:', info);
      setDataInfo(info);
    } catch (e: any) {
      console.error('Error loading GeoJSON data:', e);
      setError('Error loading GeoJSON data: ' + e.message);
    }
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800">
        <h2 className="text-xl font-bold">Data Loading Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!dataInfo) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800">
        <h2 className="text-xl font-bold">Loading GeoJSON Data...</h2>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 text-green-800">
      <h2 className="text-xl font-bold">GeoJSON Data Loaded Successfully</h2>
      <div className="mt-4">
        <h3 className="font-bold">Village A</h3>
        <p>Features: {dataInfo.villageA.features}</p>
        <p>Types: {dataInfo.villageA.types.join(', ')}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Village B</h3>
        <p>Features: {dataInfo.villageB.features}</p>
        <p>Types: {dataInfo.villageB.types.join(', ')}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Village C</h3>
        <p>Features: {dataInfo.villageC.features}</p>
        <p>Types: {dataInfo.villageC.types.join(', ')}</p>
      </div>
    </div>
  );
};

export default DataTestComponent;