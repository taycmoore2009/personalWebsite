import React from 'react';
import AWS from 'aws-sdk';

import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import TextInput from '../../forms/TextInput';
import ContainedButtons from '../../forms/Button';

export default class SocialMediaWall extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mediaDisplay: '',
            selectedFile: undefined,
        }

        this.mediaTitleRefer = React.createRef();
        this.mediaLinkRefer = React.createRef();
        this.mediaLengthRefer = React.createRef();
        this.mediaImageTitleRefer = React.createRef();
        this.mediaImageLengthRefer = React.createRef();

        // Enter copied or downloaded access ID and secret key here
        const ID = this.props.envConfig.s3ID;
        const SECRET = this.props.envConfig.s3Secret;

        this.s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
    }

    addNewMedia = (event, data) => {
        const media = this.props.media;
        const params = event ? {
            title: this.mediaTitleRefer.current.value,
            link: this.mediaLinkRefer.current.value,
            length: this.mediaLengthRefer.current.value
        } : data;
        media.push(params);
        this.props.setMedia(media);
        this.mediaTitleRefer.current.value = '';
        this.mediaLinkRefer.current.value = '';
        this.mediaLengthRefer.current.value = '';
        this.props.setLoading(false);
    }

    customMediaImageSet = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    customMediaImageUpload = () => {
        const file = this.state.selectedFile;
        const name = this.mediaImageTitleRefer.current.value;
        const fileName = name + Date.now();
        
        // The name of the bucket that you have created
        const params = {
            Bucket: this.props.bucketName,
            Key: fileName, // File name you want to save as in S3
            Body: file,
            ACL: 'public-read'
        };

        this.props.setLoading(true)
        this.s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            this.addNewMedia(false, {
                title: name || this.props.media.length + 1,
                link: data.Location,
                length: this.mediaImageLengthRefer.current.value || 30
            });
            this.setState({
                selectedFile: ''
            });
        });
    }

    showMedia = event => {
        this.setState({mediaDisplay: event.currentTarget.dataset.media});
    }

    deleteMedia = event => {
        const mediaDisplay = this.state.mediaDisplay;
        const media = this.props.media;
        const removedMedia = media.splice(event.currentTarget.previousSibling.dataset.index, 1);
        this.props.setMedia(media);
        if (removedMedia[0].link === mediaDisplay)
            this.setState({mediaDisplay: ''});
    }

    moveMediaUp = event => {
        const media = this.props.media;
        const currentIndex = Number(event.currentTarget.parentElement.parentElement.parentElement.dataset.index);
        const movingMedia = media.splice(currentIndex, 1);
        media.splice(currentIndex-1, 0, movingMedia[0]);
        this.props.setMedia(media);
    }

    moveMediaDown = event => {
        const media = this.props.media;
        const currentIndex = Number(event.currentTarget.parentElement.parentElement.parentElement.dataset.index);
        const movingMedia = media.splice(currentIndex, 1);
        media.splice(currentIndex + 1, 0, movingMedia[0]);
        this.props.setMedia(media);
    }

    render = () => {
        return (
            <Grid container spacing={2} justify='flex-start'>
                <Grid item xs={12} md={6}>
                    {this.props.allowVideos && (
                        <Typography variant='h6'>Images</Typography>
                    )}
                    <ContainedButtons
                        component='label'
                        name='mediaButton'
                        classes={`${this.props.classes.button} ${this.props.classes.fileButton}`}
                    >
                        {this.state.selectedFile ? `file: ${this.state.selectedFile.name}` : 'Select File'}
                        <input 
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={this.customMediaImageSet}
                            type="file"
                            style={{display: 'none'}}
                        />
                    </ContainedButtons>
                    <TextInput
                        refer={this.mediaImageTitleRefer}
                        label='Media Title'
                        color='secondary'
                        name='media'
                        styles={this.props.classes.mediaInput}
                    />
                    <TextInput
                        refer={this.mediaImageLengthRefer}
                        label='Media length'
                        color='secondary'
                        name='media'
                        styles={this.props.classes.mediaInput}
                    />
                    <ContainedButtons
                        onClick={this.customMediaImageUpload}
                        name='mediaButton'
                        classes={this.props.classes.button}
                    >
                        Upload Images
                    </ContainedButtons>
                </Grid>
                {this.props.allowVideos && (
                    <Grid item xs={12} md={6}>
                        <Typography variant='h6'>Videos/links</Typography>
                        <TextInput
                            refer={this.mediaLinkRefer}
                            label='Add New Media Link'
                            color='secondary'
                            name='media'
                            styles={this.props.classes.mediaInput}
                        />
                        <TextInput
                            refer={this.mediaTitleRefer}
                            label='Media Title'
                            color='secondary'
                            name='media'
                            styles={this.props.classes.mediaInput}
                        />
                        <TextInput
                            refer={this.mediaLengthRefer}
                            label='Media length'
                            color='secondary'
                            name='media'
                            styles={this.props.classes.mediaInput}
                        />
                        <ContainedButtons
                            onClick={this.addNewMedia}
                            name='mediaButton'
                            classes={this.props.classes.button}
                        >
                            Add Media
                        </ContainedButtons>
                    </Grid>
                )}
                <Grid item xs={6} md={this.props.allowVideos ? 8 : 6}>
                    <List dense={true}>
                        {this.props.media.map((media, index) => {
                            return (
                                <ListItem button key={index} className={this.props.classes.listItem} data-index={index}>
                                    {this.props.media.length > 1 &&
                                        <ListItemIcon>
                                            <div>
                                                {index !== 0 ? <KeyboardArrowUp onClick={this.moveMediaUp}/> : <div></div>}
                                                {index !== this.props.media.length -1 ? <KeyboardArrowDown onClick={this.moveMediaDown}/> : <div></div>}
                                            </div>
                                        </ListItemIcon>
                                    }
                                    <ListItemText onClick={this.showMedia} data-media={media.link} primary={media.title} />
                                    <ListItemSecondaryAction onClick={this.deleteMedia}>
                                        <IconButton edge="end" aria-label="delete">
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
                <Grid item xs={6} md={this.props.allowVideos ? 6 : 12}>
                    {this.state.mediaDisplay && (
                        <img src={this.state.mediaDisplay} alt='currentMedia' className={this.props.classes.mediaImg}/>
                    )}
                </Grid>
            </Grid>
        );
    }
}