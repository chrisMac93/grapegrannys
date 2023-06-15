import React from 'react'
import Image from 'next/image'
import GrapeGrannyIcon from '../public/images/GrapeGrannyIcon.png'
import OpenseaIcon from '../public/images/opensea_icon.svg' // Import Opensea Icon
import RaribleIcon from '../public/images/rarible_icon.svg' // Import Rarible Icon

function MintedModal({ open, handleClose }) {
  if (!open) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-full flex items-center justify-center z-20">
        <div
          className="relative bg-gradient-to-bl from-brand-russian-violet via-brand-dark-orchid to-brand-russian-violet rounded-lg shadow-md flex flex-col md:flex-col items-center p-10"
          style={{ fontFamily: 'Coiny, sans-serif' }}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white"
          >
            X
          </button>
          <h1 className="text-center text-white text-xl mb-6 md:order-1">
            💪👵 Congrats on your minted GrapeGranny NFT(s)!
          </h1>
          <h1 className="text-center text-white text-xl mb-10 md:order-2">
            View your NFT(s) at one of the following marketplaces below 👇
          </h1>

          <div className="flex flex-col md:flex-row items-center md:space-x-10 md:order-3 w-full">
            <Image
              src={GrapeGrannyIcon}
              alt="GrapeGranny"
              width={250}
              height={250}
              className="mb-10 md:mb-0 ml-20"
            />

            <div className="flex flex-col space-y-5 text-lg text-white">
              <a
                href="https://rarible.com/items/owned"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image src={RaribleIcon} alt="Rarible" width={20} height={20} />
                Rarible
              </a>
              <a
                href="https://opensea.io/account"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image src={OpenseaIcon} alt="Opensea" width={20} height={20} />
                OpenSea
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MintedModal
