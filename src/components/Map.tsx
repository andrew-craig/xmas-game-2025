import React from 'react';
import { Iceberg as IcebergComponent } from './Iceberg';
import { Boat as BoatComponent } from './Boat';
import type { GameState } from '../types/game';

interface MapProps {
  gameState: GameState;
  onMapClick: (x: number, y: number) => void;
  cameraOffset: { x: number; y: number };
}

export const Map: React.FC<MapProps> = ({ gameState, onMapClick, cameraOffset }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + cameraOffset.x;
    const y = e.clientY - rect.top + cameraOffset.y;
    onMapClick(x, y);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left + cameraOffset.x;
    const y = touch.clientY - rect.top + cameraOffset.y;
    onMapClick(x, y);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 cursor-pointer touch-none"
      style={{
        width: `${gameState.mapSize.width}px`,
        height: `${gameState.mapSize.height}px`,
      }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
    >
      {/* Water texture effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-600 to-transparent animate-pulse"></div>
      </div>

      {/* Icebergs */}
      {gameState.icebergs.map((iceberg) => (
        <IcebergComponent key={iceberg.id} iceberg={iceberg} />
      ))}

      {/* Santa's Workshop */}
      <div
        className="absolute"
        style={{
          left: `${gameState.workshop.position.x}px`,
          top: `${gameState.workshop.position.y}px`,
          width: `${gameState.workshop.width}px`,
          height: `${gameState.workshop.height}px`,
        }}
      >
        {/* Workshop building */}
        <div className="relative w-full h-full">
          {/* Roof */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-12 bg-gradient-to-b from-red-600 to-red-700"
            style={{
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          ></div>

          {/* Building body */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-b from-red-800 to-red-900 border-2 border-red-950"></div>

          {/* Door */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-6 h-10 bg-yellow-900 border border-yellow-950"></div>

          {/* Windows */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 -ml-7 w-4 h-4 bg-yellow-300 border border-yellow-600"></div>
          <div className="absolute top-12 left-1/2 -translate-x-1/2 ml-3 w-4 h-4 bg-yellow-300 border border-yellow-600"></div>

          {/* Chimney */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 ml-4 w-3 h-6 bg-red-950"></div>

          {/* Snow on roof */}
          <div className="absolute top-9 left-1/2 -translate-x-1/2 w-20 h-2 bg-white rounded-full"></div>

          {/* Christmas lights */}
          <div className="absolute top-10 left-0 right-0 flex justify-around">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
          </div>
        </div>
      </div>

      {/* Player boat */}
      <BoatComponent boat={gameState.boat} />
    </div>
  );
};
