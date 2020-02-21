import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import MediaPlayer from './MediaPlayer';
import SlideShow from './SlideShow';

const JSONdata = [
    {
        name: 'taythemighty',
        minutes: '2',
        img: '6',
        text: 'I just picked these two beauties up after their bath #styling #collarandcomb'
    }, {
        name: 'dogLover22',
        minutes: '5',
        img: '2',
        text: 'That ass though #cutie #corgiebutt'
    }, {
        name: 'testuseraccount3',
        minutes: '6',
        img: '3',
        text: '#glowup #beforeandafter #weightloss #shave #dog'
    }, {
        name: 'collarandcomb',
        minutes: '9',
        img: '4',
        text: '#noms'
    }, {
        name: 'prettysteph',
        minutes: '15',
        img: '5',
        text: 'Only the bestes bois get the bestes #treats #colloarandcomb'
    }, {
        name: 'testuseraccount3',
        minutes: '16',
        img: '1',
        text: '#lazy #sundays #pitties #pitbulls #sweetie #dogs'
    }];

const configJson = {
    styles: {
        background: {
            background: 'url("/instaPics/bgImage.jpg") no-repeat center',
            backgroundSize: 'cover'
        },
        header: {
            color: '#FFF',
            textAlign: 'center'
        },
    },
    transitionTime: 5,
    media: [
        {
            src: '<iframe title="vimeo-player" src="https://player.vimeo.com/video/357849250" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
            time: '93'
        },
        {
            src: '<iframe width="560" height="315" src="https://www.youtube.com/embed/6CIKAzMBFC4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            time: '43'
        },
        {
            src: '<iframe width="560" height="315" src="https://www.youtube.com/embed/b4nwq-LaZYI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            time: '71'
        },
        {
            src: '<iframe width="560" height="315" src="https://www.youtube.com/embed/46k_vTfm2Fw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            time: '53'
        },
        {
            src: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gPc9Tb_RSLw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            time: '43'
        }

    ]
}

const styles = () => ({
    bg: {
        width: '100vw',
        height: '100vh',
        ...configJson.styles.background
    },
    wrapper: {
        padding: '20px 0'
    },
    header: configJson.styles.header,
    videoMedia: {
        maxWidth: 'calc(100% - 20px)',
        margin: '10px',
        maxHeight: 'calc(100% - 20px)'
    },
    slideShowContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    innerSlideshow: {
        position: 'absolute',
        top: 0
    },
    transition: {
        transition: '1s all'
    },
    card: {
        maxWidth: 400,
        margin: 10,
        transition: '0.25s all'
    },
    mediaContainer: {
        minHeight: 200,
        maxHeight: 300,
        margin: '0 auto'
    },
    media: {
        maxWidth: '100%',
        maxHeight: '100%'
    }
});

class DisplayWall extends React.Component {

    constructor(props) {
        super(props);

        this.counter = 0;

        this.videoGridRef = React.createRef();
    }

    getNewData = () => {
        const params = JSONdata[this.counter];
        if(this.counter === 4) {
            this.counter = 0;
        } else {
            this.counter = this.counter + 1;
        }

        return params;
    }

    generateSlideshows = () => {
        const { classes } = this.props;
        const numOfSlideshows = Math.floor((window.innerWidth / 2) / 300);
        const slideshowArray = [];

        for(let i = 0; i < numOfSlideshows; i++) {
            slideshowArray.push(
                <Grid item xs={12} md={Math.floor((12/numOfSlideshows)/2)} key={i}>
                    <SlideShow 
                        getNextCard={this.getNewData}
                        classes={classes}
                        startTimeout={2500}
                        transitionTime={configJson.transitionTime}
                    />
                </Grid>
            )
        }
        return slideshowArray;
    }

    render = () => {
        const { classes, refer } = this.props;

        const slideShowArray = this.generateSlideshows();

        return (
            <Grid container ref={refer} className={classes.bg}>
                { configJson.headerText && configJson.headerText !== '' && 
                <Grid item xs={12}>
                    <Typography variant='h1' className={classes.header}>Collar and Comb</Typography>
                </Grid>
                }
                <Grid item container md={6} ref={this.videoGridRef} alignItems='center' justify='center' >
                    <MediaPlayer media={configJson.media} classes={classes} outerRef={this.videoGridRef}/>
                </Grid>
                {
                    slideShowArray.map((Slideshow) => {
                        return Slideshow;
                    })
                }
            </Grid>
        );
    }
}

DisplayWall.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DisplayWall);