import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { config } from '../dapp.config'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

function MintedModal({ status, open, handleClose }) {
  const [tokenIds, setTokenIds] = useState([])
  const [library, setLibrary] = useState(null)

  useEffect(() => {
    async function setupWeb3() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            'any'
          )
          setLibrary(provider)
        } catch (error) {
          console.error(
            'Failed to load web3, accounts, or contract. Check console for details.'
          )
          console.error(error)
        }
      } else {
        alert('Ethereum browser extension like MetaMask is required!')
      }
    }
    setupWeb3()
  }, [])

  useEffect(() => {
    async function getTokenIds() {
      if (status && status.receipt && library) {
        const receipt = await library.getTransactionReceipt(
          status.receipt.transactionHash
        )
        const tokenIds = receipt.events
          .filter(
            (event) =>
              event.event === 'Transfer' &&
              event.args.to.toLowerCase() === status.account
          )
          .map((event) => event.args.tokenId.toString())

        setTokenIds(tokenIds)
      }
    }
    getTokenIds()
  }, [status, library])

  const nftImageBaseURL =
    'https://gateway.pinata.cloud/ipfs/QmNowgK88MhMFt6c9mDtWdZzYQoFVK8b4GpWBc61HnRg39/'

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {'Congratulations on your minted GrapeGranny NFT!'}
      </DialogTitle>
      <DialogContent>
        {tokenIds.map((tokenId) => (
          <div key={tokenId}>
            <img
              src={`${nftImageBaseURL}${tokenId}.png`}
              alt={`NFT ${tokenId}`}
              style={{ width: '100%' }}
            />
            <p>{`View it on OpenSea, or import it into your wallet by pasting the contract address below and the token id.`}</p>
            <p>{`Token Id: ${tokenId}`}</p>
            <p>{`OpenSea Link: https://opensea.io/assets/${config.contractAddress}/${tokenId}.png`}</p>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MintedModal
