import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { OpenSeaSDK, Chain } from 'opensea-js'
import { ethers } from 'ethers'
import { config } from '../dapp.config'

const MoreInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [assets, setAssets] = useState([])

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_INFURA_RPC_URL
        )
        const openseaSDK = new OpenSeaSDK(provider, {
          chain: Chain.Goerli,
          apiKey: process.env.NEXT_PUBLIC_OPENSEA_API_KEY
        })
        const response = await openseaSDK.api.getAssets({
          asset_contract_address: config.contractAddress,
          order_direction: 'desc',
          offset: 0,
          limit: 15
        })
        setAssets(response.assets)

        // Prefetch images
        response.assets.forEach((asset) => {
          new Image().src = asset.image_url
        })
      } catch (error) {
        console.error('Error fetching assets:', error)
      }
    }
    fetchAssets()
  }, [])

  const nextAsset = () => {
    // Increase currentIndex or reset to 0 if we've reached the end of the array
    setCurrentIndex((currentIndex + 1) % assets.length)
  }

  const currentAsset = assets[currentIndex]

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6">
      <div className="w-full md:w-1/2">
        <p className="text-lg sm:text-xl text-white font-coiny">
          GrapeGrannys is a collection of 10,000 grapin hot NFTs living in the
          core of the blockchain. Each individual GrapeGranny is carefully
          curated with several traits, varying in rarity. Our vision is to
          create awareness for our beloved elderly Women who are often forgotten
          and neglected. Grapes have been a symbol of luxury and wealth for
          centuries. Word through the grapevine is that the intoxicating effects
          of the love and wisdom of our Grannies is as good as the fine wine
          produced from grapes themselves. This is of course why we have chosen
          to name our project GrapeGrannys! We hope to spread the love and
          wisdom of our Grannies to the world and beyond!
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-12 md:mt-0">
        <h2 className="text-2xl font-coiny mb-4 text-white text-center">
          NFTs Minted
        </h2>
        <div className="flex justify-center">
          {currentAsset && (
            <div onClick={nextAsset}>
              <Image src={currentAsset.image_url} width={500} height={500} />
              <p>{currentAsset.owner}</p>
              <p>
                {
                  currentAsset.traits.find(
                    (trait) => trait.trait_type === 'rarity'
                  ).value
                }
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href="/mint"
            className="px-8 py-3 text-lg sm:text-xl font-bold font-coiny text-white rounded hover:bg-purple-600 transition duration-300 cursor-pointer bg-purple-800"
          >
            Mint Yours!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MoreInfo
