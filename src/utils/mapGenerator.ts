import type { IcebergType, WorkshopType, Position } from '../types/game';

export function generateMap(mapWidth: number, mapHeight: number): { icebergs: IcebergType[], workshop: WorkshopType } {
  const icebergs: IcebergType[] = [];
  const numIcebergs = Math.floor((mapWidth * mapHeight) / 30000); // Density based on map size

  // Generate random icebergs
  for (let i = 0; i < numIcebergs; i++) {
    const iceberg: IcebergType = {
      id: `iceberg-${i}`,
      position: {
        x: Math.random() * mapWidth,
        y: Math.random() * mapHeight,
      },
      width: 40 + Math.random() * 60, // 40-100px
      height: 40 + Math.random() * 60, // 40-100px
      rotation: Math.random() * 360,
    };

    icebergs.push(iceberg);
  }

  // Place Santa's workshop far from start position
  // Start is at center, so place workshop in one of the corners/edges
  const workshopPlacements = [
    // Top portion
    { x: mapWidth / 2 + (Math.random() - 0.5) * (mapWidth * 0.4), y: mapHeight * 0.1 + Math.random() * (mapHeight * 0.15) },
    // Bottom portion
    { x: mapWidth / 2 + (Math.random() - 0.5) * (mapWidth * 0.4), y: mapHeight * 0.75 + Math.random() * (mapHeight * 0.15) },
    // Left portion
    { x: mapWidth * 0.1 + Math.random() * (mapWidth * 0.15), y: mapHeight / 2 + (Math.random() - 0.5) * (mapHeight * 0.4) },
    // Right portion
    { x: mapWidth * 0.75 + Math.random() * (mapWidth * 0.15), y: mapHeight / 2 + (Math.random() - 0.5) * (mapHeight * 0.4) },
  ];

  const randomPlacement = workshopPlacements[Math.floor(Math.random() * workshopPlacements.length)];

  const workshop: WorkshopType = {
    position: randomPlacement,
    width: 80,
    height: 80,
  };

  // Ensure no icebergs spawn too close to starting position (center of map)
  const startPosition: Position = { x: mapWidth / 2, y: mapHeight / 2 };
  const safeRadius = 150;

  // Ensure no icebergs spawn too close to workshop
  const workshopSafeRadius = 120;

  return {
    icebergs: icebergs.filter(iceberg => {
      const distToStart = Math.hypot(
        iceberg.position.x - startPosition.x,
        iceberg.position.y - startPosition.y
      );
      const distToWorkshop = Math.hypot(
        iceberg.position.x - workshop.position.x,
        iceberg.position.y - workshop.position.y
      );
      return distToStart > safeRadius && distToWorkshop > workshopSafeRadius;
    }),
    workshop,
  };
}
