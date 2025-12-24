import React from 'react';

interface LoadingScreenProps {
  onStart: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-300 to-blue-400 flex items-center justify-center">
      <div className="text-center">
        {/* Labrador driving a boat - CSS illustration */}
        <div className="relative w-64 h-48 mx-auto mb-8">
          {/* Boat body */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-16 bg-blue-600 rounded-t-3xl"
               style={{ clipPath: 'polygon(15% 100%, 0% 40%, 100% 40%, 85% 100%)' }}>
          </div>

          {/* Boat base */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 h-6 bg-blue-700 rounded-full"></div>

          {/* Windshield */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-12 bg-sky-200 bg-opacity-40 rounded-t-lg border-2 border-white"></div>

          {/* Labrador dog */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-16 z-10">
            {/* Dog head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-700 rounded-full"></div>
            {/* Snout */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-6 bg-yellow-600 rounded-full"></div>
            {/* Ears */}
            <div className="absolute top-2 left-0 w-5 h-8 bg-yellow-800 rounded-full"></div>
            <div className="absolute top-2 right-0 w-5 h-8 bg-yellow-800 rounded-full"></div>
            {/* Eyes */}
            <div className="absolute top-4 left-2 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-4 right-2 w-2 h-2 bg-black rounded-full"></div>
            {/* Nose */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
          </div>

          {/* Water waves */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-around">
            <div className="w-12 h-2 bg-white rounded-full opacity-60"></div>
            <div className="w-16 h-2 bg-white rounded-full opacity-60"></div>
            <div className="w-12 h-2 bg-white rounded-full opacity-60"></div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Find Santa's Workshop</h1>
        <p className="text-xl text-white opacity-90 mb-8">Help the Labrador navigate through the waters!</p>

        <button
          onClick={onStart}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
