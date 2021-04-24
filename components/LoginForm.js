import Link from 'next/link';
import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import { AppContext } from '../context/state';
import Router from 'next/router'
import { Flex } from '@chakra-ui/layout';
import theme from '../utils/theme';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Heading, Text } from '@chakra-ui/layout';

class LoginForm extends Component {
    static contextType = AppContext

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginFailed: false,
            loginErrorMessage: '',
            isLoading: false
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleisLoading = this.handleisLoading.bind(this);
    }
    
    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    
    handleisLoading(value) {
        this.setState({isLoading: value});
    }
    
    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {

        this.handleisLoading(true);

        if(this.state.email === '') {
            this.setState({
                loginFailed: true,
                loginErrorMessage: "Email is missing",
                isLoading: false
            });
            return
        }
        if(this.state.password === '') {
            this.setState({
                loginFailed: true,
                loginErrorMessage: "Password is missing",
                isLoading: false
            });
            return
        }

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
                    this.handleisLoading(false);
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
                    loginErrorMessage: error,
                    isLoading: false
                });
            });
    }

    state = {  }
    render() { 
        var xx = false
        let errorLable;
        if(this.state.loginFailed)
            errorLable = this.state.loginErrorMessage;
        else
            errorLable='';
        return (
            <Flex
                my={10}
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    direction="column"
                    bg={theme.primary800}
                    p={12}
                    rounded={6}
                    boxShadow="dark-lg"
                    color="white"
                >
                    <Heading as="h1" textAlign="center" mb={6}>Log In</Heading>
                    <Flex direction="row" justifyContent="center" color="red" my={4} flexWrap="wrap"  display={!this.state.loginFailed ? "none" : "flex"}>
                        <Text fontSize="xs" >{errorLable}</Text>
                    </Flex>
                    <Input isRequired="true" placeholder="Enter your email" variant="filled" bg={theme.primary600} mb={3} type="email" value={this.state.email} 
                            onChange={this.handleEmail}/>
                    <Input isRequired="true" variant="filled" mb={3} placeholder="Enter your password" bg={theme.primary600} type="password" value={this.state.password} 
                            onChange={this.handlePassword} />
                    <Flex direction="row" justifyContent="flex-end">
                        <Link href="#forgotpassword">
                            <a><Text as="u" fontSize="xs">Forgot password</Text></a>
                        </Link>                    
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
                        Log In
                    </Button>
                    <Flex mt={6} direction="row" justifyContent="center" alignItems="center">
                        <Text fontSize="xs">New to Gagster? </Text>
                        <Link href="#forgotpassword">
                            <a><Text as="u" fontSize="xs" ml={2}>Sign Up</Text></a>
                        </Link>                    
                    </Flex>
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
 
export default LoginForm;