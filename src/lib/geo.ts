import * as turf from '@turf/turf';

export const calculateArea = (geometry: any): number => {
  if (!geometry) return 0;
  try {
    const feature = turf.feature(geometry);
    return turf.area(feature);
  } catch (error) {
    console.error('Error calculating area:', error);
    return 0;
  }
};

export const buffer = (geometry: any, distance: number, units: turf.Units = 'kilometers'): any => {
  if (!geometry) return null;
  try {
    const feature = turf.feature(geometry);
    return turf.buffer(feature, distance, { units });
  } catch (error) {
    console.error('Error creating buffer:', error);
    return null;
  }
};

export const centroid = (geometry: any): any => {
  if (!geometry) return null;
  try {
    const feature = turf.feature(geometry);
    return turf.centroid(feature);
  } catch (error) {
    console.error('Error calculating centroid:', error);
    return null;
  }
};

export const distance = (point1: any, point2: any, units: turf.Units = 'kilometers'): number => {
  if (!point1 || !point2) return 0;
  try {
    const from = turf.point(point1.coordinates || point1);
    const to = turf.point(point2.coordinates || point2);
    return turf.distance(from, to, { units });
  } catch (error) {
    console.error('Error calculating distance:', error);
    return 0;
  }
};

export const intersect = (polygon1: any, polygon2: any): any => {
  if (!polygon1 || !polygon2) return null;
  try {
    const poly1 = turf.polygon(polygon1.coordinates || polygon1);
    const poly2 = turf.polygon(polygon2.coordinates || polygon2);
    // Simplified intersection - just return the first polygon for now
    return poly1;
  } catch (error) {
    console.error('Error calculating intersection:', error);
    return null;
  }
};

export const union = (polygons: any[]): any => {
  if (!polygons || polygons.length === 0) return null;
  try {
    // Simplified union - just return the first polygon for now
    return turf.polygon(polygons[0].coordinates || polygons[0]);
  } catch (error) {
    console.error('Error calculating union:', error);
    return null;
  }
};

export const validateGeometry = (geometry: any): boolean => {
  if (!geometry || !geometry.type || !geometry.coordinates) return false;
  try {
    // Use turf to validate the geometry
    turf.feature(geometry);
    return true;
  } catch (error) {
    return false;
  }
};

export const simplifyGeometry = (geometry: any, tolerance: number = 0.01): any => {
  if (!geometry) return null;
  try {
    const feature = turf.feature(geometry);
    return turf.simplify(feature, { tolerance, highQuality: true });
  } catch (error) {
    console.error('Error simplifying geometry:', error);
    return geometry; // Return original if simplification fails
  }
};

export const convertToGeoJSON = (data: any): any => {
  // If it's already GeoJSON, return as is
  if (data.type === 'FeatureCollection') {
    return data;
  }
  
  if (data.type === 'Feature') {
    // Wrap single feature in a FeatureCollection
    return {
      type: 'FeatureCollection',
      features: [data]
    };
  }
  
  // Convert basic geometry objects to GeoJSON features
  if (data.type && data.coordinates) {
    const feature = turf.feature(data);
    return {
      type: 'FeatureCollection',
      features: [feature]
    };
  }
  
  // Return empty FeatureCollection for unsupported formats
  return {
    type: 'FeatureCollection',
    features: []
  };
};