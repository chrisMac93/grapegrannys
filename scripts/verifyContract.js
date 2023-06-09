/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

 const hre = require('hardhat')
 
 const BASE_URI = 'ipfs://QmVPMstajWwnhRxraUypur5v9H7CzCnbiQzrDPeGbfsibt/'

 async function main() {
 
   await hre.run('verify:verify', {
     address: '0x5A2A2C0D392a2244Bf3649bE0278Ea5a7C756291', // Deployed contract address
     constructorArguments: [BASE_URI]
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