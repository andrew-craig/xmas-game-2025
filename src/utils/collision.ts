import type { Position, IcebergType } from '../types/game';

export function checkCircleRectCollision(
  circlePos: Position,
  circleRadius: number,
  rectPos: Position,
  rectWidth: number,
  rectHeight: number
): boolean {
  // Find the closest point on the rectangle to the circle
  const closestX = Math.max(rectPos.x, Math.min(circlePos.x, rectPos.x + rectWidth));
  const closestY = Math.max(rectPos.y, Math.min(circlePos.y, rectPos.y + rectHeight));

  // Calculate distance from circle center to closest point
  const distanceX = circlePos.x - closestX;
  const distanceY = circlePos.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  return distanceSquared < circleRadius * circleRadius;
}

export function checkBoatIcebergCollision(
  boatPos: Position,
  icebergs: IcebergType[]
): IcebergType | null {
  const boatRadius = 20; // Approximate boat hitbox radius

  for (const iceberg of icebergs) {
    if (
      checkCircleRectCollision(
        boatPos,
        boatRadius,
        iceberg.position,
        iceberg.width,
        iceberg.height
      )
    ) {
      return iceberg;
    }
  }

  return null;
}

export function checkBoatWorkshopCollision(
  boatPos: Position,
  workshopPos: Position,
  workshopWidth: number,
  workshopHeight: number
): boolean {
  const boatRadius = 20;
  return checkCircleRectCollision(boatPos, boatRadius, workshopPos, workshopWidth, workshopHeight);
}
