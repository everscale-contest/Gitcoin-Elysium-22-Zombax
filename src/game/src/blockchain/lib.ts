import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'
import axios from 'axios'
const { BigNumber } = require('ethers')

import { contracts, state } from '../state/state'
import { CarToken } from '../state/stateTypes'

const CollectionAbi = require('./abi/Collection.abi.json')
const NftAbi = require('./abi/Nft.abi.json')
const NftIndexHelperAbi = require('./abi/NftIndexHelper.abi.json')

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
  // Get Index Code Hash
//   const nftIndexHelperContractAddress = new Address(
//     '0:b5c6d8226ebf452d2dbb1e6f957347fedaa5c3ac93fd8250ee6899a660c0297b',
//   )
//   const nftIndexHelperContract = new ever.Contract(NftIndexHelperAbi, nftIndexHelperContractAddress)
//   const output = await nftIndexHelperContract.methods
//     //@ts-ignore
//     .indexCodeHash({ collection: contracts.collection, owner: selectedAddress, answerId: 0 })
//     .call()
//   const indexCodeHash = BigNumber.from(output.indexCodeHash).toHexString().replace('0x', '')

//   // Get NFTs
//   var data = JSON.stringify({
//     query: `query {
//   accounts (
//     filter : {
//       code_hash :{eq : "${indexCodeHash}"}
//     },
//   )
//   {
//       id
//   }
// }`,
//     variables: {},
//   })

//   var config = {
//     method: 'post',
//     url: 'https://devnet-sandbox.evercloud.dev/graphql',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   }

//   const result = await axios(config)
//   console.log(result.data.data.accounts[3].id)

//   // Get NFTs info
//   const nftContractAddress = new Address(result.data.data.accounts[3].id)
//   const nftContract = new ever.Contract(NftAbi, nftContractAddress)
//   //@ts-ignore
//   const output2 = await nftContract.methods.getInfo({ answerId: 0 }).call()
//   console.log(output2)
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
