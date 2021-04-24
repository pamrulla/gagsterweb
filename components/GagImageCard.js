import React, { Component } from 'react';
import Image from 'next/image';
import CircularIcon from "../components/CircularIcon";
import styles from '../styles/GagImageCard.module.scss';
import Link from 'next/link';
import { toBase64 } from 'js-base64';
import { Flex, Box, Text } from '@chakra-ui/layout';
import theme from '../utils/theme';
import { AiFillEye, AiFillHeart, AiFillPlusCircle } from 'react-icons/ai';
import { SlideFade } from '@chakra-ui/transition';

function GagImageCard(props) {
        var gag = props.gag
        var src = "https://res.cloudinary.com/doxkhafkv/image/upload/t_homepage/" + gag.Path
        var hearts = gag.Hearts
        var author = gag.First_name + " " + gag.Last_name
        var view = props.view
        var viewLink = toBase64(JSON.stringify(gag), true)

        var viewtag;
        if(!view) {
            viewtag = <Flex
                    direction="column"
                    h="80px"
                    bg="transparent"
                    w="80px"
                    position="absolute"
                    left="0"
                    right="0"
                    top="0"
                    bottom="0"
                    m="auto auto"
                    zIndex="2"
                    justify="center"
                    align="center"
                    color={theme.secondary}
                    
                >
                    <Box borderRadius="full" bg={theme.blackOverlay} p={4} color="white">
                        <Link href={{
                            pathname: "/view",
                            query: {gag: viewLink},
                        } }>
                            <a><AiFillEye size="1em"/></a>
                        </Link>
                    </Box>
                    <Text fontSize="xs" align="center">View</Text>
                </Flex>
        }
        var authortag;
        if(!view) {
            authortag =  <Flex
                    direction="column"
                    h="50px"
                    bg={theme.blackOverlay}
                    w="100%"
                    position="absolute"
                    left="0"
                    bottom="0"
                    zIndex="2"
                    justify="center"
                    align="center"
                    color="white"
                >
                    <Text fontSize="lg" align="center">{author}</Text>
                </Flex>
        }

        const OnHeartClick = () => {
            console.log("Liked gag " + gag.Id)
        }
        const OnAddToGalleryClick = () => {
            console.log("Gag added to gallery " + gag.Id)
        }
        var offset = Math.random() * 200;
        console.log(offset)
        return ( 
        <SlideFade in="true" offsetY={offset}>
            <Box
                bg={theme.primary800}
                height={"550px"}
                position="relative"
                boxShadow="dark-lg"
            >
                <Image src={src} layout="fill" objectFit={'contain'}/>
                <Flex
                    direction="column"
                    width="100%"
                    height="100%"
                    position="absolute"
                    right="0"
                    top="0"
                    zIndex="1"
                    _hover={{opacity: 1}}
                    opacity={[1, 1, 0, 0]}
                >            
                    <Flex
                        direction="column"
                        width="80px"
                        bg="tranparent"
                        height="100%"
                        position="absolute"
                        right="0"
                        top="0"
                        zIndex="2"
                        justify="flex-start"
                        align="center"
                        color="white"
                        role="group"
                    >
                        <Box onClick={OnHeartClick} borderRadius="full" bg={theme.blackOverlay} p={4} color="white">
                            <AiFillHeart size="1em"/>
                        </Box>
                        <Text>{hearts}</Text>
                        <Box height="10px"></Box>
                        <Box onClick={OnAddToGalleryClick} borderRadius="full" bg={theme.blackOverlay} p={4} color="white">
                            <AiFillPlusCircle size="1em"/>
                        </Box>
                        <Text fontSize="0.5rem" align="center">Add to Gallery</Text>
                    </Flex>
                    {authortag}
                    {viewtag}
                    
                </Flex>
            </Box>
        </SlideFade>
    );
}
 
export default GagImageCard;