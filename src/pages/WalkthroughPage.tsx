import React, { useState } from 'react';

const WalkthroughPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const steps = [
    {
      title: 'Login to the System',
      description: 'Access the FRA Atlas DSS with demo credentials',
      content: 'Use any username/password combination or the OTP option. Try switching between Field Officer and Admin roles using the demo toggle.'
    },
    {
      title: 'Upload Scanned Claim Document',
      description: 'Digitize physical forest rights documents',
      content: 'Navigate to the Digitization page and upload a PDF or image. The system will process it with OCR to extract text.'
    },
    {
      title: 'Review OCR Results',
      description: 'Verify and correct extracted text',
      content: 'Check the OCR output for accuracy. The system identifies key fields like village name, patta ID, and holder information.'
    },
    {
      title: 'Correct NER Fields',
      description: 'Validate AI-extracted structured data',
      content: 'Review the Named Entity Recognition results. Correct any misidentified fields like holder name or coordinates.'
    },
    {
      title: 'Attach Polygon Geometry',
      description: 'Define the claim boundary on the map',
      content: 'Draw or upload the claim boundary on the interactive map. This becomes the spatial representation of the claim.'
    },
    {
      title: 'Run DSS and Export Results',
      description: 'Generate recommendations and reports',
      content: 'Execute the Decision Support System to get scheme recommendations. Export the results as PDF or CSV for record keeping.'
    }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">FRA Atlas Walkthrough</h1>
          <p className="mt-1 text-sm text-gray-500">
            Step-by-step guide to using the FRA Atlas & WebGIS DSS
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className="flex flex-col items-center w-1/6">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i + 1 <= currentStep
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="mt-2 text-xs text-center text-gray-500">
                    Step {i + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-lg">{currentStep}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700">{steps[currentStep - 1].content}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                    <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Complete Walkthrough
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Jump to Step</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index + 1)}
                    className={`p-4 text-left rounded-lg border ${
                      currentStep === index + 1
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className={`text-sm font-medium ${
                          currentStep === index + 1 ? 'text-indigo-600' : 'text-gray-500'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${
                          currentStep === index + 1 ? 'text-indigo-600' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkthroughPage;