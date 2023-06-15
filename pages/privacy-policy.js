import Head from 'next/head'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const PrivacyPolicy = () => {
  return (
    <div>
      <Head>
        <title>Privacy Policy | GrapeGrannyNFTs</title>
      </Head>

      <Navbar />

      <main>
        <section className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">
              Personal Information We Collect
            </h2>
            <p>
              When you visit the Site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and cookies. We also collect
              information about the pages or products you view and how you
              interact with the Site. When you mint an NFT, we collect your
              public address in order to make a transaction with the smart
              contract.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2">
              How We Use Your Personal Information
            </h2>
            <p>
              We use the collected information to screen for potential risk or
              fraud, and provide you with a seemless interaction when minting a
              GrapeGranny NFT. We also use the information to improve and
              optimize the Site's functionality and performance.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2">Data Retention</h2>
            <p>
              Only the public address of the NFT owner is stored temporarily
              while you are connected.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2">
              Changes to the Privacy Policy
            </h2>
            <p>
              We may update the privacy policy from time to time to reflect
              changes in our practices or for other reasons. Please review the
              policy periodically for any updates.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
