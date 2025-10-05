// Test GeoJSON data loading
import villageAData from './data/demo/village-a.geojson';
import villageBData from './data/demo/village-b.geojson';
import villageCData from './data/demo/village-c.geojson';

console.log('Testing GeoJSON data loading...');
console.log('Village A features:', villageAData.features.length);
console.log('Village B features:', villageBData.features.length);
console.log('Village C features:', villageCData.features.length);

export { villageAData, villageBData, villageCData };