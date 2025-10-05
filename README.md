# FRA Atlas & WebGIS Decision Support System (DSS)

An AI-powered Forest Rights Act Atlas and WebGIS Decision Support System demo application built with React, TypeScript, and modern geospatial technologies.

## Features

- **Interactive Map**: View forest rights claims, assets, and boundaries
- **Document Digitization**: Upload scanned documents, run OCR, and extract data
- **Asset Mapping**: Visualize AI-detected assets like farmland, forests, ponds, wells
- **Decision Support System**: Rule-based recommendations for forest rights implementation
- **User Management**: Role-based access control
- **Reporting**: Export data in various formats
- **Public Portal**: Limited access for public viewing

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Mapping**: MapLibre GL
- **Geospatial Operations**: Turf.js
- **State Management**: React Router, React Query
- **File Handling**: react-dropzone, shpjs
- **Mocking**: Mock Service Worker (MSW)
- **Testing**: Vitest (planned)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fra-atlas-dss
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

### Demo Roles

The application includes a demo mode with different user roles:

- **Field Officer**: Full access to all features
- **Administrator**: User and layer management
- **Public**: Limited read-only access

To switch between demo roles:
1. Go to the login page
2. Check the "Demo as Admin" checkbox to switch to admin mode
3. Login with any credentials (mock authentication)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components for each route
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── data/                # Demo data and GeoJSON files
├── mocks/               # Mock Service Worker setup
├── scripts/             # Utility scripts
└── typings/             # TypeScript type definitions
```

## Mock API Endpoints

The application uses Mock Service Worker to simulate backend APIs:

- `POST /api/auth/login` - User authentication
- `GET /api/claims` - List all claims
- `GET /api/claims/:id` - Get claim details
- `GET /api/assets` - List all assets
- `POST /api/ocr` - OCR processing
- `POST /api/ner` - Named entity recognition
- `POST /api/dss/run` - Run decision support system

## Demo Data

The application includes sample GeoJSON data for three villages in India:
- Village A: Individual pattas with farmland and ponds
- Village B: Community forest areas with streams
- Village C: Mixed individual and community claims

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests (when implemented)

### Adding New Features

1. Create new components in the appropriate directory
2. Add new routes to `App.tsx`
3. If needed, add new mock endpoints in `src/mocks/handlers.ts`
4. Update demo data in `src/data/demo/` if applicable

## Future Enhancements

- Implement unit tests with Vitest
- Add Storybook for component documentation
- Implement PDF report generation
- Add real shapefile processing
- Implement caching for map tiles
- Add keyboard navigation and accessibility features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MapLibre GL for mapping capabilities
- Turf.js for geospatial operations
- Mock Service Worker for API mocking
- Tailwind CSS for styling