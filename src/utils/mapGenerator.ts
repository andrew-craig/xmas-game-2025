import type { IcebergType, WorkshopType, Position } from '../types/game';

export function generateMap(mapWidth: number, mapHeight: number): { icebergs: IcebergType[], workshop: WorkshopType } {
  const icebergs: IcebergType[] = [];
  const numIcebergs = Math.floor((mapWidth * mapHeight) / 15000); // Density based on map size

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

  // Place Santa's workshop far from start (top portion of map)
  // Start is at bottom, so workshop should be in top 30% of map
  const workshop: WorkshopType = {
    position: {
      x: mapWidth / 2 + (Math.random() - 0.5) * (mapWidth * 0.4),
      y: mapHeight * 0.15 + Math.random() * (mapHeight * 0.15), // Between 15% and 30% from top
    },
    width: 80,
    height: 80,
  };

  // Ensure no icebergs spawn too close to starting position (bottom center)
  const startPosition: Position = { x: mapWidth / 2, y: mapHeight - 100 };
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
