import Navbar from './Navbar'
import Meta from './Meta'
import Footer from './Footer'
import { Flex } from '@chakra-ui/layout'
import theme from '../utils/theme'

function Layout(props) {
  return (
    <>
        <Meta />
        <Flex 
          direction="column"
          align="center"
          m="0 auto"
          bg={theme.primary}
          {...props}
        >
          <Navbar />
            {props.children}
          <Footer />
        </Flex>
    </>
  )
}

export default Layout