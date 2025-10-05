import React from 'react';
import BasicTestComponent from '../components/BasicTestComponent';

const BasicTestPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Basic Test Page</h1>
              <p className="mt-1 text-sm text-gray-500">
                Testing if React environment is working
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <BasicTestComponent />
      </div>
    </div>
  );
};

export default BasicTestPage;