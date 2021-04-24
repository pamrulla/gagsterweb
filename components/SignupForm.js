import Link from 'next/link';
import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import { Flex } from '@chakra-ui/layout';
import theme from '../utils/theme';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Heading, Text } from '@chakra-ui/layout';

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
            ispasswordValid: true,
            isLoading: false
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleisLoading = this.handleisLoading.bind(this);
    }
    handleisLoading(value) {
        this.setState({isLoading: value});
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
        this.handleisLoading(true);
        if(this.state.firstName === '') {
            this.setState({
                signupFailed: true,
                signUpErrorMessage: "First Name is missing",
                isLoading: false
            });
            return
        }
        if(this.state.lastName === '') {
            this.setState({
                signupFailed: true,
                signUpErrorMessage: "Last name is missing",
                isLoading: false
            });
            return
        }
        if(this.state.email === '') {
            this.setState({
                signupFailed: true,
                signUpErrorMessage: "email is missing",
                isLoading: false
            });
            return
        }
        if(this.state.password === '') {
            this.setState({
                signupFailed: true,
                signUpErrorMessage: "Password is missing",
                isLoading: false
            });
            return
        }

        if(this.state.password !== this.state.confirmPassword) {
            this.setState({arePasswordsSame: false, isLoading: false});
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
                    this.handleisLoading(false);
                    const data = await response.json();
                    return Promise.reject(data.message);
                }
                
                const data = await response.json();
                
                this.setState({signupFailed: false});
            })
            .catch(error => {
                this.setState({
                    signupFailed: true,
                    signUpErrorMessage: error,
                    isLoading: false
                });
            });
    }

    state = {  }
    render() { 
        let errorLable;
        if(this.state.signupFailed)
            errorLable = this.state.signUpErrorMessage;
        else
            errorLable='';
        let passwordError;
        if(!this.state.arePasswordsSame)
            passwordError = "Passwords do not match";
        else
            passwordError='';

        let validatepasswordError;
        if(!this.state.ispasswordValid)
            validatepasswordError = "min 8 letter password, with at least a symbol, upper and lower case letters and a number";
        else
            validatepasswordError='';

        return ( 
            <Flex my={10}
                alignItems="center"
                justifyContent="center">
                <Flex direction="column"
                    bg={theme.primary800}
                    p={12}
                    rounded={6}
                    boxShadow="dark-lg"
                    color="white"
                    >
                    <Heading as="h1" textAlign="center" mb={6}>Sign Up</Heading>
                    <Flex mb={4} direction="row" justifyContent="center" alignItems="center">
                        <Text fontSize="xs">Already on Gagster? </Text>
                        <Link href="/signin">
                            <a><Text as="u" fontSize="xs" ml={2}>Sign In</Text></a>
                        </Link>                    
                    </Flex>
                    <Flex direction="row" justifyContent="center" color="red" my={4} flexWrap="wrap" display={!this.state.signupFailed ? "none" : "flex"}>
                        <Text fontSize="xs" >{errorLable}</Text>
                    </Flex>
                    <Input isRequired variant="filled" mb={3} bg={theme.primary600}  type="text" value={this.state.firstName} 
                            onChange={this.handleFirstName} placeholder="Enter your first name"/>
                    <Input isRequired isRequired variant="filled" mb={3} bg={theme.primary600}  type="text" value={this.state.lastName} 
                            onChange={this.handleLastName} placeholder="Enter your last name"/>
                    <Input isRequired variant="filled" mb={3} bg={theme.primary600}  type="email" value={this.state.email} 
                            onChange={this.handleEmail} placeholder="Enter your email"/>
                    <Input isRequired variant="filled" mb={3}  bg={theme.primary600} type="password" value={this.state.password} 
                            onChange={this.handlePassword} placeholder="Enter your password"/>
                    <Flex direction="row" justifyContent="center" color="red" my={4} flexWrap="wrap" display={this.state.ispasswordValid ? "none" : "flex"}>
                        <Text fontSize="xs" >{validatepasswordError}</Text>
                    </Flex>
                    <Input isRequired variant="filled" mb={3}  bg={theme.primary600} type="password" value={this.state.confirmPassword} 
                            onChange={this.handleConfirmPassword} placeholder="Confirm the password"/>
                    <Flex direction="row" justifyContent="center" color="red" my={4} flexWrap="wrap" display={this.state.arePasswordsSame ? "none" : "flex"}>
                        <Text fontSize="xs" >{passwordError}</Text>
                    </Flex>
                    <Button
                        isLoading = {this.state.isLoading}
                        loadingText="please wait..." 
                        size="sm"
                        rounded="full"
                        color={theme.button.primary.color}
                        bg={theme.button.primary.bg}
                        _hover={{ bg: theme.button.primary._hover.bg}}
                        onClick={this.handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Flex mt={6} direction="column" justifyContent="center" alignItems="center">
                        <Text fontSize="xs">By signing up, you agree to gagster's</Text>
                        <Link href="#forgotpassword">
                            <a><Text as="u" fontSize="xs" ml={2}>Terms & Conditions</Text></a>
                        </Link> 
                        <Link href="#forgotpassword">
                            <a><Text as="u" fontSize="xs" ml={2}>Privacy Policy</Text></a>
                        </Link> 
                        <Link href="#forgotpassword">
                            <a><Text as="u" fontSize="xs" ml={2}>Return and Refund Policy</Text></a>
                        </Link>                    
                    </Flex>
                </Flex>
            </Flex> 
        );
    }
}
 
export default SignupForm;