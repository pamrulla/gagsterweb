import Link from 'next/link';
import React, { Component } from 'react';
import styles from '../styles/Footer.module.scss';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <footer className={styles.footer}>
                <div className={styles['footer-row']}>
                    <div className={styles.more}>
                        <h1 className={styles['lead']}>More</h1>
                        <Link href="#aboutus">About Us</Link>
                        <Link href="#pricing">Pricing</Link>
                        <Link href="#pricing">Contact Us</Link>
                        <Link href="#pricing">Terms</Link>
                        <Link href="#pricing">Refund Policy</Link>
                        <Link href="#pricing">Privacy</Link>
                    </div>
                    <div className={styles['contact-us']}>
                        <h1 className={styles['lead']}>Contact Us</h1>
                        <h1 className={styles['lead']}>+91 0000000</h1>
                        <Link href="mailto:abc@abc.com">abc@abc.com</Link>
                    </div>
                </div>
                <div className={styles['footer-row']}>
                    <div className={styles['social-icons']}>
                        <div className={styles['social-icons-inner']}>
                            <a href="#fb"><i className={"fab fa-facebook"}></i></a>
                            <a href="#ln"><i class="fab fa-linkedin"></i></a>
                            <a href="#tw"><i class="fab fa-twitter"></i></a>
                            <a href="#in"><i class="fab fa-instagram"></i></a>
                            <a href="#yt"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className={styles['footer-row']}>
                    <div className={styles.copyright}>
                        <p className={styles['x-small']}>Copyright 2021 by Gagster.in. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
         );
    }
}
 
export default Footer;