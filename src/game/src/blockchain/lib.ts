import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'

import { contracts, state } from '../state/state'
import { CarToken } from '../state/stateTypes'

const CollectionAbi = require('./abi/Collection.abi.json')
const NftAbi = require('./abi/Nft.abi.json')

declare var window: any
let contract: any
let selectedAddress: any

const json = {
  type: 'Basic NFT',
  name: 'Zombax Smasher',
  description: 'Kill zombies! Upgrade your smasher! Kill more zombies!',
  preview: {
    source: 'https://ever.zombax.io/assets/cars/00000000.svg',
    mimetype: 'image/svg',
  },
  files: [
    {
      source: 'https://ever.zombax.io/assets/cars/00000000.svg',
      mimetype: 'image/svg',
    },
  ],
  external_url: 'https://ever.zombax.io',
}

const ever = new ProviderRpcClient({
  fallback: () =>
    EverscaleStandaloneClient.create({
      //@ts-ignore
      connection: 'testnet',
    }),
})

export const connectWallet = async () => {
  await ever.ensureInitialized()
  const { accountInteraction } = await ever.requestPermissions({
    permissions: ['basic', 'accountInteraction'],
  })
  const contractAddress = new Address(contracts.collection)
  contract = new ever.Contract(CollectionAbi, contractAddress)
  selectedAddress = accountInteraction?.address
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

  const output = await contract.methods.indexBasisCodeHash({ answerId: 0 }).call()
  console.log(output)
}

export const mintBasicCar = async () => {
  try {
    const output = await contract.methods.mintNft({ json: JSON.stringify(json) }).send({
      from: selectedAddress,
      amount: '1000000000',
      bounce: true,
    })

    state.ownedCars.push({
      tokenId: '0:452de784c62428be748484e7f015ade367c177068afe7f5ff7b2ded1cf53615c',
      carCode: '00000000',
      price: 0,
      owned: true,
    })

    console.log(state)
  } catch (e) {
    if (e instanceof TvmException) {
      console.error(e)
    }
  }
}

export const buyCar = async (carToken: CarToken) => {
  // TODO
}

export const sellCar = async (carToken: CarToken, price: number) => {
  // TODO
}

export const upgradeCar = async (carToken: CarToken) => {
  try {
    const nftContractAddress = new Address(carToken.tokenId)
    const nftContract = new ever.Contract(NftAbi, nftContractAddress)
    //@ts-ignore
    const output = await nftContract.methods.setRarity({ rarity: 'custom' }).send({
      from: selectedAddress,
      amount: '1000000000',
      bounce: true,
    })

    console.log(output)
  } catch (e) {
    if (e instanceof TvmException) {
      console.error(e)
    }
  }
}
