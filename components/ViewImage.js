import {Component, useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import GagImageCard from './GagImageCard';
import styles from "../styles/ViewImage.module.scss";
import Spinner from './Spinner';
import { Flex } from '@chakra-ui/layout';
import theme from '../utils/theme';
import { Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

function ViewImage(props) {
    const viewgag = props.viewgag
    
    var tagsList = []
    if(viewgag) {
        viewgag.Tags.map((t, i) => {
            tagsList.push(<Link key={"tag-"+i} href={"#"+t}><a><Text as="u" m="2px">{t}</Text></a></Link>)
        })
    }
        return ( 
            !viewgag ? <Spinner/> :
            <Flex
                bg={theme.primary700}
                width={["95%", "95%", "80%"]}
                minH="100px"
                m="2em"
                boxShadow="dark-lg"
                p="1em"
                direction={["column", "column", "row"]}
            >
                <Flex
                    width={["95%", "95%", "70%"]}
                    direction="column"
                    justify="center"
                >
                    <Heading as="h1" pb="1rem" color="white">{viewgag.Title}</Heading>
                    <GagImageCard gag={viewgag} view></GagImageCard>                    
                </Flex>
                <Flex
                    width={["100%", "100%", "30%"]}
                    direction="column"
                    ml={["0rem", "0rem", "2em"]}
                    color="white"
                >
                    <Text fontSize="lg" mt="1em">Gagster:</Text>
                    <Heading as="h2"><Link href={{
                        pathname: "/author",
                        query: {id: viewgag.User_id, name: viewgag.First_name + " " + viewgag.Last_name},
                    }}>{viewgag.First_name + " " + viewgag.Last_name}</Link></Heading>
                    <Heading as="h2" mt="1em">Price: INR {viewgag.Price}</Heading>
                    <Text fontSize="lg" mt="1em">Description:</Text>
                    <Text>{viewgag.Description}</Text>
                    <Flex mt="1em">
                        {tagsList}
                    </Flex>
                    <Button 
                        mt="2em"
                        size="lg"
                        rounded="full"
                        color={theme.button.secondary.color}
                        bg={theme.button.secondary.bg}
                        _hover={{ bg: theme.button.secondary._hover.bg}}
                    >
                        Buy Now
                    </Button>
                    <Button 
                        mt="2em"
                        size="lg"
                        rounded="full"
                        color={theme.button.other.color}
                        bg={theme.button.other.bg}
                        _hover={{ bg: theme.button.other._hover.bg}}
                    >
                        Add To Cart
                    </Button>
                </Flex>
            </Flex>
         );
}
 
export default ViewImage;
