import React from 'react';
import type { BoatType } from '../types/game';

interface BoatProps {
  boat: BoatType;
}

export const Boat: React.FC<BoatProps> = ({ boat }) => {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-100 ease-linear"
      style={{
        left: `${boat.position.x}px`,
        top: `${boat.position.y}px`,
        transform: `translate(-50%, -50%) rotate(${boat.rotation}deg)`,
      }}
    >
      {/* Blue speed boat - triangle shape pointing up */}
      <div className="relative w-12 h-16">
        {/* Main boat body - triangle */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600"
          style={{
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          }}
        ></div>

        {/* Boat sides for 3D effect */}
        <div
          className="absolute inset-0 bg-blue-500 opacity-50"
          style={{
            clipPath: 'polygon(50% 0%, 80% 90%, 20% 90%)',
          }}
        ></div>

        {/* White wake/foam at back */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white rounded-full opacity-70"></div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-2 bg-white rounded-full opacity-50"></div>

        {/* Cockpit window */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-sky-200 bg-opacity-60 rounded-sm"></div>
      </div>
    </div>
  );
};
