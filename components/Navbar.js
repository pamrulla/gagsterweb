import { Component } from 'react';
import Link from 'next/link'
import Image from "next/image";
import styles from '../styles/Navbar.module.scss'
import { AppContext } from '../context/state';

class Navbar extends Component {
  static contextType = AppContext

    render() { 
      const { appState } = this.context
      var menuItems 
      if(appState.isLoggedIn) {
        menuItems = <><li><Link href="/upload">Upload Gag</Link></li><li><Link href="/logout">Log Out</Link></li></>
      } else {
        menuItems = <><li><Link href="/login">Log In</Link></li><li><Link href="/signup">Sign Up</Link></li></>
      }

        return ( <nav className={styles.navbar + ' ' + styles['bg-dark']}>
          {/* <Link href="/">GAGSTER</Link> */}
          <Link href="/"><a><Image src="/logo.svg" alt="gigster logo" width={80} height={40}/></a></Link>
        <ul>
          {menuItems}
        </ul>
      </nav>  );
    }
}
 
export default Navbar;
