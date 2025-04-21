import React from "react";

const TailwindTest = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-gray-800">Tailwind Test</h2>

      {/* Custom colors test */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary Colors</h3>
        <div className="flex space-x-2">
          <div className="w-10 h-10 bg-primary-50 rounded"></div>
          <div className="w-10 h-10 bg-primary-100 rounded"></div>
          <div className="w-10 h-10 bg-primary-200 rounded"></div>
          <div className="w-10 h-10 bg-primary-300 rounded"></div>
          <div className="w-10 h-10 bg-primary-400 rounded"></div>
          <div className="w-10 h-10 bg-primary-500 rounded"></div>
          <div className="w-10 h-10 bg-primary-600 rounded"></div>
          <div className="w-10 h-10 bg-primary-700 rounded"></div>
          <div className="w-10 h-10 bg-primary-800 rounded"></div>
          <div className="w-10 h-10 bg-primary-900 rounded text-white flex items-center justify-center">
            900
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Secondary Color</h3>
        <div className="flex space-x-2">
          <div className="w-10 h-10 bg-secondary-500 rounded"></div>
        </div>
      </div>

      {/* Button tests */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex space-x-2">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">
            Primary
          </button>
          <button className="bg-secondary-500 hover:bg-opacity-90 text-white px-4 py-2 rounded">
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
