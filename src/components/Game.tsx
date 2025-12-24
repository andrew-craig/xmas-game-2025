import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Map } from './Map';
import type { GameState } from '../types/game';
import { generateMap } from '../utils/mapGenerator';
import { checkBoatIcebergCollision, checkBoatWorkshopCollision } from '../utils/collision';

const MAX_BOAT_SPEED = 2;
const BOAT_ACCELERATION = 0.15;

// Calculate map dimensions based on viewport
const calculateMapDimensions = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Map width is 3x viewport width, capped at 2000px
  const mapWidth = Math.min(viewportWidth * 3, 2000);

  // Map height is also 3x viewport height to create a larger playable area
  const mapHeight = viewportHeight * 3;

  return { width: mapWidth, height: mapHeight };
};

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const { width: MAP_WIDTH, height: MAP_HEIGHT } = calculateMapDimensions();
    const { icebergs, workshop } = generateMap(MAP_WIDTH, MAP_HEIGHT);

    return {
      boat: {
        position: { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }, // Start in center
        targetPosition: null,
        rotation: 0,
        speed: 0,
      },
      icebergs,
      workshop,
      gameStatus: 'playing',
      mapSize: { width: MAP_WIDTH, height: MAP_HEIGHT },
    };
  });

  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Center camera on boat
  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setCameraOffset({
      x: Math.max(0, Math.min(gameState.boat.position.x - viewportWidth / 2, gameState.mapSize.width - viewportWidth)),
      y: Math.max(0, Math.min(gameState.boat.position.y - viewportHeight / 2, gameState.mapSize.height - viewportHeight)),
    });
  }, [gameState.boat.position.x, gameState.boat.position.y, gameState.mapSize.width, gameState.mapSize.height]);

  const handleMapClick = useCallback((x: number, y: number) => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState((prev) => ({
      ...prev,
      boat: {
        ...prev.boat,
        targetPosition: { x, y },
      },
    }));
  }, [gameState.gameStatus]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      setGameState((prev) => {
        if (prev.gameStatus !== 'playing') {
          return prev;
        }

        // If no target, decelerate to stop
        if (!prev.boat.targetPosition) {
          if (prev.boat.speed > 0) {
            return {
              ...prev,
              boat: {
                ...prev.boat,
                speed: Math.max(0, prev.boat.speed - BOAT_ACCELERATION),
              },
            };
          }
          return prev;
        }

        const dx = prev.boat.targetPosition.x - prev.boat.position.x;
        const dy = prev.boat.targetPosition.y - prev.boat.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Accelerate towards max speed
        const newSpeed = Math.min(MAX_BOAT_SPEED, prev.boat.speed + BOAT_ACCELERATION);

        // Stop if reached target
        if (distance < newSpeed) {
          return {
            ...prev,
            boat: {
              ...prev.boat,
              position: prev.boat.targetPosition,
              targetPosition: null,
              speed: 0,
            },
          };
        }

        // Calculate new position
        const angle = Math.atan2(dy, dx);
        const newX = prev.boat.position.x + Math.cos(angle) * newSpeed;
        const newY = prev.boat.position.y + Math.sin(angle) * newSpeed;
        const newPosition = { x: newX, y: newY };

        // Check collision with icebergs
        const collidedIceberg = checkBoatIcebergCollision(newPosition, prev.icebergs);

        if (collidedIceberg) {
          // Stop the boat if collision detected
          return {
            ...prev,
            boat: {
              ...prev.boat,
              targetPosition: null,
              speed: 0,
            },
          };
        }

        // Calculate rotation (pointing towards target)
        const rotation = (angle * 180) / Math.PI + 90; // +90 to align with boat's up-facing design

        // Check if reached workshop
        const reachedWorkshop = checkBoatWorkshopCollision(
          newPosition,
          prev.workshop.position,
          prev.workshop.width,
          prev.workshop.height
        );

        return {
          ...prev,
          boat: {
            ...prev.boat,
            position: newPosition,
            rotation,
            speed: newSpeed,
          },
          gameStatus: reachedWorkshop ? 'won' : prev.gameStatus,
        };
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-blue-900">
      {/* Viewport window */}
      <div
        className="absolute"
        style={{
          transform: `translate(-${cameraOffset.x}px, -${cameraOffset.y}px)`,
        }}
      >
        <Map gameState={gameState} onMapClick={handleMapClick} />
      </div>

      {/* Victory overlay */}
      {gameState.gameStatus === 'won' && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 text-center max-w-md">
            <h1 className="text-4xl font-bold text-red-600 mb-4">You Found Santa!</h1>
            <p className="text-xl text-gray-700 mb-6">
              Congratulations! You've successfully navigated through the Arctic waters and found Santa's Workshop!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
