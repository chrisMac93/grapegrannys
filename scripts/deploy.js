
 const hre = require('hardhat')
 
 // This is the base URI for the json metadata
 const BASE_URI = 'ipfs://QmVPMstajWwnhRxraUypur5v9H7CzCnbiQzrDPeGbfsibt/';
 
 async function main() {
 
   // Deploy the contract
   const GrapeGrannys = await hre.ethers.getContractFactory('GrapeGrannys')
   const grapeGrannys = await GrapeGrannys.deploy(
     BASE_URI
   )
 
   await grapeGrannys.deployed()
 
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