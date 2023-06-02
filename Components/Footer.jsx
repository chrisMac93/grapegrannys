import React from 'react'

const Footer = () => {
  return (
    <footer className="p-4 sm:p-6 text-white text-center">
      <div className="mb-6">
        <a href="#" className="hover:underline">
          Buy GGPT
        </a>
        {' | '}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        {' | '}
        <a href="#" className="hover:underline">
          Terms & Conditions
        </a>
      </div>

      <hr className="my-6 border-gray-200" />

      <div>
        <span className="text-sm sm:text-base">
          © 2023{' '}
          <a href="/" className="hover:underline">
            GrapeGrannyNFts™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
