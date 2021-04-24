import Link from 'next/link';
import React, { Component } from 'react';
import { AppContext } from '../context/state';
import Router from 'next/router'
import { Flex } from '@chakra-ui/layout';
import theme from '../utils/theme';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Heading, Text } from '@chakra-ui/layout';

class UploadForm extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            tags: '',
            price: 0.0,
            file: null,
            uploadFailed: false,
            errorMessage: '',
            isLoading: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleisLoading = this.handleisLoading.bind(this);
    }
    handleisLoading(value) {
        this.setState({isLoading: value});
    }

    componentDidMount() {
        const { appState } = this.context
        if(!appState.isLoggedIn) {
            Router.push("/login")
        } 
    }
    
    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleFile(event) {
        this.getBase64(event.target.files[0], (result) => {
            this.setState({
                file: result
            });
        })
    }
    handleTitle(event) {
        this.setState({title: event.target.value});
    }
    
    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handleTags(event) {
        this.setState({tags: event.target.value});
    }
    
    handlePrice(event) {
        this.setState({price: event.target.value});
    }

    handleSubmit(event) {
        const { appState } = this.context
        event.preventDefault();
        console.log(this.state.file)
        if(this.state.file === null){
            this.setState({
                uploadFailed: true,
                errorMessage: "Please select image",
                isLoading: false
            });
            return
        }
        if(this.state.title === '') {
            this.setState({
                uploadFailed: true,
                errorMessage: "Title is missing",
                isLoading: false
            });
            return
        }
        if(this.state.description === '') {
            this.setState({
                uploadFailed: true,
                errorMessage: "Description is missing",
                isLoading: false
            });
            return
        }
        if(this.state.tags === '') {
            this.setState({
                uploadFailed: true,
                errorMessage: "Tags is missing",
                isLoading: false
            });
            return
        }
        this.handleisLoading(true);
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + appState.auth_token,
            },
            body: JSON.stringify({ 
                file: this.state.file,
                title: this.state.title,
                description: this.state.description,
                tags: this.state.tags.split(','),
                price: parseFloat(this.state.price)
             })
        };
        fetch('http://localhost:8080/api/v1/gags/' + appState.user.ID, requestOptions)
            .then(async response => {
                if(response.status != 200) {
                    if(response.status == 401) {
                        this.handleisLoading(false);
                        return Promise.reject("Not authorized")
                    }
                    const data = await response.json();
                    this.handleisLoading(false);
                    return Promise.reject(data.message);
                }
                
                const data = await response.json();
                
                this.setState({uploadFailed: false});
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    uploadFailed: true,
                    errorMessage: error,
                    isLoading: false
                });
            });
    }

    state = {  }
    render() { 
        let errorLable;
        if(this.state.uploadFailed)
            errorLable = this.state.errorMessage;
        else
            errorLable='';
        return ( 
            <Flex my={10}
            alignItems="center"
            justifyContent="center">
                <Flex direction="column"
                    bg={theme.primary800}
                    p={12}
                    rounded={6}
                    boxShadow="dark-lg"
                    color="white">
                    <Heading as="h1" textAlign="center" mb={6}>Upload A Gag</Heading>
                    <Flex direction="row" justifyContent="center" color="red" my={4} flexWrap="wrap" display={!this.state.uploadFailed ? "none" : "flex"}>
                        <Text fontSize="xs" >{errorLable}</Text>
                    </Flex>
                        <Flex direction={["column", "column", "row"]}>
                            <Flex direction="column" m={2} w={["100%", "100%", "50%"]}>
                                    <Input isRequired variant="filled" mb={3} bg={theme.primary600} type="text" value={this.state.title} 
                                        onChange={this.handleTitle} placeholder="Enter gag title"/>
                                    <Input isRequired variant="filled" mb={3} bg={theme.primary600} type="text" value={this.state.description} 
                                        onChange={this.handleDescription} placeholder="Enter gag descrption"/>
                                    <Input isRequired variant="filled" mb={3} bg={theme.primary600} type="text" value={this.state.tags} 
                                        onChange={this.handleTags} placeholder="Enter tags"/>
                                    <Text fontSize="sm">Please enter comma (,) seperated tags</Text>
                                    <Input isRequired variant="filled" mb={3} bg={theme.primary600} type="number" value={this.state.price} 
                                        onChange={this.handlePrice} placeholder="Enter gag price"/>
                                    <Text>Enter 0 for free gag</Text>
                            </Flex>
                            <Flex direction="column"  w={["100%", "100%", "50%"]} m={2} borderColor={theme.secondary} borderWidth="1px" p={5} borderStyle="dotted" justify="center" align="center">
                                    <div>
                                        <Input isRequired type="file" name="file" id="file" accept="image/*" onChange={this.handleFile} display="none" />
                                        <Text as="label" htmlFor="file">Click here to select image</Text>
                                        <img src={this.state.file} width="200px"/>
                                    </div>
                            </Flex>
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
                        Upload Gag
                    </Button>
                </Flex>
            </Flex> 
        );
    }
}
 
export default UploadForm;
