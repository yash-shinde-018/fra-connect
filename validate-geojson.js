const fs = require('fs');
const path = require('path');

console.log('Validating GeoJSON files...');

const geojsonFiles = [
  'src/data/demo/village-a.geojson',
  'src/data/demo/village-b.geojson',
  'src/data/demo/village-c.geojson'
];

geojsonFiles.forEach(file => {
  try {
    const filePath = path.join(__dirname, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log(`✓ ${file}:`);
    console.log(`  - Features: ${data.features.length}`);
    
    // Check feature types
    const types = {};
    data.features.forEach(feature => {
      const type = feature.properties?.type || feature.properties?.holder_type || 'unknown';
      types[type] = (types[type] || 0) + 1;
    });
    
    console.log(`  - Types:`, types);
    console.log(`  - Valid GeoJSON: ${data.type === 'FeatureCollection' ? 'Yes' : 'No'}`);
    
  } catch (error) {
    console.error(`✗ ${file}:`, error.message);
  }
});

console.log('Validation complete.');