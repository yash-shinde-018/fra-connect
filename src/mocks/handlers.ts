import { http, HttpResponse } from 'msw';

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

// Mock users
const mockUsers = [
  { id: '1', username: 'admin', name: 'Admin User', role: 'admin' },
  { id: '2', username: 'field-officer', name: 'Field Officer', role: 'field-officer' },
  { id: '3', username: 'user', name: 'Normal User', role: 'user' },
];

export const handlers = [
  // Login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate credentials
    if (!username || !password) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Username and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Authenticate user
    const user = mockUsers.find(u => u.username === username && password === 'password');
    
    if (user) {
      return HttpResponse.json({
        success: true,
        token: 'mock-jwt-token-' + user.id,
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });
    } else {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Invalid username or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }),

  // Registration endpoint
  http.post('/api/auth/register', async ({ request }) => {
    const { name, email, username, password, role } = await request.json() as { 
      name: string; 
      email: string; 
      username: string; 
      password: string; 
      role: string; 
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validation
    if (!name || !email || !username || !password || !role) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if username already exists
    if (mockUsers.find(u => u.username === username)) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Username already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create new user (in a real app, this would be stored in a database)
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      username,
      role
    };
    
    // Add to mock users (in a real app, this would be persisted)
    mockUsers.push(newUser);
    
    return HttpResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role
      }
    });
  }),

  // Claims endpoints
  http.get('/api/claims', () => {
    return HttpResponse.json(mockClaims);
  }),

  http.get('/api/claims/:id', ({ params }) => {
    const { id } = params;
    const claim = mockClaims.find(c => c.id === id);
    if (claim) {
      return HttpResponse.json(claim);
    }
    return new HttpResponse('Claim not found', { status: 404 });
  }),

  // Assets endpoint
  http.get('/api/assets', () => {
    return HttpResponse.json(mockAssets);
  }),

  // OCR endpoint
  http.post('/api/ocr', async () => {
    return HttpResponse.json({
      text: `Village: Kothapally
Patta ID: PT-2023-045
Holder Name: Ram Prasad
Coordinates: 78.456, 17.123
Area: 2.5 hectares
Date: 2023-05-10
Witness: Suresh Kumar`
    });
  }),

  // NER endpoint
  http.post('/api/ner', async () => {
    return HttpResponse.json({
      village: 'Kothapally',
      pattaId: 'PT-2023-045',
      holderName: 'Ram Prasad',
      coordinates: '78.456, 17.123'
    });
  }),

  // DSS endpoint
  http.post('/api/dss/run', async () => {
    return HttpResponse.json({
      recommendations: [
        { scheme: 'PM-KISAN', reason: 'Farmland > 0.5 ha and farmer flag is true', priority: 'High' },
        { scheme: 'Soil Health Card', reason: 'Agricultural land detected', priority: 'Medium' }
      ],
      confidence: 92
    });
  }),
];