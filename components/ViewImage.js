import {Component, useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import GagImageCard from './GagImageCard';
import styles from "../styles/ViewImage.module.scss";
import Spinner from './Spinner';

function ViewImage(props) {
    const viewgag = props.viewgag
        return ( 
            !viewgag ? <Spinner/> :
            <div className={styles.container}>
                <section className={styles.view}>
                    <div className={styles['view-row']}>
                        <div className={styles['view-column-70'] + ' ' + styles['bg-dark']}>
                        <GagImageCard gag={viewgag} view></GagImageCard>
                        <h1 className={styles.lead + ' ' + styles.title}>{viewgag.title}</h1>
                        </div>
                        <div className={styles['view-column-30'] + ' ' + styles['bg-dark']}>
                            <div className={styles["info-panel"]}>
                                <h2 className={styles.lead}><Link href={{
                                    pathname: "/author",
                                    query: {id: viewgag.authorId, name: viewgag.author},
                                }}>{viewgag.author}</Link></h2>
                                <h2 className={styles.lead}>Price: INR {viewgag.price} </h2>
                                <p className={styles["x-small"]}>{viewgag.description}</p>
                                <p className={styles["x-small"]}>{viewgag.tags}</p>
                                <button className={styles["btn"] + ' ' + styles["btn-primary"]}>Buy Now</button>
                                <button className={styles["btn"] + ' ' + styles["btn-light"]}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
         );
}
 
export default ViewImage;
