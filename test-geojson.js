const fs = require('fs');

console.log('Testing GeoJSON files...');

try {
  const villageA = JSON.parse(fs.readFileSync('./src/data/demo/village-a.geojson', 'utf8'));
  console.log('Village A data loaded:', villageA.features.length, 'features');
  
  const villageB = JSON.parse(fs.readFileSync('./src/data/demo/village-b.geojson', 'utf8'));
  console.log('Village B data loaded:', villageB.features.length, 'features');
  
  const villageC = JSON.parse(fs.readFileSync('./src/data/demo/village-c.geojson', 'utf8'));
  console.log('Village C data loaded:', villageC.features.length, 'features');
  
  console.log('All GeoJSON files are valid!');
} catch (error) {
  console.error('Error loading GeoJSON files:', error.message);
}