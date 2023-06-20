const hre = require('hardhat')
const config = require('../dapp.config')

async function main() {
  await hre.run('verify:verify', {
    address: '0x755a0ab54a326bea120684e116f519fe490a8ed6', // Deployed contract address
    constructorArguments: [config.BASE_URI]
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
