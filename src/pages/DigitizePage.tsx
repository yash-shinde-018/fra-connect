import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DigitizePage: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'ocr' | 'ner' | 'geometry' | 'review'>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [ocrText, setOcrText] = useState('');
  const [nerFields, setNerFields] = useState({
    village: '',
    pattaId: '',
    holderName: '',
    coordinates: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff']
    },
    maxFiles: 1
  });

  const handleRunOCR = () => {
    setIsProcessing(true);
    // Simulate OCR processing
    setTimeout(() => {
      setOcrText(`Village: Kothapally
Patta ID: PT-2023-045
Holder Name: Ram Prasad
Coordinates: 78.456, 17.123
Area: 2.5 hectares
Date: 2023-05-10
Witness: Suresh Kumar`);
      setIsProcessing(false);
      setStep('ocr');
    }, 2000);
  };

  const handleExtractFields = () => {
    setIsProcessing(true);
    // Simulate NER extraction
    setTimeout(() => {
      setNerFields({
        village: 'Kothapally',
        pattaId: 'PT-2023-045',
        holderName: 'Ram Prasad',
        coordinates: '78.456, 17.123'
      });
      setIsProcessing(false);
      setStep('ner');
    }, 1500);
  };

  const handleFieldChange = (field: string, value: string) => {
    setNerFields({ ...nerFields, [field]: value });
  };

  const handleSaveClaim = () => {
    // In a real app, this would save the claim
    console.log('Saving claim with data:', { uploadedFiles, ocrText, nerFields });
    setStep('review');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Document Digitization</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload documents, extract data, and create claims
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Progress Steps */}
          <div className="mb-8">
            <nav aria-label="Progress">
              <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                {(['upload', 'ocr', 'ner', 'geometry', 'review'] as const).map((s, index) => (
                  <li key={s} className="md:flex-1">
                    {step === s ? (
                      <div className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                        <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">{s}</span>
                        <span className="text-sm font-medium text-gray-900 capitalize">{s}</span>
                      </div>
                    ) : (
                      <div className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                        <span className="text-xs font-semibold tracking-wide uppercase text-gray-500 group-hover:text-gray-700">
                          {s}
                        </span>
                        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                          {s}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Step Content */}
          {step === 'upload' && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Document</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Upload a scanned PDF or image of a forest rights document to begin digitization.</p>
                </div>
                
                <div className="mt-5">
                  <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-400">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p className="text-indigo-600">Drop the files here ...</p>
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          PDF, JPG, PNG, or TIFF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Selected file:</h4>
                      <ul className="mt-2 divide-y divide-gray-200 rounded-md border border-gray-200">
                        {uploadedFiles.map((file, index) => (
                          <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="font-medium text-indigo-600">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    disabled={uploadedFiles.length === 0 || isProcessing}
                    onClick={handleRunOCR}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      uploadedFiles.length === 0 || isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Run OCR Extraction'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'ocr' && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">OCR Results</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Text extracted from the document:</p>
                </div>
                
                <div className="mt-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{ocrText}</pre>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleExtractFields}
                    disabled={isProcessing}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Extracting fields...
                      </>
                    ) : (
                      'Extract Fields with NER'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'ner' && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Extracted Fields</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Review and correct the extracted information:</p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="village" className="block text-sm font-medium text-gray-700">
                      Village
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="village"
                        id="village"
                        value={nerFields.village}
                        onChange={(e) => handleFieldChange('village', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="pattaId" className="block text-sm font-medium text-gray-700">
                      Patta ID
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="pattaId"
                        id="pattaId"
                        value={nerFields.pattaId}
                        onChange={(e) => handleFieldChange('pattaId', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="holderName" className="block text-sm font-medium text-gray-700">
                      Holder Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="holderName"
                        id="holderName"
                        value={nerFields.holderName}
                        onChange={(e) => handleFieldChange('holderName', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">
                      Coordinates
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="coordinates"
                        id="coordinates"
                        value={nerFields.coordinates}
                        onChange={(e) => handleFieldChange('coordinates', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep('ocr')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('geometry')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continue to Geometry
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'geometry' && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Claim Geometry</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Define the boundary of the claim on the map:</p>
                </div>
                
                <div className="mt-6">
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Map Editor</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Interactive map for drawing claim boundaries would be displayed here.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Draw Boundary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep('ner')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveClaim}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Claim
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Claim Created Successfully</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Your claim has been created and is ready for review.</p>
                </div>
                
                <div className="mt-6">
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Claim ID: CR-2023-045</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Village: {nerFields.village}</p>
                          <p>Holder: {nerFields.holderName}</p>
                          <p>Patta ID: {nerFields.pattaId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('upload');
                      setUploadedFiles([]);
                      setOcrText('');
                      setNerFields({
                        village: '',
                        pattaId: '',
                        holderName: '',
                        coordinates: '',
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Process Another Document
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Claim Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitizePage;