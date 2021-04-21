import Link from 'next/link';
import React, { Component } from 'react';
import { AppContext } from '../context/state';
import Router from 'next/router'
import styles from '../styles/Form.module.scss';

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
            errorMessage: ''
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
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
        // let reader = new FileReader();
        // reader.readAsDataURL();
        // reader.onload = function () {
        //     this.setState({
        //         file: reader.result
        //     });c
        // };
        // reader.onerror = function (error) {
        //     console.log('Error: ', error);
        // };
        // this.setState({
        //     file: URL.createObjectURL(event.target.files[0])
        // });
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
            return
        }
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
                        return Promise.reject("Not authorized")
                    }
                    const data = await response.json();
                    return Promise.reject(data.message);
                }
                
                const data = await response.json();
                
                this.setState({uploadFailed: false});
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    uploadFailed: true,
                    errorMessage: error
                });
            });
    }

    state = {  }
    render() { 
        let errorLable;
        if(this.state.uploadFailed)
            errorLable = <label className={styles['form-control'] + ' ' + styles['form-text']+ ' ' + styles['text-danger']+ ' ' + styles['x-small'] + ' ' + styles['text-center']}>{this.state.errorMessage}</label>;
        else
            errorLable=<></>;
        return ( 
            <div className={styles.container}>
                <div className={styles.upload}>
                    <h1 className={styles.lead + ' ' + styles['text-primary'] + ' ' + styles['text-center']}>Upload A Gag</h1>
                    {errorLable}
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles["upload-row"]}>
                            <div className={styles["upload-column"]}>
                                    <input required className={styles['form-control'] + ' ' + styles['form-text']} type="text" value={this.state.title} 
                                        onChange={this.handleTitle} placeholder="Enter gag title"/>
                                    <input required className={styles['form-control'] + ' ' + styles['form-text']} type="text" value={this.state.description} 
                                        onChange={this.handleDescription} placeholder="Enter gag descrption"/>
                                    <input required className={styles['form-control'] + ' ' + styles['form-text']} type="text" value={this.state.tags} 
                                        onChange={this.handleTags} placeholder="Enter tags"/>
                                    <label className={styles['form-control'] + ' ' + styles['xx-small'] + ' ' + styles['text-light']}>Please enter comma (,) seperated tags</label>
                                    <input required className={styles['form-control'] + ' ' + styles['form-text']} type="number" value={this.state.price} 
                                        onChange={this.handlePrice} placeholder="Enter gag price"/>
                                    <label className={styles['form-control'] + ' ' + styles['xx-small'] + ' ' + styles['text-light']}>Enter 0 for free gag</label>
                            </div>
                            <div className={styles["upload-column"]}>
                                    <div className={styles["upload-image-button"]}>
                                        <input type="file" name="file" id="file" className={styles['inputfile']} accept="image/*" onChange={this.handleFile} />
                                        <label htmlFor="file" className={styles['x-small']}>Click here to select image</label>
                                        <img src={this.state.file} className={styles["upload-image-button-img"]}/>
                                    </div>
                            </div>
                        </div>
                        <input className={styles['form-control'] + ' ' + styles['btn'] + ' ' + styles['btn-primary']} type="submit" value="Submit"/>
                    </form>
                </div>
            </div> 
        );
    }
}
 
export default UploadForm;
