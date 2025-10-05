import React, { useState } from 'react';

const DSSPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'analysis'>('rules');
  const [selectedVillage, setSelectedVillage] = useState('Village A');
  const [selectedPatta, setSelectedPatta] = useState('PT-2023-001');

  // Mock DSS rules
  const [rules, setRules] = useState([
    {
      id: 'rule-1',
      name: 'PM-KISAN Eligibility',
      description: 'If household has farmland > 0.5 ha and farmer_flag = true => mark PM-KISAN eligible',
      condition: 'farmland > 0.5 ha AND farmer_flag = true',
      action: 'Mark PM-KISAN eligible',
      active: true
    },
    {
      id: 'rule-2',
      name: 'Jal Jeevan Priority',
      description: 'If water_index < 0.3 and population > 50 => recommend Jal Jeevan / borewell priority',
      condition: 'water_index < 0.3 AND population > 50',
      action: 'Recommend Jal Jeevan / borewell priority',
      active: true
    },
    {
      id: 'rule-3',
      name: 'DAJGUA Interventions',
      description: 'If forest_dependent = true and CFR_status = "granted" => recommend specific DAJGUA interventions',
      condition: 'forest_dependent = true AND CFR_status = "granted"',
      action: 'Recommend DAJGUA interventions',
      active: true
    }
  ]);

  // Mock DSS analysis results
  const analysisResults = [
    {
      pattaId: 'PT-2023-001',
      holder: 'Ram Prasad',
      village: 'Village A',
      recommendations: [
        { scheme: 'PM-KISAN', reason: 'Farmland > 0.5 ha and farmer flag is true', priority: 'High' },
        { scheme: 'Soil Health Card', reason: 'Agricultural land detected', priority: 'Medium' }
      ],
      confidence: 92
    },
    {
      pattaId: 'PT-2023-002',
      holder: 'Sita Devi',
      village: 'Village A',
      recommendations: [
        { scheme: 'Jal Jeevan Mission', reason: 'Water index < 0.3 and population > 50', priority: 'High' }
      ],
      confidence: 87
    },
    {
      pattaId: 'PT-2023-003',
      holder: 'Community Council',
      village: 'Village B',
      recommendations: [
        { scheme: 'DAJGUA Interventions', reason: 'Forest dependent and CFR granted', priority: 'High' },
        { scheme: 'Van Dhan Yojana', reason: 'Forest area detected', priority: 'Medium' }
      ],
      confidence: 95
    }
  ];

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const runDSS = () => {
    // In a real app, this would run the DSS engine
    console.log('Running DSS with rules:', rules);
    setActiveTab('analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Decision Support System</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered recommendations for forest rights implementation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('rules')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rules'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rule Editor
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analysis'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analysis Results
              </button>
            </nav>
          </div>

          {activeTab === 'rules' && (
            <div className="space-y-6">
              {/* Rule Editor Header */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">DSS Rules</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Configure rules for automated decision support
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button
                        type="button"
                        onClick={runDSS}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Run DSS Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rules List */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {rules.map((rule) => (
                    <li key={rule.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id={`rule-${rule.id}`}
                              name={`rule-${rule.id}`}
                              type="checkbox"
                              checked={rule.active}
                              onChange={() => toggleRule(rule.id)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`rule-${rule.id}`} className="ml-3 text-sm font-medium text-gray-700">
                              {rule.name}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Active
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {rule.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Condition: {rule.condition}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Action: {rule.action}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add New Rule */}
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Rule</h3>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="rule-name" className="block text-sm font-medium text-gray-700">
                        Rule Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="rule-name"
                          id="rule-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter rule name"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="rule-description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="rule-description"
                          name="rule-description"
                          rows={2}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Describe the rule"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="rule-condition" className="block text-sm font-medium text-gray-700">
                        Condition
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="rule-condition"
                          id="rule-condition"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter condition logic"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="rule-action" className="block text-sm font-medium text-gray-700">
                        Action
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="rule-action"
                          id="rule-action"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter action to take"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Rule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Analysis Header */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">DSS Analysis Results</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Recommendations based on active rules
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row md:mt-0 gap-2">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                      >
                        <option value="Village A">Village A</option>
                        <option value="Village B">Village B</option>
                        <option value="Village C">Village C</option>
                      </select>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedPatta}
                        onChange={(e) => setSelectedPatta(e.target.value)}
                      >
                        <option value="PT-2023-001">PT-2023-001</option>
                        <option value="PT-2023-002">PT-2023-002</option>
                        <option value="PT-2023-003">PT-2023-003</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Recommendations</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">5</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">High Priority</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">3</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Avg Confidence</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">91%</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results List */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {analysisResults.map((result) => (
                    <li key={result.pattaId}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {result.pattaId} - {result.holder}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {result.confidence}% confidence
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {result.village}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">Recommendations:</h4>
                          <ul className="mt-2 space-y-2">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                  rec.priority === 'High' ? 'bg-red-100' : 'bg-yellow-100'
                                }`}>
                                  <svg className={`h-3 w-3 ${
                                    rec.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                                  }`} fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                </div>
                                <p className="ml-2 text-sm text-gray-700">
                                  <span className="font-medium">{rec.scheme}</span> - {rec.reason}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Export Options */}
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Export Results</h3>
                  <div className="mt-4 flex space-x-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export to PDF
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export to CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DSSPage;