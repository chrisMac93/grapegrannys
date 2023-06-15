import Head from 'next/head'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const TermsAndConditions = () => {
  return (
    <div>
      <Head>
        <title>Terms & Conditions | GrapeGrannyNFTs</title>
      </Head>

      <Navbar />

      <main>
        <section className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Introduction</h2>
            <p>
              These terms and conditions govern your use of the Site. By
              accessing and using the Site, you agree to comply with these terms
              and conditions. If you do not agree, please refrain from using the
              Site.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2">
              License and Intellectual Property
            </h2>
            <p>
              The Company and/or its licensors own the intellectual property
              rights of all material on the Site. You may access and use the
              material for personal purposes, subject to the restrictions
              mentioned in these terms and conditions. Republishing, selling,
              reproducing, or distributing the material is strictly prohibited.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2">
              Hyperlinking to our Content
            </h2>
            <p>
              Certain organizations such as government agencies, search engines,
              and news organizations may link to our Site without prior
              approval. However, deceptive or misleading linking practices are
              not allowed.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2">
              Disclaimer of Liability
            </h2>
            <p>
              We exclude all representations, warranties, and conditions related
              to the Site and its use. We will not be liable for any loss or
              damage resulting from the use of the Site or its information and
              services.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default TermsAndConditions
