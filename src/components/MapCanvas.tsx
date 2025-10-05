import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification } from 'maplibre-gl';
import MapLegend from './MapLegend';
import LayerControl from './LayerControl';

// Import demo data
import villageAData from '../data/demo/village-a.geojson';
import villageBData from '../data/demo/village-b.geojson';
import villageCData from '../data/demo/village-c.geojson';

const MapCanvas: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback style in case the external style fails
  const fallbackStyle: StyleSpecification = {
    version: 8 as const,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }
    ]
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      try {
        console.log('Initializing map...');
        
        // Initialize map with error handling
        const initializeMap = () => {
          try {
            const map = new maplibregl.Map({
              container: mapContainerRef.current!,
              style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
              center: [78.55, 17.25],
              zoom: 11,
              attributionControl: false
            });

            // Add navigation controls
            map.addControl(new maplibregl.NavigationControl(), 'top-right');
            map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
            
            // Set up event listeners
            map.on('load', () => {
              console.log('Map loaded successfully');
              setMapLoaded(true);
              mapRef.current = map;
              
              // Add demo data after a short delay
              setTimeout(() => {
                try {
                  addDemoDataLayers(map);
                  addInteractivity(map);
                } catch (e: any) {
                  console.error('Error adding demo data:', e);
                  // Don't set error here as the map is already loaded
                }
              }, 100);
            });

            // Handle map errors - try fallback
            map.on('error', (e) => {
              console.error('Map error:', e);
              // Try fallback style
              if (e.error && (e.error.message.includes('style') || e.error.status)) {
                console.log('Trying fallback style...');
                map.setStyle(fallbackStyle);
              } else {
                setError('Map loading failed: ' + (e.error?.message || e.message || 'Unknown error'));
              }
            });
            
            // Handle style load
            map.on('style.load', () => {
              console.log('Map style loaded');
            });

            // Handle style data load
            map.on('styledataloading', () => {
              console.log('Map style data loading...');
            });

            // Clean up on unmount
            return () => {
              if (popupRef.current) {
                popupRef.current.remove();
              }
              if (mapRef.current) {
                mapRef.current.remove();
              }
            };
          } catch (initError: any) {
            console.error('Map initialization error:', initError);
            setError('Map initialization failed: ' + initError.message);
          }
        };

        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(initializeMap, 100);
        return () => clearTimeout(timer);
      } catch (e: any) {
        console.error('Map setup error:', e);
        setError('Map setup failed: ' + e.message);
      }
    }
  }, []);

  const addDemoDataLayers = (map: maplibregl.Map) => {
    console.log('Adding demo data layers');
    
    try {
      // Verify that the map style is loaded
      if (!map.isStyleLoaded()) {
        console.warn('Map style not yet loaded, waiting...');
        map.once('style.load', () => {
          console.log('Map style loaded, adding layers now');
          addDemoDataLayers(map);
        });
        return;
      }

      // Add sources for each village
      map.addSource('village-a', {
        type: 'geojson',
        data: villageAData
      });

      map.addSource('village-b', {
        type: 'geojson',
        data: villageBData
      });

      map.addSource('village-c', {
        type: 'geojson',
        data: villageCData
      });

      // Add village boundaries (administrative boundaries)
      map.addLayer({
        id: 'village-boundaries',
        type: 'line',
        source: 'village-a',
        filter: ['==', 'type', 'administrative_boundary'],
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });

      map.addLayer({
        id: 'village-b-boundaries',
        type: 'line',
        source: 'village-b',
        filter: ['==', 'type', 'administrative_boundary'],
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });

      map.addLayer({
        id: 'village-c-boundaries',
        type: 'line',
        source: 'village-c',
        filter: ['==', 'type', 'administrative_boundary'],
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });

      // Add patta boundaries with status-based coloring
      map.addLayer({
        id: 'patta-boundaries-approved',
        type: 'fill',
        source: 'village-a',
        filter: [
          'all',
          ['==', 'holder_type', 'individual'],
          ['==', 'status', 'granted']
        ],
        paint: {
          'fill-color': '#10b981', // green for approved
          'fill-opacity': 0.5,
          'fill-outline-color': '#047857'
        }
      });

      map.addLayer({
        id: 'patta-boundaries-pending',
        type: 'fill',
        source: 'village-a',
        filter: [
          'all',
          ['==', 'holder_type', 'individual'],
          ['==', 'status', 'pending']
        ],
        paint: {
          'fill-color': '#f59e0b', // yellow for pending
          'fill-opacity': 0.5,
          'fill-outline-color': '#d97706'
        }
      });

      map.addLayer({
        id: 'patta-b-boundaries-approved',
        type: 'fill',
        source: 'village-b',
        filter: [
          'all',
          ['==', 'holder_type', 'community'],
          ['==', 'status', 'granted']
        ],
        paint: {
          'fill-color': '#10b981', // green for approved
          'fill-opacity': 0.5,
          'fill-outline-color': '#047857'
        }
      });

      map.addLayer({
        id: 'patta-c-boundaries-approved',
        type: 'fill',
        source: 'village-c',
        filter: [
          'all',
          ['==', 'holder_type', 'individual'],
          ['==', 'status', 'approved']
        ],
        paint: {
          'fill-color': '#10b981', // green for approved
          'fill-opacity': 0.5,
          'fill-outline-color': '#047857'
        }
      });

      map.addLayer({
        id: 'patta-c-boundaries-pending',
        type: 'fill',
        source: 'village-c',
        filter: [
          'all',
          ['==', 'holder_type', 'community'],
          ['==', 'status', 'pending']
        ],
        paint: {
          'fill-color': '#f59e0b', // yellow for pending
          'fill-opacity': 0.5,
          'fill-outline-color': '#d97706'
        }
      });

      // Add outlines for patta boundaries to make them more visible
      map.addLayer({
        id: 'patta-boundaries-outline',
        type: 'line',
        source: 'village-a',
        filter: ['==', 'holder_type', 'individual'],
        paint: {
          'line-color': '#047857',
          'line-width': 1,
          'line-dasharray': [1, 1]
        }
      });

      map.addLayer({
        id: 'patta-b-boundaries-outline',
        type: 'line',
        source: 'village-b',
        filter: ['==', 'holder_type', 'community'],
        paint: {
          'line-color': '#047857',
          'line-width': 1,
          'line-dasharray': [1, 1]
        }
      });

      map.addLayer({
        id: 'patta-c-boundaries-outline',
        type: 'line',
        source: 'village-c',
        paint: {
          'line-color': '#047857',
          'line-width': 1,
          'line-dasharray': [1, 1]
        }
      });

      // Add farm plots
      map.addLayer({
        id: 'farm-plots',
        type: 'fill',
        source: 'village-a',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#8b5cf6', // purple for farms
          'fill-opacity': 0.4,
          'fill-outline-color': '#7c3aed'
        }
      });

      map.addLayer({
        id: 'farm-c-plots',
        type: 'fill',
        source: 'village-c',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#8b5cf6', // purple for farms
          'fill-opacity': 0.4,
          'fill-outline-color': '#7c3aed'
        }
      });

      // Add forest areas
      map.addLayer({
        id: 'forest-areas',
        type: 'fill',
        source: 'village-b',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#16a34a', // dark green for forests
          'fill-opacity': 0.6,
          'fill-outline-color': '#15803d'
        }
      });

      // Add water bodies (ponds)
      map.addLayer({
        id: 'water-bodies',
        type: 'fill',
        source: 'village-a',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#3b82f6', // blue for water
          'fill-opacity': 0.7,
          'fill-outline-color': '#1d4ed8'
        }
      });

      map.addLayer({
        id: 'water-c-bodies',
        type: 'fill',
        source: 'village-c',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#3b82f6', // blue for water
          'fill-opacity': 0.7,
          'fill-outline-color': '#1d4ed8'
        }
      });

      // Add wells
      map.addLayer({
        id: 'wells',
        type: 'circle',
        source: 'village-a',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 6,
          'circle-color': '#ef4444', // red for wells
          'circle-stroke-width': 2,
          'circle-stroke-color': '#b91c1c'
        }
      });

      map.addLayer({
        id: 'wells-c',
        type: 'circle',
        source: 'village-c',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 6,
          'circle-color': '#ef4444', // red for wells
          'circle-stroke-width': 2,
          'circle-stroke-color': '#b91c1c'
        }
      });

      // Add homesteads
      map.addLayer({
        id: 'homesteads',
        type: 'circle',
        source: 'village-b',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 5,
          'circle-color': '#f97316', // orange for homesteads
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ea580c'
        }
      });

      // Add streams
      map.addLayer({
        id: 'streams',
        type: 'line',
        source: 'village-b',
        filter: ['==', '$type', 'LineString'],
        paint: {
          'line-color': '#3b82f6', // blue for streams
          'line-width': 2,
          'line-dasharray': [1, 1]
        }
      });

      // Add roads
      map.addLayer({
        id: 'roads',
        type: 'line',
        source: 'village-b',
        filter: ['==', '$type', 'LineString'],
        paint: {
          'line-color': '#6b7280', // gray for roads
          'line-width': 3
        }
      });

      console.log('Demo data layers added successfully');
    } catch (e: any) {
      console.error('Error in addDemoDataLayers:', e);
      // Don't throw error here as we want the map to still work
    }
  };

  const addInteractivity = (map: maplibregl.Map) => {
    console.log('Adding interactivity');
    
    try {
      // Add click event for feature selection
      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point);
        if (features.length > 0) {
          const feature = features[0];
          
          // Create or update popup
          if (!popupRef.current) {
            popupRef.current = new maplibregl.Popup({
              closeButton: true,
              closeOnClick: false
            });
          }
          
          const properties = feature.properties || {};
          let statusBadge = '';
          if (properties.status) {
            const statusClass = properties.status === 'granted' || properties.status === 'approved' 
              ? 'bg-green-100 text-green-800' 
              : properties.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-800';
            statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">
              ${properties.status}
            </span>`;
          }
          
          const content = `
            <div class="p-2">
              <h3 class="font-bold text-lg">${properties.name || 'Unnamed Feature'}</h3>
              ${properties.id ? `<p class="text-sm"><strong>ID:</strong> ${properties.id}</p>` : ''}
              ${properties.type ? `<p class="text-sm"><strong>Type:</strong> ${properties.type}</p>` : ''}
              ${properties.holder_name ? `<p class="text-sm"><strong>Holder:</strong> ${properties.holder_name}</p>` : ''}
              ${properties.holder_type ? `<p class="text-sm"><strong>Holder Type:</strong> ${properties.holder_type}</p>` : ''}
              ${statusBadge}
              ${properties.area_ha ? `<p class="text-sm"><strong>Area:</strong> ${properties.area_ha} ha</p>` : ''}
              ${properties.crop_type ? `<p class="text-sm"><strong>Crop:</strong> ${properties.crop_type}</p>` : ''}
              ${properties.species_summary ? `<p class="text-sm"><strong>Species:</strong> ${properties.species_summary}</p>` : ''}
            </div>
          `;
          
          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(content)
            .addTo(map);
        } else {
          // Close popup if clicking on empty space
          if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
          }
        }
      });

      // Change cursor when hovering over features
      const interactiveLayers = [
        'village-boundaries',
        'village-b-boundaries',
        'village-c-boundaries',
        'patta-boundaries-approved',
        'patta-boundaries-pending',
        'patta-b-boundaries-approved',
        'patta-c-boundaries-approved',
        'patta-c-boundaries-pending',
        'farm-plots',
        'farm-c-plots',
        'forest-areas',
        'water-bodies',
        'water-c-bodies',
        'wells',
        'wells-c',
        'homesteads',
        'streams',
        'roads'
      ];

      interactiveLayers.forEach(layerId => {
        map.on('mouseenter', layerId, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        
        map.on('mouseleave', layerId, () => {
          map.getCanvas().style.cursor = '';
        });
      });
      
      console.log('Interactivity added successfully');
    } catch (e: any) {
      console.error('Error adding interactivity:', e);
      // Don't set error here as the map is already loaded
    }
  };

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
            <p className="mt-2 text-gray-600">Loading map...</p>
            <p className="mt-1 text-xs text-gray-500">If this takes too long, check network connectivity</p>
          </div>
        </div>
      )}
      {mapLoaded && (
        <>
          <MapLegend />
          <LayerControl map={mapRef.current} />
        </>
      )}
    </div>
  );
};

export default MapCanvas;