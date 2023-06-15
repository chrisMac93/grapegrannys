import Head from 'next/head'
import Navbar from '../Components/Navbar'
import Jumbotron from '../Components/Jumbotron'
import About from '../Components/About'
import MoreInfo from '../Components/MoreInfo'
import { config } from '../dapp.config'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main>
        {/* Jumbotron */}
        <section>
          <Jumbotron />
        </section>
        {/* About */}
        <section>
          <About />
        </section>
        {/* More Info */}
        <section>
          <MoreInfo />
        </section>
      </main>
    </div>
  )
}
