import villageA from '../data/demo/village-a.geojson';
import villageB from '../data/demo/village-b.geojson';
import villageC from '../data/demo/village-c.geojson';

interface VillageData {
  id: string;
  name: string;
  features: any[];
}

const villages: VillageData[] = [
  {
    id: 'village-a',
    name: 'Village A',
    features: villageA.features
  },
  {
    id: 'village-b',
    name: 'Village B',
    features: villageB.features
  },
  {
    id: 'village-c',
    name: 'Village C',
    features: villageC.features
  }
];

// Function to seed data to the mock API
export const seedMockData = async () => {
  try {
    // In a real implementation, this would POST to the mock API endpoints
    console.log('Seeding mock data for villages:', villages.map(v => v.name));
    
    // Log some statistics
    villages.forEach(village => {
      const pattaCount = village.features.filter(f => f.properties?.type === 'patta').length;
      const assetCount = village.features.filter(f => f.properties?.type !== 'patta' && f.properties?.type !== 'administrative_boundary').length;
      console.log(`- ${village.name}: ${pattaCount} pattas, ${assetCount} assets`);
    });
    
    console.log('Mock data seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding mock data:', error);
    return false;
  }
};

// Run the seed function if this file is executed directly
if (typeof window === 'undefined') {
  seedMockData();
}

export default villages;