import { ChakraProvider, ColorModeScript  } from "@chakra-ui/react";
import {AppProvider1} from '../context/state'
import Layout from '../components/Layout'
import '../styles/globals.css'
import theme from '../utils/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript/>
      <AppProvider1>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider1>
    </ChakraProvider>
  )
}

export default MyApp
