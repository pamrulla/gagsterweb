import { useState } from 'react';
import Link from 'next/link'
import Image from "next/image";
import { useAppState } from '../context/state';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button } from "@chakra-ui/button";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import theme from "../utils/theme";
const MenuItems = props => {
  const {children, isLast, to="/", ...rest} = props
  return (
    <Text
      mb={{base: isLast ? 0 : 8, sm: 0}}
      mr={{base: 0, sm: isLast ? 0 : 8}}
      display="block"
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  )
}

function Navbar(props) {
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)
  const {appState} = useAppState()
  
  return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        py={2}
        px={4}
        bg={{base: theme.primary, sm: theme.primary, md: theme.primary, lg: theme.primary}}
        color={{base: "white", sm: "white", md: "white", lg: "white"}}
        borderBottomWidth="2px"
        borderBottomStyle="solid"
        borderBottomColor={theme.secondary}
        {...props}
    >
      <Flex align="center">
        <Link href="/"><a><Image src="/logo.png" alt="gagster logo" width={80} height={40}/></a></Link>
      </Flex>
      <Box display={{base: "block", md:"none"}} onClick={toggleMenu}>
        {show ? <><AiFillCloseCircle size="2em"/></> : <AiOutlineMenu size="2em"/>}
      </Box>

      <Box
        display={{base: show ? "block" : "none", md: "block"}}
        flexBasis={{base: "100%", md: "auto"}}
      >
        <Flex 
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/">Home</MenuItems>
          {
            !appState.isLoggedIn ?
              <>
                <MenuItems to="/login">Log In</MenuItems>
                <MenuItems to="/signup" isLast>
                  <Button 
                    size="sm"
                    rounded="full"
                    color={theme.button.primary.color}
                    bg={theme.button.primary.bg}
                    _hover={{ bg: theme.button.primary._hover.bg}}
                  >
                    Create Account
                  </Button>
                </MenuItems>
              </>
              :
              <>
                <MenuItems to="/signup">Upload</MenuItems>
                <MenuItems to="/logout" isLast>Log Out</MenuItems>
              </>
          }
        </Flex>
      </Box>
    </Flex>
  );
}
 
export default Navbar;
