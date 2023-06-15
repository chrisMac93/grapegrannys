import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Autoplay])

const MoreInfo = () => {
  const [nfts, setNfts] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const fetchMetaData = async () => {
      const numbers = [1, 3, 4, 5, 7, 9, 12, 13, 15, 16, 17, 25]
      for (let i of numbers) {
        try {
          const res = await fetch(`/MintedJSON/${i}.json`)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          const metaData = await res.json()
          const rarity = metaData.attributes.find(
            (attr) => attr.trait_type === 'rarity_class'
          ).value
          setNfts((nfts) => [
            ...nfts,
            { image: `/MintedImages/${i}.png`, rarity }
          ])
        } catch (error) {
          console.error(error)
          // consider stopping the function, or retrying after a delay
        }
      }
    }
    fetchMetaData()
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      setSlidesPerView(window.innerWidth >= 768 ? 3 : 1)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(/images/multiverse.png)`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Background overlay */}
      <div className="bg-black opacity-30 absolute inset-0 z-0"></div>

      <div className="w-full md:w-1/2 mt-12 md:mt-0">
        <h2 className="text-3xl font-coiny mb-4 text-white text-center z-10">
          NFTs Minted
        </h2>
        <p className="text-lg sm:text-xl text-white text-center mb-4 z-10">
          Below are some of the NFTs that have already been minted.
        </p>
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="text-neutral-100"
          slidesPerView={slidesPerView}
        >
          {nfts.map((nft, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <Image
                  src={nft.image}
                  alt="GrapeGranny NFT"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
                <p className="text-lg sm:text-xl text-neutral-400 font-coiny">
                  Rarity: {nft.rarity}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-4">
          <Link
            href="/mint"
            className="px-16 py-4 text-lg sm:text-xl font-bold font-coiny text-white rounded hover:bg-purple-600 transition duration-300 cursor-pointer bg-purple-800 animate-pulse z-10"
          >
            Mint Yours!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MoreInfo
