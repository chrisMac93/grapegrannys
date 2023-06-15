import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true
  })

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(/images/clouds.png)`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Background overlay */}
      <div className="bg-black opacity-30 absolute inset-0 z-0"></div>

      {/* Content */}
      <motion.div
        ref={ref}
        animate={inView ? 'show' : 'hidden'}
        initial="hidden"
        variants={variants}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative text-center font-coiny text-white"
      >
        <h2 className="text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-russian-violet via-brand-dark-orchid to-brand-russian-violet">
          GrapeGrannys NFTs
        </h2>
        <p className="text-2xl  lg:text-3xl font-light">
          Welcome to GrapeGrannys NFTs, an original project where each NFT is a
          unique piece of art. The rarity of each NFT is determined by its
          distinctive features, such as backgrounds, eye color, headwear, skirt
          and tie color, special items, and of course, the Grape Granny herself.
        </p>
        <p className="mt-6 text-2xl  lg:text-3xl">
          Each NFT is it's own unique piece of art, with a total of 10,000 to
          minted.The project pays homage to grannies everywhere, with the grape
          theme providing a fun, quirky twist. Join us in this NFT adventure as
          we celebrate the eccentric and colorful world of GrapeGrannys NFTs.
        </p>
      </motion.div>
    </div>
  )
}

export default About
