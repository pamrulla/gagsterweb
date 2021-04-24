import { Heading, Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';
import { AiFillFacebook, AiFillYoutube, AiFillLinkedin, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import theme from '../utils/theme';

function Footer(props) {
        return (
        <Flex
            as="footer"
            justify="space-between"
            direction= "column"
            w="100%"
            bg={{base: theme.primary, sm: theme.primary, md: theme.primary, lg: theme.primary}}
            color={{base: "white", sm: "white", md: "white", lg: "white"}}
            borderTopWidth="2px"
            borderTopStyle="solid"
            borderTopColor={theme.secondary}
            pl={["2rem", "2rem", "10rem"]}
            pr={["2rem", "2rem", "10rem"]}
            pt={["2rem", "2rem", "2rem"]}
            pb={["2rem", "2rem", "2rem"]}
            {...props}
        >
            <Flex
                w="100%"
                direction={["column", "column", "row"]}
            >
                <Flex
                    direction="column"
                    w={["100%", "100%", "50%"]}
                    ml={["1rem", "1rem", "5rem"]}
                    justify="flex-start"
                    align="flex-start"
                >
                    <Heading>More</Heading>
                    <Link href="#aboutus">About Us</Link>
                    <Link href="#pricing">Pricing</Link>
                    <Link href="#pricing">Contact Us</Link>
                    <Link href="#pricing">Terms</Link>
                    <Link href="#pricing">Refund Policy</Link>
                    <Link href="#pricing">Privacy</Link>
                </Flex>
                <Flex
                    direction="column"
                    w={["100%", "100%", "50%"]}
                    ml={["1rem", "1rem", "5rem"]}
                    justify="flex-start"
                    align={["flex-start", "flex-start", "flex-end"]}
                >
                    <Heading>Contact Us</Heading>
                    <Heading as="h5" fontSize="lg">+91 000000000</Heading>
                    <Link href="mailto:abc@abc.com">abc@abc.com</Link>
                </Flex>
            </Flex>
            <Flex
                w="100%"
                direction="row"
                pl={["2rem", "2rem", "10rem"]}
                pr={["2rem", "2rem", "10rem"]}
                pt={["2rem", "2rem", "2rem"]}
                pb={["2rem", "2rem", "2rem"]}
                justify="space-evenly"
            >
                <Link href="#"><a><AiFillFacebook size="2em"/></a></Link>
                <Link href="#"><a><AiFillYoutube size="2em"/></a></Link>
                <Link href="#"><a><AiFillTwitterCircle size="2em"/></a></Link>
                <Link href="#"><a><AiFillInstagram size="2em"/></a></Link>
                <Link href="#"><a><AiFillLinkedin size="2em"/></a></Link>
            </Flex>
            <Flex
                w="100%"
                direction="row"
                justify="center"
                textAlign="center"
                borderTopWidth="2px"
                borderTopStyle="solid"
                borderTopColor={theme.primary500}
            >
                <Text>Copyright <sup>&copy;</sup> 2021 by Gagster.in. All Rights Reserved.</Text>
            </Flex>
        </Flex>
            // <footer className={styles.footer}>
            //     <div className={styles['footer-row']}>
            //         <div className={styles.more}>
            //             <h1 className={styles['lead']}>More</h1>
            //             <Link href="#aboutus">About Us</Link>
            //             <Link href="#pricing">Pricing</Link>
            //             <Link href="#pricing">Contact Us</Link>
            //             <Link href="#pricing">Terms</Link>
            //             <Link href="#pricing">Refund Policy</Link>
            //             <Link href="#pricing">Privacy</Link>
            //         </div>
            //         <div className={styles['contact-us']}>
            //             <h1 className={styles['lead']}>Contact Us</h1>
            //             <h1 className={styles['lead']}>+91 0000000</h1>
            //             <Link href="mailto:abc@abc.com">abc@abc.com</Link>
            //         </div>
            //     </div>
            //     <div className={styles['footer-row']}>
            //         <div className={styles['social-icons']}>
            //             <div className={styles['social-icons-inner']}>
            //                 <a href="#fb"><i className={"fab fa-facebook"}></i></a>
            //                 <a href="#ln"><i className={"fab fa-linkedin"}></i></a>
            //                 <a href="#tw"><i className={"fab fa-twitter"}></i></a>
            //                 <a href="#in"><i className={"fab fa-instagram"}></i></a>
            //                 <a href="#yt"><i className={"fab fa-youtube"}></i></a>
            //             </div>
            //         </div>
            //     </div>
            //     <div className={styles['footer-row']}>
            //         <div className={styles.copyright}>
            //             <p className={styles['x-small']}>Copyright 2021 by Gagster.in. All Rights Reserved.</p>
            //         </div>
            //     </div>
            // </footer>
         );
}
 
export default Footer;