import Link from 'next/link';
import React, { Component } from 'react';
import styles from '../styles/Form.module.scss';
import { Base64 } from 'js-base64';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            signupFailed: false,
            signUpErrorMessage: '',
            arePasswordsSame: true,
            ispasswordValid: true
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    //min 8 letter password, with at least a symbol, upper and lower case letters and a number
    validatePassword(str)
    {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (re.test(str) === true) {
            this.state.ispasswordValid = true;
        } else {
            this.state.ispasswordValid = false;
        }
        this.setState({});
    }

    handleFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastName(event) {
        this.setState({lastName: event.target.value});
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    
    checkPasswords() {
        if(this.state.password === this.state.confirmPassword) {
            this.state.arePasswordsSame = true;
        } else {
            this.state.arePasswordsSame = false;
        }
        this.setState({});
    }
    handlePassword(event) {
        this.state.password = event.target.value;
        this.validatePassword(this.state.password);
        this.checkPasswords();
    }

    handleConfirmPassword(event) {
        this.state.confirmPassword = event.target.value;
        this.checkPasswords();
    }

    handleSubmit(event) {
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({arePasswordsSame: false});
            event.preventDefault();
            return
        }
        event.preventDefault();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                First_Name: this.state.firstName,
                Last_Name: this.state.lastName,
                Email: this.state.email,
                Password: Base64.encode(this.state.password)
             })
        };
        fetch('http://localhost:8080/api/v1/users', requestOptions)
            .then(async response => {
                if(response.status != 200) {
                    const data = await response.json();
                    return Promise.reject(data.message);
                }
                
                const data = await response.json();
                
                this.setState({signupFailed: false});
            })
            .catch(error => {
                this.setState({
                    signupFailed: true,
                    signUpErrorMessage: error
                });
            });
    }

    state = {  }
    render() { 
        let errorLable;
        if(this.state.signupFailed)
            errorLable = <label className={styles['form-control'] + ' ' + styles['form-text']+ ' ' + styles['text-danger']+ ' ' + styles['x-small'] + ' ' + styles['text-center']}>{this.state.signUpErrorMessage}</label>;
        else
            errorLable=<></>;
        let passwordError;
        if(!this.state.arePasswordsSame)
            passwordError = <label className={styles['form-control'] + ' ' + styles['form-text']+ ' ' + styles['text-danger']+ ' ' + styles['x-small'] + ' ' + styles['text-center']}>Passwords do not match</label>;
        else
            passwordError=<></>;

        let validatepasswordError;
        if(!this.state.ispasswordValid)
            validatepasswordError = <label className={styles['form-control'] + ' ' + styles['form-text']+ ' ' + styles['text-danger']+ ' ' + styles['x-small'] + ' ' + styles['text-center']}>min 8 letter password, with at least a symbol, upper and lower case letters and a number</label>;
        else
            validatepasswordError=<></>;

        return ( 
            <div className={styles.container}>
                <div className={styles.signin}>
                    <h1 className={styles.lead + ' ' + styles['text-primary'] + ' ' + styles['text-center']}>Sign Up</h1>
                    <div className={styles['form-control'] + ' ' + styles['text-center']}>
                            <span className={styles["x-small"] + ' ' + styles["text-light"]}> Already have account? </span>
                            <Link href="/login">
                                <span className={styles["x-small"] + ' ' + styles["text-primary"]}>Sign In</span>
                            </Link>
                        </div>
                    <form onSubmit={this.handleSubmit}>
                        {errorLable}
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="text" value={this.state.firstName} 
                            onChange={this.handleFirstName} placeholder="Enter your first name"/>
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="text" value={this.state.lastName} 
                            onChange={this.handleLastName} placeholder="Enter your last name"/>
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="email" value={this.state.email} 
                            onChange={this.handleEmail} placeholder="Enter your email"/>
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="password" value={this.state.password} 
                            onChange={this.handlePassword} placeholder="Enter your password"/>
                        {validatepasswordError}
                        <input required className={styles['form-control'] + ' ' + styles['form-text']} type="password" value={this.state.confirmPassword} 
                            onChange={this.handleConfirmPassword} placeholder="Confirm the password"/>
                        {passwordError}
                        <input className={styles['form-control'] + ' ' + styles['btn'] + ' ' + styles['btn-primary']} type="submit" value="Submit"/>
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
 
export default SignupForm;