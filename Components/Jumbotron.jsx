import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Jumbotron = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  }

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.4
      }
    }
  }

  return (
    <div
      className="relative w-full h-screen parallax"
      style={{
        backgroundImage: `url(/images/home.png)`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-4 px-6">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold font-coiny text-black py-2 px-4 rounded"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          transition={{ duration: 1 }}
        >
          Welcome to Grape Granny NFTs
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={boxVariants}
          className="p-6 rounded-lg text-black mt-4"
        >
          <motion.p
            className="text-xl sm:text-2xl font-coiny mb-2"
            variants={headerVariants}
          >
            A collection of NFT's for all the grandmas out there
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl font-coiny mb-4"
            variants={headerVariants}
          >
            Mint your Grape Granny NFT today!
          </motion.p>
          <motion.div variants={buttonVariants}>
            <Link
              href="/mint"
              className="px-8 py-3 text-lg sm:text-xl font-bold font-coiny text-white rounded hover:bg-purple-600 transition duration-300 cursor-pointer bg-purple-800 animate-pulse"
            >
              Mint
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Jumbotron
