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

  useEffect(() => {
    const fetchMetaData = async () => {
      const numbers = [1, 3, 4, 5, 7, 9, 12, 13, 15, 17]
      for (let i of numbers) {
        try {
          const res = await fetch(`/MintedJSON/${i}.json`)
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
        }
      }
    }
    fetchMetaData()
  }, [])

  return (
    <div className="bg-gradient-to-r from-slate-950 to-brand-russian-violet flex flex-col md:flex-row justify-between items-center py-16 px-6">
      <div className="flex flex-col items-center w-full md:w-1/2">
        <div className="text-center">
          <h2 className="inline-block text-3xl font-coiny mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-medium-orchid to-brand-dark-orchid">
            About Grape Grannys
          </h2>
        </div>
        <p className="text-lg sm:text-xl text-white text-center font-coiny">
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
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="text-neutral-100"
          slidesPerView={1}
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
                <p className="text-lg sm:text-xl text-white font-coiny">
                  Rarity: {nft.rarity}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
