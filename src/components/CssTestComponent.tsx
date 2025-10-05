import React from 'react';

const CssTestComponent: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">CSS Test Component</h1>
      <p className="text-lg mb-4">If you see styled text and layout, CSS is working.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="font-bold text-red-800">Red Box</h2>
          <p className="text-red-600">This should have a red background</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="font-bold text-green-800">Green Box</h2>
          <p className="text-green-600">This should have a green background</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded shadow md:col-span-2">
          <h2 className="font-bold text-blue-800">Blue Box</h2>
          <p className="text-blue-600">This should have a blue background and span full width on mobile, half width on desktop</p>
        </div>
      </div>
      
      <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
        Purple Button with Hover Effect
      </button>
    </div>
  );
};

export default CssTestComponent;