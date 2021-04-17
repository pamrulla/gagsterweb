import {Component} from 'react';
import styles from "../styles/Cover.module.scss";

class Cover extends Component {
    state = {  }
    render() { 
        return ( 
            <section className={styles.cover}>
                <div className={styles['dark-overlay']}>
                    <div className={styles['cover-inner']}>
                        <h1 className={styles['x-large']}>Gags for everyone</h1>
                        <p className={styles['lead']}>Seach gags and your favorite gagster</p>
                    </div>
                </div>
            </section>
         );
    }
}
 
export default Cover;
