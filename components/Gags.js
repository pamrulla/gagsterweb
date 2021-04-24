import { SimpleGrid, Box } from '@chakra-ui/layout';
import React, { Component } from 'react';
import styles from '../styles/Gags.module.scss';
import GagImageCard from './GagImageCard';

class Gags extends Component {
    state = {  }
    render() { 
        let len = this.props.gags.length
        const columns = 4
        let cardsPerColumn = Math.floor(len / columns)
        let list = []
        let cardList = []
        let columnCounter = 1
        this.props.gags.map((gag, i) => {
                cardList.push(<GagImageCard key={"imgcard-" + i} gag={gag}></GagImageCard>)
            }
        )
        return (
            <SimpleGrid as="section" id="gags" columns={[1, 2, 2, 4]} spacing={10} w="100%" p="1rem">
                {cardList}
            </SimpleGrid> 
         );
    }
}
 
export default Gags;