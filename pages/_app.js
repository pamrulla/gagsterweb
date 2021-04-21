import {AppProvider1} from '../context/state'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider1>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider1>
  )
}

export default MyApp
