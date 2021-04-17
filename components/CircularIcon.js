import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CircularIcon.module.scss';

class CircularIcon extends Component {
    render() { 
        return ( 
            <div className={styles['circular-icon']}>
                <i className={"fa fa-" + this.props.icon + " fa-lg"}></i>
            </div>
         );
    }
}

CircularIcon.propTypes = {
    icon: PropTypes.string.isRequired
}
export default CircularIcon;