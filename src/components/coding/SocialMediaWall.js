import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';
import { Grid, Typography, Divider, Dialog, DialogTitle, CircularProgress } from '@material-ui/core';
import { SketchPicker } from 'react-color';

import General from './socialMediaAdmin/General';
import Styling from './socialMediaAdmin/Styling';
import CustomMedia from './socialMediaAdmin/CustomMedia';
import SocialMediaInfo from './socialMediaAdmin/SocialMediaInfo';
import ContainedButtons from '../forms/Button';

const styles = () => ({
    wrapper: {
        padding: '20px 0'
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
        display: 'inline',
        margin: '10px 10px'
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
            code: '',
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
        this.newInstaTagsRefer = React.createRef();
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

    generateCode = () => {
        const newCode = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 6);
        this.setState({code: newCode});
    }

    loadSettings = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
        }, 2000)
    }

    addNewMedia = () => {
        const media = this.state.media;
        media.push({
            title: this.newMediaTitleRefer.current.value,
            link: this.newMediaLinkRefer.current.value,
            length: this.newMediaLengthRefer.current.value
        });
        this.newMediaTitleRefer.current.value = '';
        this.newMediaLinkRefer.current.value = '';
        this.newMediaLengthRefer.current.value = '';
        this.setState(media);
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

    generateWall = () => {

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
                            generateCode={this.generateCode}
                            loadSettings={this.loadSettings}
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
                            handleInputChange={this.handleInputChange}
                            generateCode={this.generateCode}
                            classes={classes}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <Styling
                            handleCurrentColorChangeState={this.handleCurrentColorChangeState}
                            handleInputChangeStyle={this.handleInputChangeStyle}
                            state={this.state}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <CustomMedia
                            addNewMedia={this.addNewMedia}
                            newMediaTitleRefer={this.newMediaTitleRefer}
                            newMediaLinkRefer={this.newMediaLinkRefer}
                            newMediaLengthRefer={this.newMediaLengthRefer}
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
                >Generate Wall!</ContainedButtons>
            </Grid>
        )
    }
}


SocialMediaWall.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SocialMediaWall);