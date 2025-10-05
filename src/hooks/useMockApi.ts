import { useState, useEffect } from 'react';

// Mock data
const mockClaims = [
  { id: 'CR-2023-001', type: 'Community Rights', village: 'Village A', status: 'Pending', date: '2023-05-15', claimant: 'Community Council' },
  { id: 'IFR-2023-002', type: 'Individual Forest Rights', village: 'Village B', status: 'Approved', date: '2023-05-10', claimant: 'John Doe' },
  { id: 'CFR-2023-003', type: 'Community Forest Rights', village: 'Village C', status: 'Under Review', date: '2023-05-05', claimant: 'Forest Committee' },
];

const mockAssets = [
  { id: 'farm-1', type: 'Agricultural Land', name: 'Farm Plot A', village: 'Village A', confidence: 95, area: '2.3 ha' },
  { id: 'pond-1', type: 'Pond', name: 'Community Pond', village: 'Village A', confidence: 92, area: '0.5 ha' },
  { id: 'forest-1', type: 'Forest Patch', name: 'Deciduous Forest', village: 'Village B', confidence: 88, area: '5.2 ha' },
];

export const useMockApi = () => {
  const [claims, setClaims] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClaims(mockClaims);
        setAssets(mockAssets);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const login = async (credentials: { username: string; password: string } | { otp: string }) => {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, token: 'mock-jwt-token' };
  };

  const getClaimById = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const claim = mockClaims.find(c => c.id === id);
    return claim || null;
  };

  const runOCR = async (file: File) => {
    // Simulate OCR API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `Village: Kothapally
Patta ID: PT-2023-045
Holder Name: Ram Prasad
Coordinates: 78.456, 17.123
Area: 2.5 hectares
Date: 2023-05-10
Witness: Suresh Kumar`;
  };

  const runNER = async (text: string) => {
    // Simulate NER API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      village: 'Kothapally',
      pattaId: 'PT-2023-045',
      holderName: 'Ram Prasad',
      coordinates: '78.456, 17.123'
    };
  };

  const runDSS = async (pattaId: string) => {
    // Simulate DSS API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      recommendations: [
        { scheme: 'PM-KISAN', reason: 'Farmland > 0.5 ha and farmer flag is true', priority: 'High' },
        { scheme: 'Soil Health Card', reason: 'Agricultural land detected', priority: 'Medium' }
      ],
      confidence: 92
    };
  };

  return {
    claims,
    assets,
    loading,
    error,
    login,
    getClaimById,
    runOCR,
    runNER,
    runDSS
  };
};