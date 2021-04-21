import React, { Component } from 'react';
import styles from '../styles/LoadingError.module.scss';

class LoadingError extends Component {
    state = {  }
    render() { 
        return (
            <div className={styles["loading-error"]}>
            <h1 className={styles["text-center"] + ' ' + styles["text-danger"] + ' ' + styles["small"]}>There was an error while fetching data, please try again...</h1>
            </div>
         );
    }
}
 
export default LoadingError;