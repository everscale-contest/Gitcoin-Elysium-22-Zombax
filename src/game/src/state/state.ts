import { Contracts, State } from './stateTypes'

export const contracts: Contracts = {
  collection: "0:21f177d99ea2eaf852f56db37adbe7e102e15fcd07c2f1d22f4d01441f704347"
}

export let state: State = {
  // start vertical point of the terrain, 0 = very top; 1 = very bottom
  startTerrainHeight: 0.5,
  // max slope amplitude, in pixels
  amplitude: 100,
  // slope length range, in pixels
  slopeLength: [150, 350],
  // a mountain is a a group of slopes.
  mountainsAmount: 3,
  // amount of slopes for each mountain
  slopesPerMountain: 6,
  // car acceleration
  carAcceleration: 0.01,
  // maximum car velocity
  maxCarVelocity: 1,
  // rocks ratio, in %
  rocksRatio: 2,
  // mountain colors
  mountainColors: [0x39332D, 0x6C655E, 0x2d2c2c, 0x3a3232, 0x2d2c2c],
  // line width for each mountain color, in pixels
  mountainColorsLineWidth: [0, 70, 100, 110, 500],
  paused: false,
  ownedCars: [],
  onSaleCars: [],
  currentCar: null,
}
