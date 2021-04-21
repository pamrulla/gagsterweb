import React, { Component } from 'react';
import Image from 'next/image';
import CircularIcon from "../components/CircularIcon";
import styles from '../styles/GagImageCard.module.scss';
import Link from 'next/link';
import { toBase64 } from 'js-base64';

class GagImageCard extends Component {
    render() {
        var gag = this.props.gag
        var src = "https://res.cloudinary.com/doxkhafkv/image/upload/t_homepage/" + gag.path
        var hearts = gag.hearts
        var author = gag.author
        var view = this.props.view
        var viewLink = toBase64(JSON.stringify(gag), true)

        var viewtag;
        if(!view) {
            viewtag = <div className={styles['gag-image-card-info-view']}>
                <Link href={{
                    pathname: "/view",
                    query: {gag: viewLink},
                } }>
                    <a><CircularIcon icon="eye"></CircularIcon></a>
                </Link>
                <p className={styles['x-small']}>View</p>
            </div>
        }
        var authortag;
        if(!view) {
            authortag =  <div className={styles['gag-image-card-info-author']}>
                <h1 className={styles['lead']}>{author}</h1>
                </div>
        }

        return ( 
        <div className={styles['gag-image-card']}>
            <Image src={src} layout="fill" objectFit={'contain'} className={styles['gags-img']}/>
            <div className={styles['gag-image-card-info']}>
                {
                    viewtag
                }
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
               {authortag}
            </div>
        </div> 
    );
    }
}
 
export default GagImageCard;