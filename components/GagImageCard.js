import React, { Component } from 'react';
import Image from 'next/image';
import CircularIcon from "../components/CircularIcon";
import styles from '../styles/GagImageCard.module.scss';

class GagImageCard extends Component {
    render() {
        var src = this.props.src
        var hearts = this.props.hearts
        var author = this.props.author
        return ( 
        <div className={styles['gag-image-card']}>
            <Image src={src} layout="fill" className={styles['gags-img']}/>
            <div className={styles['gag-image-card-info']}>
                <div className={styles['gag-image-card-info-view']}>
                    <a href="#">
                        <CircularIcon icon="eye"></CircularIcon>
                    </a>
                    <p className={styles['x-small']}>View</p>
                </div>
                <div className={styles['gag-image-card-info-interactions']}>
                    <div className={styles['gag-image-card-info-interactions-item']}>
                        <a href="#">
                            <CircularIcon icon="heart"></CircularIcon>
                        </a>
                        <p className={styles['x-small']}>{hearts}</p>
                    </div>
                    <div className={styles['gag-image-card-info-interactions-item']}>
                        <a href="#">
                            <CircularIcon icon="plus"></CircularIcon>
                        </a>
                        <p className={styles['xx-small']}>Add to Gallery</p>
                    </div>
                </div>
                <div className={styles['gag-image-card-info-author']}>
                    <h1 className={styles['lead']}>{author}</h1>
                </div>
            </div>
        </div> 
    );
    }
}
 
export default GagImageCard;