import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import { withdrawFunds } from '../utils/interact'
import { initOnboard } from '../utils/onboard'
import Modal from '../Components/Modal'

export default function Withdraw() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const [onboard, setOnboard] = useState(null)
  const [isTransactionPending, setIsTransactionPending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [transactionStatus, setTransactionStatus] = useState('')
  const address1 = process.env.NEXT_PUBLIC_ADDRESS1.toLowerCase()
  const address2 = process.env.NEXT_PUBLIC_ADDRESS2.toLowerCase()

  useEffect(() => {
    setOnboard(initOnboard)
  }, [])

  useEffect(() => {
    if (!onboard) return

    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true
          }
        })
      }

      setWalletFromLocalStorage()
    }
  }, [onboard, connect])

  useEffect(() => {
    if (wallet) {
      const getConnectedAddress = async () => {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any'
        )
        const signer = provider.getSigner()
        const connectedAddress = await signer.getAddress()
        console.log('Connected address:', connectedAddress)
      }
      getConnectedAddress()
    }
  }, [wallet])

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function handleWithdraw() {
    if (!wallet) {
      alert('Please connect your wallet first.')
      return
    }

    setIsTransactionPending(true)
    setIsModalOpen(true)
    setModalMessage(
      'Hold on to your Grapes master Grapist.. your share of the booty is being transferred to your wallet.'
    )

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      const account = accounts[0]

      console.log('Account address in handleWithdraw:', account)

      if (account !== address1 && account !== address2) {
        alert("You're not allowed to withdraw funds.")
        return
      }

      const signer = provider.getSigner()
      const result = await withdrawFunds(signer)

      setIsTransactionPending(false)
      setModalMessage('Happy Graping!')
      setTransactionStatus(result.status)

      if (!result.success) {
        alert('Something went wrong while withdrawing funds.')
      }
    } catch (error) {
      console.error('Error in handleWithdraw:', error)
      alert('An error occurred while withdrawing funds.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h2 className="mb-4 text-4xl text-white">Withdraw funds</h2>
      <Modal
        isOpen={isModalOpen}
        isTransactionPending={isTransactionPending}
        message={modalMessage}
        onRequestClose={handleCloseModal}
      />
      {wallet && (
        <button
          className="mb-2 bg-red-500 transition duration-200 ease-in-out font-bold text-white px-4 py-2 rounded-md text-sm tracking-wide uppercase"
          onClick={() =>
            disconnect({
              label: wallet.label
            })
          }
        >
          Disconnect Wallet
        </button>
      )}
      <button
        className={`px-6 py-3 rounded-md text-xl font-bold ${
          wallet ? 'bg-purple-500' : 'bg-blue-500'
        } text-white hover:shadow-lg`}
        onClick={wallet ? handleWithdraw : () => connect()}
      >
        {wallet ? 'Withdraw Funds' : 'Connect Wallet'}
      </button>
    </div>
  )
}
