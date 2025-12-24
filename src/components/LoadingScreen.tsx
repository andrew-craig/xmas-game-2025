import React from 'react';

interface LoadingScreenProps {
  onStart: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-300 to-blue-400 flex items-center justify-center">
      <div className="text-center">
        {/* Two Labradors driving a boat - CSS illustration */}
        <div className="relative w-80 h-48 mx-auto mb-8">
          {/* Boat body */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-16 bg-blue-600 rounded-t-3xl"
               style={{ clipPath: 'polygon(15% 100%, 0% 40%, 100% 40%, 85% 100%)' }}>
          </div>

          {/* Windshield */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-12 bg-white/40 rounded-t-lg border-2 border-white border-b-0 z-20"></div>

          {/* Yellow Labrador dog (left) */}
          <div className="absolute bottom-20 left-1/2 -translate-x-full -ml-4 w-16 h-16 z-10">
            {/* Dog head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-300 rounded-full"></div>
            {/* Snout */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-6 bg-yellow-200 rounded-full"></div>
            {/* Ears */}
            <div className="absolute top-2 left-0 w-5 h-8 bg-yellow-500 rounded-full"></div>
            <div className="absolute top-2 right-0 w-5 h-8 bg-yellow-500 rounded-full"></div>
            {/* Eyes */}
            <div className="absolute top-4 left-5 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-4 right-5 w-2 h-2 bg-black rounded-full"></div>
            {/* Nose */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
          </div>

          {/* Amber Labrador dog (right) */}
          <div className="absolute bottom-20 left-1/2 ml-4 w-16 h-16 z-10">
            {/* Dog head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400 rounded-full"></div>
            {/* Snout */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-6 bg-amber-300 rounded-full"></div>
            {/* Ears */}
            <div className="absolute top-2 left-0 w-5 h-8 bg-amber-600 rounded-full"></div>
            <div className="absolute top-2 right-0 w-5 h-8 bg-amber-600 rounded-full"></div>
            {/* Eyes */}
            <div className="absolute top-4 left-5 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-4 right-5 w-2 h-2 bg-black rounded-full"></div>
            {/* Nose */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
          </div>

        </div>

        <h1 className="text-2xl font-bold text-white mb-6">Help Jessie and Ava save Santa</h1>
        <p className="text-xl text-white opacity-90 mb-8">Tap to move the boat and find Santa's workshop amongst the melting ice</p>

        <button
          onClick={onStart}
          className="bg-red-600 hover:bg-red-700 text-blue-900 font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Start
        </button>
      </div>
    </div>
  );
};
