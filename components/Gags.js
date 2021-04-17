import React, { Component } from 'react';
import Image from 'next/image';
import styles from '../styles/Gags.module.scss';
import GagImageCard from './GagImageCard';

class Gags extends Component {
    state = {  }
    render() { 
        return ( 
            <section className={styles.gags}>
                <div className={styles["gags-row"]}>
                    <div className={styles["gags-column"]}>
                            <GagImageCard src="/sample/1.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/2.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/3.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/4.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/5.jpg" hearts="1" author="khan"></GagImageCard>
                    </div>
                    <div className={styles["gags-column"]}>
                            <GagImageCard src="/sample/6.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/7.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/8.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/9.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/10.jpg" hearts="1" author="khan"></GagImageCard>
                    </div>
                    <div className={styles["gags-column"]}>
                            <GagImageCard src="/sample/11.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/12.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/13.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/14.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/15.jpg" hearts="1" author="khan"></GagImageCard>
                    </div>
                    <div className={styles["gags-column"]}>
                            <GagImageCard src="/sample/16.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/17.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/18.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/19.jpg" hearts="1" author="khan"></GagImageCard>
                            <GagImageCard src="/sample/20.jpg" hearts="1" author="khan"></GagImageCard>
                    </div>
                </div>
            </section>
         );
    }
}
 
export default Gags;