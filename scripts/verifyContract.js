/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

 const hre = require('hardhat')
 
 const BASE_URI = 'ipfs://Qmec5zctQn3QE2dWtF5AKBB9YnoRmTw12zMWLNaiK3kYQ2/'

 async function main() {
 
   await hre.run('verify:verify', {
     address: '0xe73F2E8085B8a88442dcc5E0FBF42CCaa77ACaF0', // Deployed contract address
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