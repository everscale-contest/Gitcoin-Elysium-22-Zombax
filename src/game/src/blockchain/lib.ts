import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

import { contracts, state } from '../state/state'
import { CarToken } from '../state/stateTypes'

const CollectionAbi = require('./abi/Collection.abi.json')

declare var window: any
let contract: any

const ever = new ProviderRpcClient({
  fallback: () =>
    EverscaleStandaloneClient.create({
      //@ts-ignore
      connection: 'testnet',
    }),
});

export const connectWallet = async () => {
  await ever.ensureInitialized();
  await ever.requestPermissions({
    permissions: ['basic'],
  });
  const contractAddress = new Address(contracts.collection);
  contract = new ever.Contract(CollectionAbi, contractAddress);
}

export const getCars = async () => {
  // const ownedCarsIds = await carsContractWithSigner.getTokensOwnedByMe()
  // ownedCarsIds.forEach(async (ownedCarsId) => {
  //   const carMeta = await carsContractWithSigner.tokenMeta(ownedCarsId)
  //   state.ownedCars.push({
  //     tokenId: carMeta[0].toNumber(),
  //     carCode: carMeta[3].replace('https://ever.zombax.io/assets/cars/', '').replace('.json', ''),
  //     price: carMeta[1].toNumber(),
  //     owned: true,
  //   })
  // })
  // console.log(state.ownedCars)

  // const onSaleCarsIds = await carsContractWithSigner.getAllOnSale()
  // onSaleCarsIds.forEach(async (onSaleCar) => {
  //   state.onSaleCars.push({
  //     tokenId: onSaleCar[0].toNumber(),
  //     carCode: onSaleCar[3].replace('https://ever.zombax.io/assets/cars/', '').replace('.json', ''),
  //     price: onSaleCar[1].toNumber(),
  //     owned: false,
  //   })
  // })
  // console.log(state.onSaleCars)
}

export const mintRandomCar = async () => {
  // const receipt = await carsContractWithSigner.randomMint()
  // //   {
  // //   value: 10000000,
  // // })
  // const tx = await receipt.wait()
  // console.log(tx)
}

export const buyCar = async (carToken: CarToken) => {
  // const receipt = await carsContractWithSigner.purchaseToken(carToken.tokenId, {
  //   value: carToken.price,
  // })
  // const tx = await receipt.wait()
  // console.log(tx)
}

export const sellCar = async (carToken: CarToken, price: number) => {
  // const receipt = await carsContractWithSigner.setTokenSale(carToken.tokenId, true, price)
  // const tx = await receipt.wait()
  // console.log(tx)
}

export const upgradeCar = async (carToken: CarToken) => {
  // const receipt = await carsContractWithSigner.updateTokenUri(
  //   carToken.tokenId,
  //   `https://ever.zombax.io/assets/cars/${carToken.carCode}.json`,
  // )
  // const tx = await receipt.wait()
  // console.log(tx)
}
