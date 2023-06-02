import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../Components/Navbar'
import Jumbotron from '../Components/Jumbotron'
import MoreInfo from '../Components/MoreInfo'
import { config } from '../dapp.config'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="icon" href="../public/vercel.svg" />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main>
        {/* Jumbotron */}
        <section>
          <Jumbotron />
        </section>
        {/* More Info */}
        <section>
          <MoreInfo />
        </section>
      </main>
    </div>
  )
}
