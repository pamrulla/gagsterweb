import React, { Component } from 'react';
import styles from '../styles/Spinner.module.scss';

class Spinner extends Component {
    render() { 
        return ( 
            <div className={styles.spinner} ></div> 
        );
    }
}
 
export default Spinner;