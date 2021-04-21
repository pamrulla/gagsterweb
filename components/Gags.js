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
                if(cardList.length === cardsPerColumn) {
                    list.push(<div key={"cardscolumn-" + columnCounter} className={styles["gags-column"]}>{cardList}</div>)
                    cardList = []
                    columnCounter++
                }
            }
        )
        if(cardList.length != 0) {
            list.push(<div key={"cardscolumn-" + columnCounter} className={styles["gags-column"]}>{cardList}</div>)
        }
        return ( 
            <section className={styles.gags}>
                <div className={styles["gags-row"]}>
                    {list}
                </div>
            </section>
         );
    }
}
 
export default Gags;