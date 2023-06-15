import { config } from '../dapp.config'
import { ethers } from 'ethers'

const contractArtifact = require('../artifacts/contracts/GrapeGrannys.sol/GrapeGrannys.json')

let nftContract = null

const getContract = (network) => {
  if (!nftContract) {
    const provider = new ethers.providers.InfuraProvider(
      network,
      process.env.NEXT_PUBLIC_INFURA_KEY
    )
    nftContract = new ethers.Contract(
      config.contractAddress,
      contractArtifact.abi,
      provider
    )
  }
  return nftContract
}

export const getTotalMinted = async () => {
  try {
    const totalMinted = await getContract('mainnet').totalSupply()
    return totalMinted.toString()
  } catch (error) {
    console.error('Error getting total minted:', error)
    throw error
  }
}

export const getMaxSupply = async () => {
  try {
    const maxSupply = await getContract('mainnet').maxSupply()
    return maxSupply.toString()
  } catch (error) {
    console.error('Error getting max supply:', error)
    throw error
  }
}

export const isPausedState = async () => {
  try {
    const paused = await getContract('mainnet').paused()
    return paused
  } catch (error) {
    console.error('Error getting paused state:', error)
    throw error
  }
}

export const publicMint = async (mintAmount, signer) => {
  try {
    const address = await signer.getAddress()
    console.log(`Minting ${mintAmount} tokens for address ${address}`)

    const contractWithSigner = getContract('mainnet').connect(signer)

    const tx = await contractWithSigner.publicSaleMint(mintAmount, {
      value: ethers.utils.parseUnits(config.price.toString(), 'ether').mul(mintAmount), // Calculate total cost
      gasLimit: 3000000
    })
    console.log('Transaction sent:', tx)

    const txReceipt = await tx.wait()
    console.log('Transaction receipt:', txReceipt)

    const txHash = txReceipt.transactionHash
    console.log('Transaction hash:', txHash)

    return {
      success: true,
      receipt: txReceipt, // Include the receipt in the return value
      status: `Check out your transaction on Etherscan: https://etherscan.io/tx/${txHash}`
    }
  } catch (error) {
    console.error('Error minting tokens:', error)
    return {
      success: false,
      status: 'Something went wrong: ' + JSON.stringify(error.message)
    }
  }
}

export const withdrawFunds = async (signer) => {
  try {
    const address = await signer.getAddress()
    console.log(`Withdrawing funds for address ${address}`)

    const contractWithSigner = getContract('mainnet').connect(signer)

    const tx = await contractWithSigner.withdrawFunds()
    console.log('Transaction sent:', tx)

    const txReceipt = await tx.wait()
    console.log('Transaction receipt:', txReceipt)

    const txHash = txReceipt.transactionHash
    console.log('Transaction hash:', txHash)

    return {
      success: true,
      status: `Check out your transaction on Etherscan: https://etherscan.io/tx/${txHash}`
    }
  } catch (error) {
    console.error('Error withdrawing funds:', error)
    return {
      success: false,
      status: 'Something went wrong: ' + JSON.stringify(error.message)
    }
  }
}
