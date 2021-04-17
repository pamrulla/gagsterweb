import { Component } from 'react';
import Link from 'next/link'
import Image from "next/image";
import styles from '../styles/Navbar.module.scss'

class Navbar extends Component {
    render() { 
        return ( <nav className={styles.navbar + ' ' + styles['bg-dark']}>
        <a href="/"><span><Image src="/logo.svg" alt="gigster logo" width={80} height={40}/></span></a>
        <ul>
          <li><Link href="#login">Log In</Link></li>
          <li><Link href="#signup">Sign Up</Link></li>
        </ul>
      </nav>  );
    }
}
 
export default Navbar;
