import React from 'react';
import type { BoatType } from '../types/game';

interface BoatProps {
  boat: BoatType;
}

export const Boat: React.FC<BoatProps> = ({ boat }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${boat.position.x}px`,
        top: `${boat.position.y}px`,
        transform: `translate(-50%, -50%) rotate(${boat.rotation}deg)`,
      }}
    >
      <img
        src="/assets/boat.svg"
        alt="Boat"
        className="w-11 h-[42.5px]"
      />
    </div>
  );
};
