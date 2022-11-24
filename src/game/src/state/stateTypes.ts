export type CarToken = {
  tokenId: number
  carCode: string
  price: number
  owned: boolean
}

export type State = {
  startTerrainHeight: number,
  amplitude: number,
  slopeLength: number[],
  mountainsAmount: number,
  slopesPerMountain: number,
  carAcceleration: number,
  maxCarVelocity: number,
  rocksRatio: number,
  mountainColors: number[],
  mountainColorsLineWidth: number[],
  paused: boolean,
  ownedCars: CarToken[],
  onSaleCars: CarToken[],
  currentCar: CarToken | null,
}

export type Contracts = {
    collection: string
}
