import { describe, it, expect } from 'vitest';
import { validateGeometry, convertToGeoJSON } from '../geo';

describe('Geo Utilities', () => {
  describe('validateGeometry', () => {
    it('should return true for valid geometry', () => {
      const validGeometry = {
        type: 'Point',
        coordinates: [0, 0]
      };
      
      expect(validateGeometry(validGeometry)).toBe(true);
    });

    it('should return false for invalid geometry', () => {
      const invalidGeometry = {
        type: 'Point'
        // Missing coordinates
      };
      
      expect(validateGeometry(invalidGeometry)).toBe(false);
    });

    it('should return false for null/undefined geometry', () => {
      expect(validateGeometry(null)).toBe(false);
      expect(validateGeometry(undefined)).toBe(false);
    });
  });

  describe('convertToGeoJSON', () => {
    it('should return FeatureCollection for valid GeoJSON', () => {
      const geojson = {
        type: 'FeatureCollection',
        features: []
      };
      
      const result = convertToGeoJSON(geojson);
      expect(result.type).toBe('FeatureCollection');
    });

    it('should convert geometry object to Feature', () => {
      const geometry = {
        type: 'Point',
        coordinates: [0, 0]
      };
      
      const result = convertToGeoJSON(geometry);
      expect(result.type).toBe('FeatureCollection');
      expect(result.features).toHaveLength(1);
    });
  });
});