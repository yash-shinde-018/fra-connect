import React, { useState } from 'react';

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('claims');
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-12-31' });
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  // Mock report data
  const reportTemplates = [
    { id: 'claims', name: 'Claims Summary', description: 'Summary of all forest rights claims' },
    { id: 'assets', name: 'Asset Inventory', description: 'Inventory of detected assets' },
    { id: 'dss', name: 'DSS Recommendations', description: 'Decision support system recommendations' },
    { id: 'users', name: 'User Activity', description: 'User login and activity report' },
  ];

  const villages = [
    { id: 'all', name: 'All Villages' },
    { id: 'village-a', name: 'Village A' },
    { id: 'village-b', name: 'Village B' },
    { id: 'village-c', name: 'Village C' },
  ];

  const handleGenerateReport = () => {
    // In a real app, this would generate the report
    console.log('Generating report:', { reportType, dateRange, selectedVillage, selectedFormat });
    alert(`Report generated successfully in ${selectedFormat.toUpperCase()} format!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Exports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and export reports
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Configuration */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Generate Report</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Report Type
                      </label>
                      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {reportTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => setReportType(template.id)}
                            className={`relative rounded-lg border p-4 cursor-pointer focus:outline-none ${
                              reportType === template.id
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300'
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                checked={reportType === template.id}
                                onChange={() => {}}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-3 block text-sm font-medium text-gray-700">
                                {template.name}
                              </span>
                            </div>
                            <p className="mt-1 ml-7 text-sm text-gray-500">
                              {template.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          id="start-date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          id="end-date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="village" className="block text-sm font-medium text-gray-700">
                        Village
                      </label>
                      <div className="mt-1">
                        <select
                          id="village"
                          value={selectedVillage}
                          onChange={(e) => setSelectedVillage(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {villages.map((village) => (
                            <option key={village.id} value={village.id}>
                              {village.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Export Format
                      </label>
                      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-4">
                        {['pdf', 'csv', 'geojson', 'kml'].map((format) => (
                          <div
                            key={format}
                            onClick={() => setSelectedFormat(format)}
                            className={`relative rounded-lg border p-4 cursor-pointer focus:outline-none ${
                              selectedFormat === format
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300'
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                checked={selectedFormat === format}
                                onChange={() => {}}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-3 block text-sm font-medium text-gray-700 uppercase">
                                {format}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleGenerateReport}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
                  <div className="mt-4">
                    <ul className="divide-y divide-gray-200">
                      <li className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Claims Summary</p>
                            <p className="text-sm text-gray-500">May 15, 2023</p>
                          </div>
                          <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              PDF
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Asset Inventory</p>
                            <p className="text-sm text-gray-500">May 10, 2023</p>
                          </div>
                          <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              CSV
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">DSS Recommendations</p>
                            <p className="text-sm text-gray-500">May 5, 2023</p>
                          </div>
                          <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              PDF
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">User Activity</p>
                            <p className="text-sm text-gray-500">April 28, 2023</p>
                          </div>
                          <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              CSV
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      View All Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="mt-6 bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Exports</h3>
                  <div className="mt-4 space-y-3">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export All Claims (GeoJSON)
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export Assets (KML)
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export DSS Results (CSV)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;