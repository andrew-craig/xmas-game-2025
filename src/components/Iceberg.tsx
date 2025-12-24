import React from 'react';
import type { IcebergType } from '../types/game';

interface IcebergProps {
  iceberg: IcebergType;
}

export const Iceberg: React.FC<IcebergProps> = ({ iceberg }) => {
  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${iceberg.position.x}px`,
        top: `${iceberg.position.y}px`,
        width: `${iceberg.width}px`,
        height: `${iceberg.height}px`,
        transform: `rotate(${iceberg.rotation}deg)`,
      }}
    >
      {/* Main iceberg body - irregular polygon shape */}
      <div
        className="w-full h-full bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-lg"
        style={{
          clipPath: 'polygon(50% 0%, 80% 15%, 100% 40%, 90% 70%, 70% 90%, 30% 95%, 10% 75%, 0% 45%, 20% 20%)',
        }}
      >
        {/* Ice highlights */}
        <div className="absolute top-2 left-4 w-3 h-3 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60"></div>
      </div>
    </div>
  );
};
