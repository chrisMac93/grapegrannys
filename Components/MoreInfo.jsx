import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const MoreInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // An array of images to flip through
  const images = Array.from(
    { length: 25 },
    (_, i) =>
      `https://gateway.pinata.cloud/ipfs/QmaobF3Z4Lr1NGkpAiVuuXeuX2u45n7oxbY745uT2GKnLi/${
        i + 1
      }.png`
  )

  // Function to cycle through the images
  const nextImage = () => {
    // Increase currentIndex or reset to 0 if we've reached the end of the array
    setCurrentIndex((currentIndex + 1) % images.length)
  }

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
          <Image
            src={images[currentIndex]}
            alt={`NFT ${currentIndex + 1}`}
            className="rounded shadow-lg cursor-pointer"
            onClick={nextImage}
            width={500}
            height={500}
          />
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
