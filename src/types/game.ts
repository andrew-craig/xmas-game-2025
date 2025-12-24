export type Position = {
  x: number;
  y: number;
}

export type IcebergType = {
  id: string;
  position: Position;
  width: number;
  height: number;
  rotation: number;
}

export type BoatType = {
  position: Position;
  targetPosition: Position | null;
  rotation: number;
  speed: number;
}

export type WorkshopType = {
  position: Position;
  width: number;
  height: number;
}

export type GameState = {
  boat: BoatType;
  icebergs: IcebergType[];
  workshop: WorkshopType;
  gameStatus: 'loading' | 'playing' | 'won';
  mapSize: {
    width: number;
    height: number;
  };
}
