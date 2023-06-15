const hre = require('hardhat')
//  const config = require('../dapp.config')

// This is the base URI for the json metadata
const BASE_URI = 'ipfs://QmWqsna6DCQFgGnZvPgiWQUbpcinTwZpktvUgH4QJFxZpz/'

async function main() {
  // Deploy the contract
  const GrapeGrannys = await hre.ethers.getContractFactory('GrapeGrannys')
  const grapeGrannys = await GrapeGrannys.deploy(BASE_URI)

  await grapeGrannys.deployed()

  let receipt = await grapeGrannys.deployTransaction.wait()
  console.log('Gas Used in Deployment: ', receipt.gasUsed.toString())
  console.log('GrapeGrannys deployed to:', grapeGrannys.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
