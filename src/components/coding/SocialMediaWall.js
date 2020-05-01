import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';
import AWS from 'aws-sdk';
import { Grid, Typography, Divider, Dialog, DialogTitle, CircularProgress } from '@material-ui/core';
import { SketchPicker } from 'react-color';

import General from './socialMediaAdmin/General';
import Styling from './socialMediaAdmin/Styling';
import CustomMedia from './socialMediaAdmin/CustomMedia';
import SocialMediaInfo from './socialMediaAdmin/SocialMediaInfo';
import ContainedButtons from '../forms/Button';
import envConfig from '../../envConfig'

const BUCKET_NAME = 'personalwebsitefiles';

const styles = () => ({
    wrapper: {
        padding: '20px 0 80px'
    },
    loader: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: 'rgba(55, 55, 55, .5)',
        zIndex: 1,
        top: 0,
        left: 0
    },
    loadingCircle: {
        position: 'absolute',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)'
    },
    card: {
        maxWidth: 345,
        margin: '20px auto'
    },
    media: {
        height: 190
    },
    button: {
        minWidth: 200,
        display: 'inline-block',
        margin: '10px 10px',
        textAlign: 'center'
    },
    fileButton: {
        minWidth: 195,
        width: 195,
    },
    divider: {
        backgroundColor: '#FFF'
    },
    newMediaInput: {
        maxWidth: 300,
        display: 'inline-block',
        margin: '10px 10px'
    },
    listItem: {
        backgroundColor: '#FFF',
        color: "#000",
        '&:hover': {
            backgroundColor: '#DDD'
        }
    },
    mediaImg: {
        width: '100%'
    },
    tag: {
        border: '1px solid #e639d8',
        color: '#e639d8',
        margin: 3,
        backgroundColor: '#292c34'
    },
    tagClose: {
        fontSize: 12,
        position: 'absolute',
        top: -4,
        right: -4,
        border: '1px solid',
        borderRadius: 5,
        backgroundColor: '#292c34'
    },
    instaAccount: {
        margin: 10
    },
    submitBtn: {
        position: 'fixed',
        bottom: 10,
        right: 10,
        width: 300,
        maxWidth: '100%'
    }
});

class SocialMediaWall extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            secretKey: '',
            selectedFile: null,
            loading: false,
            transitionType: '',
            transitionTime: 5,
            layout: 'leftMedia',
            spacing: '2',
            media: [],
            instaTags: [],
            instaAccount: '',
            headerText: '',
            currentColorChangeState: '',
            mediaDisplay: '',
            styles: {
                background: {
                    color: '',
                    img: '',
                    size: ''
                },
                header: {
                    color: '',
                    textAlign: '',
                    size: ''
                },
                card: {
                    bgColor: '',
                    borColor: '',
                    color: ''
                }
            },
        };

        this.newMediaTitleRefer = React.createRef();
        this.newMediaLinkRefer = React.createRef();
        this.newMediaLengthRefer = React.createRef();
        this.newMediaImageTitleRefer = React.createRef();
        this.newMediaImageLengthRefer = React.createRef();
        this.newInstaTagsRefer = React.createRef();

        // Enter copied or downloaded access ID and secret key here
        const ID = envConfig.s3ID;
        const SECRET = envConfig.s3Secret;

        console.log(this);
        this.s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
    }

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleCurrentColorChangeState = event => {
        this.setState({currentColorChangeState: event.target.name});
    }

    handleChangeColor = event => {
        const params = this.state.currentColorChangeState.split('.');
        const styles = this.state.styles;
        styles[params[0]][params[1]] = event.hex;
        this.setState({styles})
    }

    handleInputChangeStyle = event => {
        const {name, value} = event.target;
        const params = name.split('.');
        const styles = this.state.styles;
        styles[params[0]][params[1]] = value;
        this.setState(styles);
    }

    hideColorSelector = () => {
        this.setState({currentColorChangeState: ''})
    }

    generatekey = () => {
        const newCode = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 16);
        this.setState({secretKey: newCode});
    }

    loadSettings = () => {
        this.setState({loading: true});
        this.getWall({code: this.state.code, secretKey: this.state.secretKey})
        .then((resp) => {
            this.setState({loading: false, ...resp});
        })
        .catch((err) => {
            console.log(err);
            this.setState({loading: false});
        });
    }

    addNewMedia = (event, data) => {
        const media = this.state.media;
        const params = event ? {
            title: this.newMediaTitleRefer.current.value,
            link: this.newMediaLinkRefer.current.value,
            length: this.newMediaLengthRefer.current.value
        } : data;
        media.push(params);
        this.newMediaTitleRefer.current.value = '';
        this.newMediaLinkRefer.current.value = '';
        this.newMediaLengthRefer.current.value = '';
        this.setState({loading: false});
    }

    showMedia = event => {
        this.setState({mediaDisplay: event.currentTarget.dataset.media});
    }

    deleteMedia = event => {
        const {media, mediaDisplay} = this.state;
        const removedMedia = media.splice(event.currentTarget.previousSibling.dataset.index, 1);
        const newObj = removedMedia[0].link === mediaDisplay ? {mediaDisplay: '', media} : media;
        this.setState(newObj);
    }

    moveMediaUp = event => {
        const media = this.state.media;
        const currentIndex = Number(event.currentTarget.parentElement.parentElement.dataset.index);
        const movingMedia = media.splice(currentIndex, 1);
        media.splice(currentIndex-1, 0, movingMedia[0]);
        this.setState(media);
    }

    moveMediaDown = event => {
        const media = this.state.media;
        const currentIndex = Number(event.currentTarget.parentElement.parentElement.dataset.index);
        const movingMedia = media.splice(currentIndex, 1);
        media.splice(currentIndex + 1, 0, movingMedia[0]);
        this.setState(media);
    }

    addNewInstaTag = () => {
        const instaTags = this.state.instaTags;
        instaTags.push(this.newInstaTagsRefer.current.value);
        this.newInstaTagsRefer.current.value = '';
        this.setState(instaTags);
    }

    removeInstaTag = (index) => {
        this.state.instaTags.splice(index, 1);
        this.setState(this.state.instaTags);
    }

    addInstaAccount = () => {
        let newWin = window.open(`https://www.instagram.com/oauth/authorize?client_id=166812134651391&redirect_uri=${window.location.href}/auth?wallCode=${this.state.code}&scope=user_profile,user_media&response_type=code`,);

        this.setState({loading: true});
        const timer = window.setInterval(() => {
            if(newWin.closed) {
                this.setState({loading: false});
                console.log("closed!");
                window.clearInterval(timer);
            }
            
        }, 200);
    }
    generateWall = () => {
        this.setState({loading: true});
        this.postWall(this.state)
            .then((resp) => {
                this.setState({loading: false});
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading: false});
            });
    }

    validate = () => {
        
    }

    singleFileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files
        });
    }

    customMediaImageSet = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }
    customMediaImageUpload = () => {
        const file = this.state.selectedFile;
        const name = this.newMediaImageTitleRefer.current.value;
        const fileName = name + Date.now();
        
        // The name of the bucket that you have created
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: file,
            ACL: 'public-read'
        };

        this.setState({loading: true});
        this.s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            this.addNewMedia(false, {
                title: name || this.state.media.length + 1,
                link: data.Location,
                length: this.newMediaImageLengthRefer.current.value || 30
            });
            this.setState({
                selectedFile: ''
            });
        });
    }
    getWall = async (data) => {
        const url = new URL('https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/socialData');
        Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
        const promise = await fetch(url);
        return await promise.json();
    }
    postWall = async (data) => {
        const promise = await fetch('https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/socialData',
            {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return await promise.json();
    }
    backgroundImageUpload = (event) => {
        const file = event.target.files[0];
        if ( file ) {
            const fr = new FileReader();
            fr.onload = () => {
                this.handleInputChangeStyle({target: {name: 'background.img', value: fr.result}});
            }
            fr.readAsDataURL(file);
        } else {
            console.log('error');
        }
    }
    render = () => {
        const { classes } = this.props;
        const { styles, currentColorChangeState } = this.state;
        const colorParams = this.state.currentColorChangeState.split('.');

        return (
            <Grid item xs={12} className={classes.wrapper}>
                {this.state.loading && <div className={classes.loader}><CircularProgress className={classes.loadingCircle}/></div>}
                <Grid container spacing={2}>
                    <Grid item xs={12}><Typography variant='h3'>Social Media Wall Admin Page</Typography></Grid>
                    <Grid item xs={12}>
                        <General 
                            state={this.state} 
                            handleInputChange={this.handleInputChange}
                            generatekey={this.generatekey}
                            loadSettings={this.loadSettings}
                            generateWall={this.generateWall}
                            validate={this.validate}
                            classes={classes}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <SocialMediaInfo
                            addNewInstaTag={this.addNewInstaTag}
                            newInstaTagsRefer={this.newInstaTagsRefer}
                            removeInstaTag={this.removeInstaTag}
                            state={this.state} 
                            addInstaAccount={this.addInstaAccount}
                            handleInputChange={this.handleInputChange}
                            classes={classes}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <Styling
                            handleCurrentColorChangeState={this.handleCurrentColorChangeState}
                            handleInputChangeStyle={this.handleInputChangeStyle}
                            backgroundImageUpload={this.backgroundImageUpload}
                            state={this.state}
                            classes={classes}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <CustomMedia
                            addNewMedia={this.addNewMedia}
                            newMediaTitleRefer={this.newMediaTitleRefer}
                            newMediaLinkRefer={this.newMediaLinkRefer}
                            newMediaLengthRefer={this.newMediaLengthRefer}
                            newMediaImageTitleRefer={this.newMediaImageTitleRefer}
                            newMediaImageLengthRefer={this.newMediaImageLengthRefer}
                            customMediaImageUpload={this.customMediaImageUpload}
                            customMediaImageSet={this.customMediaImageSet}
                            showMedia={this.showMedia}
                            deleteMedia={this.deleteMedia}
                            moveMediaUp={this.moveMediaUp}
                            moveMediaDown={this.moveMediaDown}
                            classes={classes}
                            state={this.state}
                        />
                    </Grid>
                </Grid>
                <Dialog onClose={this.hideColorSelector} aria-labelledby="simple-dialog-title" open={currentColorChangeState !== '' ? true : false}>
                    <DialogTitle id="simple-dialog-title">Color Picker</DialogTitle>
                    {currentColorChangeState && <SketchPicker
                        color={ styles[colorParams[0]][colorParams[1]] }
                        onChange={ this.handleChangeColor }
                    />}
                </Dialog>
                <ContainedButtons
                    classes={classes.submitBtn}
                    onClick={this.generateWall}
                >Save Wall</ContainedButtons>
            </Grid>
        )
    }
}


SocialMediaWall.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SocialMediaWall);