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
  const boatRadius = 12; // Approximate boat hitbox radius (reduced for smaller boat)

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
  // Calculate center of workshop
  const workshopCenterX = workshopPos.x + workshopWidth / 2;
  const workshopCenterY = workshopPos.y + workshopHeight / 2;

  // Calculate distance from boat to workshop center
  const dx = boatPos.x - workshopCenterX;
  const dy = boatPos.y - workshopCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Win if boat is within 100 pixels of the workshop center
  // This allows the boat to win by getting close to the iceberg with the workshop
  const proximityRadius = 100;

  return distance <= proximityRadius;
}
