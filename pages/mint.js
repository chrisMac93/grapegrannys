import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { initOnboard } from '../utils/onboard'
import { useConnectWallet, useWallets } from '@web3-onboard/react'
import { config } from '../dapp.config'
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  publicMint
} from '../utils/interact'

import MintedModal from '../Components/MintedModal'
import Modal from '../Components/Modal'

import Image from 'next/image'
import fractalPic from '../public/images/fractal.jpg'
import GrannyImage from '../public/images/home.png'
import Link from 'next/link'

export default function mint() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const [onboard, setOnboard] = useState(null)
  const connectedWallets = useWallets()

  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(10)
  const [paused, setPaused] = useState(false)

  const [status, setStatus] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false)
  const [transactionPending, setTransactionPending] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setOnboard(initOnboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets])

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
    const init = async () => {
      try {
        setMaxSupply(await getMaxSupply())
        setTotalMinted(await getTotalMinted())
        setPaused(await isPausedState())
      } catch (error) {
        console.error('Error initializing mint page:', error)
        // Handle the error here, e.g., show an error message to the user
      }
    }

    init()
  }, [])

  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1 && mintAmount <= maxMintAmount) {
      setMintAmount(mintAmount - 1)
    }
  }

  const publicMintHandler = async () => {
    // Check if wallet is connected
    if (!wallet) {
      setStatus({
        success: false,
        message: 'No wallet connected!'
      })
      return
    }

    // Check if the contract is paused
    if (paused) {
      setStatus({
        success: false,
        message: 'Minting is currently paused'
      })
      return
    }

    // Check if max supply is exceeded
    if (totalMinted >= maxSupply) {
      setStatus({
        success: false,
        message: 'Max supply exceeded'
      })
      return
    }

    // Check if the mint amount exceeds max mint amount
    if (mintAmount > maxMintAmount) {
      setStatus({
        success: false,
        message: 'Mint amount exceeds max mint amount'
      })
      return
    }

    // Check if there's a pending transaction
    if (transactionPending) {
      setStatus({
        success: false,
        message: 'Transaction is still pending'
      })
      return
    }

    setIsMinting(true)
    setTransactionPending(true)
    setIsLoadingModalOpen(true)

    const provider = new ethers.providers.Web3Provider(wallet.provider)
    const signer = provider.getSigner()

    try {
      const response = await publicMint(mintAmount, signer)
      console.log('Response: ', response)
      if (response.success) {
        setStatus(response.success)
        console.log('Status after minting: ', response.success)

        // Set the transaction as pending if the minting was successful
        if (status) {
          setTransactionPending(true)
        } else {
          setTransactionPending(false)
        }
      }
    } catch (error) {
      // Handle the error here
      console.log(error.message)
      setStatus({
        success: false,
        message: 'The transaction has been rejected or failed.'
      })
    } finally {
      setIsMinting(false)
      setTransactionPending(false)
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  // Make the first modal close automatically when the transaction is no longer pending
  useEffect(() => {
    if (!transactionPending) {
      setIsLoadingModalOpen(false)
    }
  }, [transactionPending])

  // Make the second Modal open after the publicMintHandler is done, only if the transaction was successful
  useEffect(() => {
    if (status && !transactionPending) {
      setIsModalOpen(true)
    }
  }, [status])

  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <Image
          src={fractalPic}
          alt="fractal"
          className="animate-pulse absolute inset-auto block w-full min-h-screen object-cover"
        />

        <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
          <div className="relative z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 mt-20 md:mt-0 flex flex-col items-center">
            {wallet && (
              <button
                className="font-coiny absolute right-4 bg-purple-600 transition duration-200 ease-in-out font-chalk border-2 border-[rgba(0,0,0,1)]  active:shadow-none px-1 md:px-4 py-2  rounded-md text-sm text-white tracking-wide uppercase"
                onClick={() =>
                  disconnect({
                    label: wallet.label
                  })
                }
              >
                Disconnect Wallet
              </button>
            )}
            {/* Home button */}
            <button
              className="font-coiny absolute top-4 left-4 bg-purple-600 transition duration-200 ease-in-out font-chalk border-2 border-[rgba(0,0,0,1)]  active:shadow-none px-1 md:px-4 py-2 rounded-md text-sm text-white tracking-wide uppercase"
              onClick={() => router.push('/')}
            >
              Back To Home Page
            </button>
            <h1 className="font-coiny uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br from-brand-purple to-brand-heliotrope bg-clip-text text-transparent mt-12 md:mt-3">
              {paused ? 'Paused' : 'Mint Away!'}
            </h1>
            <h3 className="font-coiny text-sm text-purple-200 tracking-widest">
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>

            <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
              <div className="relative w-full">
                <div className="font-coiny z-10 absolute top-2 right-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                  <p>
                    <span className="text-brand-heliotrope">{totalMinted}</span>{' '}
                    / {maxSupply}
                  </p>
                </div>

                <Image
                  src={GrannyImage}
                  alt="granny"
                  className="object-cover w-full sm:h-[280px] md:w-[500px] rounded-md"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0">
                <div className="font-coiny flex items-center justify-between w-full">
                  <button
                    className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={decrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>

                  <p className="flex items-center justify-center flex-1 grow text-center font-bold text-brand-heliotrope text-3xl md:text-4xl">
                    {mintAmount}
                  </p>

                  <button
                    className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={incrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 md:h-8 md:w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </button>
                </div>

                <p className="font-coiny text-sm text-pink-200 tracking-widest mt-3">
                  Max Mint Amount: {maxMintAmount}
                </p>

                <div className="border-t border-b py-4 mt-16 w-full">
                  <div className="w-full text-xl font-coiny flex items-center justify-between text-brand-light-green">
                    <p>Total</p>

                    <div className="flex items-center space-x-3">
                      <p>
                        {Number.parseFloat(config.price * mintAmount).toFixed(
                          3
                        )}{' '}
                        ETH
                      </p>{' '}
                      <span className="text-gray-400">+ GAS</span>
                    </div>
                  </div>
                </div>

                {/* Mint Button && Connect Wallet Button */}

                {wallet ? (
                  <button
                    className={` ${
                      paused || isMinting
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                    } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                    disabled={paused || isMinting}
                    onClick={publicMintHandler}
                  >
                    {isMinting ? 'Minting...' : 'Mint'}
                  </button>
                ) : (
                  <button
                    className="font-coiny mt-12 w-full bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-pink-400/50 mx-4 tracking-wide uppercase"
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Status */}
            {status && status.message && (
              <div
                className={`border ${
                  status.success ? 'border-green-500' : 'border-brand-pink-400 '
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
              >
                <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}

            {/* Contract Address */}
            <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
              <Link
                href={`https://rarible.com/collection/${config.contractAddress}/items`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 mt-4"
              >
                <h3 className="font-coiny text-2xl text-brand-heliotrope uppercase mt-6">
                  Check out the collection on Rarible
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isLoadingModalOpen}
        message="Hold tight! Your NFT is being minted!"
        isTransactionPending={transactionPending}
        onRequestClose={handleClose}
      />

      <MintedModal
        status={status}
        open={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  )
}
