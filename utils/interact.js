import { config } from '../dapp.config'
import { ethers } from 'ethers'

const contract = require('../artifacts/contracts/GrapeGrannys.sol/GrapeGrannys.json')

const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.NEXT_PUBLIC_INFURA_KEY
)

const nftContract = new ethers.Contract(
  config.contractAddress,
  contract.abi,
  provider
)

export const getTotalMinted = async () => {
  const totalMinted = await nftContract.totalSupply()
  return totalMinted.toString()
}

export const getMaxSupply = async () => {
  const maxSupply = await nftContract.maxSupply()
  return maxSupply.toString()
}

export const isPausedState = async () => {
  const paused = await nftContract.paused()
  return paused
}

export const publicMint = async (mintAmount, signer) => {
  try {
    const address = await signer.getAddress()
    console.log(`Minting ${mintAmount} tokens for address ${address}`)

    const contractWithSigner = nftContract.connect(signer)

    const tx = await contractWithSigner.publicSaleMint(mintAmount, {
      value: ethers.utils.parseUnits('0.025', 'ether').mul(mintAmount), // Calculate total cost
      gasLimit: 3000000
    })
    console.log('Transaction sent:', tx)

    const txReceipt = await tx.wait()
    console.log('Transaction receipt:', txReceipt)

    const txHash = txReceipt.transactionHash
    console.log('Transaction hash:', txHash)

    return {
      success: true,
      status: `Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/${txHash}`
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

  console.log('Inside withdrawFunds') // check if function is called

  try {
    const address = await signer.getAddress()

    console.log('Address in withdrawFunds:', address) // Add log

    console.log(`Withdrawing funds for address ${address}`)

    const contractWithSigner = nftContract.connect(signer)

    const tx = await contractWithSigner.withdrawFunds()
    console.log('Transaction sent:', tx)

    const txReceipt = await tx.wait()
    console.log('Transaction receipt:', txReceipt)

    const txHash = txReceipt.transactionHash
    console.log('Transaction hash:', txHash)

    return {
      success: true,
      status: `Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/${txHash}`
    }
  } catch (error) {
    console.error('Error withdrawing funds:', error)
    return {
      success: false,
      status: 'Something went wrong: ' + JSON.stringify(error.message)
    }
  }
}
