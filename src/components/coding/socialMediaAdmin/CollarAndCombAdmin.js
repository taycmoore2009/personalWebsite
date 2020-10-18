import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';
import AWS from 'aws-sdk';
import { Grid, Typography, Divider, Dialog, DialogTitle, CircularProgress, Switch } from '@material-ui/core';
import { SketchPicker } from 'react-color';

import General from './General';
import Styling from './Styling';
import CustomMedia from './CustomMedia';
import SocialMediaInfo from './SocialMediaInfo';
import YelpReviews from './YelpReviews';
import ContainedButtons from '../../forms/Button';
import envConfig from '../../../envConfig'

const BUCKET_NAME = 'personalwebsitefiles';

const styles = () => ({
    wrapper: {
        padding: '40px 20px',
        backgroundImage: 'url(/imgs/glasses.png)',
        backgroundPosition: 'center',
        backgroundColor: '#282c34',
        color: 'white'
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
        margin: '10px 10px 10px 0',
        textAlign: 'center'
    },
    fileButton: {
        width: '100%',
        height: 56,
        margin: '10px 0 0',
        textAlign: 'left'
    },
    bgFileButton: {
        width: '100%',
        margin: '10px 0',
        height: 56
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

class CollarAndCombAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: 'collarandcomb',
            secretKey: 'wag',
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
            customSlideshow: [],
            showCustomSlideshow: false,
            yelpNumOfReviews: 0,
            yelpReviews: [],
            backgroundImageName: '',
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

        this.newInstaTagsRefer = React.createRef();

        const ID = envConfig.s3ID;
        const SECRET = envConfig.s3Secret;

        this.s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
    }

    componentDidMount = () => {
        this.loadSettings();
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
        let colorString = '';
        for(let key in event.rgb) {
            colorString += event.rgb[key] +', ';
        }
        styles[params[0]][params[1]] = `rgba(${colorString.substr(0, colorString.length - 2)})`;
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

    setLoading = state => {
        this.setState({loading: state});
    }

    setMedia = media => {
        this.setState(media);
    }

    setCustomSlideshow = customSlideshow => {
        this.setState(customSlideshow);
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
        let newWin = window.open(`https://www.instagram.com/oauth/authorize?client_id=166812134651391&redirect_uri=${window.location.href}/auth&state=${this.state.code}&scope=user_profile,user_media&response_type=code`,);

        this.setState({loading: true});
        const timer = window.setInterval(() => {
            if(newWin.closed) {
                this.loadSettings();
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
        const name = file.name || this.state.code;
        const styles = this.state.styles;
        if ( file ) {
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
                    this.setState({loading: false});
                    throw err;
                }
                styles.background.img = data.Location;
                this.setState({
                    loading: false,
                    styles,
                    backgroundImageName: name
                });
            });
        } else {
            console.log('error');
        }
    }
    removeBackgroundImg = () => {
        const styles = this.state.styles;
        styles.background.img = '';
        this.setState({styles});
    }

    addYelpReview = (review) => {
        const yelpReviews = this.state.yelpReviews;
        
        yelpReviews.push(review);
        this.setState(yelpReviews);
    }

    setNumOfReviews = (num) => {
        this.setState({yelpNumOfReviews: num});
    }

    removeYelpReview = (index) => {
        const yelpReviews = this.state.yelpReviews;

        yelpReviews.splice(index, 1);
        this.setState(yelpReviews);
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
                            showLogin={false}
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
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Custom Slideshow <Switch onChange={(event, value) => {this.setState({showCustomSlideshow: value})}}></Switch>
                            </Typography>
                        </Grid>
                        {this.state.showCustomSlideshow && <CustomMedia
                                setLoading={this.setLoading}
                                classes={classes}
                                media={this.state.customSlideshow}
                                setMedia={this.setCustomSlideshow}
                                envConfig={envConfig}
                                bucketName={BUCKET_NAME}
                                s3={this.s3}
                            />
                        }
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <Styling
                            handleCurrentColorChangeState={this.handleCurrentColorChangeState}
                            handleInputChangeStyle={this.handleInputChangeStyle}
                            backgroundImageUpload={this.backgroundImageUpload}
                            removeBackgroundImg={this.removeBackgroundImg}
                            state={this.state}
                            classes={classes}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}><Typography variant='h4'>Manage Custom Media</Typography></Grid>
                        <CustomMedia
                            allowVideos={true}
                            setLoading={this.setLoading}
                            classes={classes}
                            media={this.state.media}
                            setMedia={this.setMedia}
                            envConfig={envConfig}
                            bucketName={BUCKET_NAME}
                            s3={this.s3}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <YelpReviews
                            classes={classes}
                            setNumOfReviews={this.setNumOfReviews}
                            numOfReviews={this.state.yelpNumOfReviews}
                            addYelpReview={this.addYelpReview}
                            removeYelpReview={this.removeYelpReview}
                            reviews={this.state.yelpReviews}
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


CollarAndCombAdmin.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CollarAndCombAdmin);