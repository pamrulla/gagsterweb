import Link from 'next/link';
import React, { Component } from 'react';
import styles from '../styles/Form.module.scss';
import { Base64 } from 'js-base64';
import { AppContext } from '../context/state';
import Router from 'next/router'

class LoginForm extends Component {
    static contextType = AppContext

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginFailed: false,
            loginErrorMessage: ''
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    
    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: this.state.email,
                password: Base64.encode(this.state.password)
             })
        };
        fetch('http://localhost:8080/api/v1/login', requestOptions)
            .then(async response => {
                if(response.status != 200) {
                    const data = await response.json();
                    return Promise.reject(data.message);
                }
                
                const data = await response.json();
                
                this.setState({loginFailed: false});

                const { appState, updateAppData } = this.context
                appState.isLoggedIn = true
                appState.user = data.user
                appState.auth_token = data.auth_token
                updateAppData(appState)
                Router.replace("/upload")
            })
            .catch(error => {
                this.setState({
                    loginFailed: true,
                    loginErrorMessage: error
                });
            });
    }

    state = {  }
    render() { 

        let errorLable;
        if(this.state.loginFailed)
            errorLable = <label className={styles['form-control'] + ' ' + styles['form-text']+ ' ' + styles['text-danger']+ ' ' + styles['x-small'] + ' ' + styles['text-center']}>{this.state.loginErrorMessage}</label>;
        else
            errorLable=<></>;
        return ( 
            <div className={styles.container}>
                <div className={styles.signin}>
                    <h1 className={styles.lead + ' ' + styles['text-primary'] + ' ' + styles['text-center']}>Sign In</h1>
                    <form onSubmit={this.handleSubmit}>
                        {errorLable}
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="email" value={this.state.email} 
                            onChange={this.handleEmail} placeholder="Enter your email"/>
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="password" value={this.state.password} 
                            onChange={this.handlePassword} placeholder="Enter your password"/>
                        <div className={styles['form-control'] + ' ' + styles['text-right']}>
                            <Link href="#forgotpassword">
                                <span className={styles["x-small"] + ' ' + styles["text-primary"]}>Forgot password</span>
                            </Link>
                        </div>
                        <input className={styles['form-control'] + ' ' + styles['btn'] + ' ' + styles['btn-primary']} type="submit" value="Submit"/>
                        <div className={styles['form-control'] + ' ' + styles['text-center']}>
                            <span className={styles["x-small"] + ' ' + styles["text-light"]}> New to gagster? </span>
                            <Link href="/signup">
                                <span className={styles["x-small"] + ' ' + styles["text-primary"]}>SignUp</span>
                            </Link>
                        </div>
                        <div className={styles['form-control'] + ' ' + styles['text-center']}>
                            <span className={styles["xx-small"] + ' ' + styles["text-light"]}> By signing up, you agree to gagster's
                            <Link href="/terms">
                                <span className={styles["text-primary"]}> Terms & Conditions</span>
                            </Link>, 
                            <Link href="/refund">
                                <span className={styles["text-primary"]}> Cancellation & Refund Policy</span>
                            </Link>, 
                            <Link href="/privacy">
                                <span className={styles["text-primary"]}> Privacy Policy</span>
                            </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div> 
        );
    }
}
 
export default LoginForm;