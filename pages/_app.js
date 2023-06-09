import '../styles/globals.css'
import ReactModal from 'react-modal'
import Footer from '../Components/Footer'

ReactModal.setAppElement('#__next')

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
