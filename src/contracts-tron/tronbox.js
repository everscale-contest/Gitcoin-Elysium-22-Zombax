const port = process.env.HOST_PORT || 9090

module.exports = {
  networks: {
    mainnet: {
      privateKey: process.env.PRIVATE_KEY,
      userFeePercentage: 100,
      feeLimit: 1e9,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: process.env.PRIVATE_KEY,
      userFeePercentage: 50,
      feeLimit: 1e9,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '2'
    },
    nile: {
      privateKey: process.env.PRIVATE_KEY,
      userFeePercentage: 100,
      feeLimit: 1e9,
      fullHost: 'https://api.nileex.io',
      network_id: '3'
    },
    development: {
      // For trontools/quickstart docker image
      privateKey: process.env.PRIVATE_KEY,
      userFeePercentage: 0,
      feeLimit: 1e9,
      fullHost: 'http://127.0.0.1:' + port,
      network_id: '9'
    },
    compilers: {
      solc: {
        version: '0.8.6'
      }
    }
  }
}
