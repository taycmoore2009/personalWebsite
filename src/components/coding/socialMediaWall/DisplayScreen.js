import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid, Typography, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Instagram } from '@material-ui/icons';

// import SocialCard from './SocialCard';

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
    prices: {
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
        maxWidth: '90%',
        margin: '10px auto'
    },
    media: {
        height: 190
    },
    pricesMedia: {
        height: '100%'
    }
});

class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            media: props.media,
            index: 0
        }

    }

    startTimer = () => {

        const {index, media} = this.state;
        const currentMedia = media[index];

        setTimeout(() => {
            console.log('ended');
            this.setState({index: index === this.state.media.length - 1 ? 0 : index + 1});
        }, Number(currentMedia.time) * 1000);
    }

    render() {
        const {classes} = this.props;
        const {index, media} = this.state;
        const currentMedia = media[index];
        const src = currentMedia.src

        if(src.includes('.jpg') || src.includes('.png') || src.includes('.gif') || src.includes('.jpeg')) {
            return (
                <img
                    onLoad={this.startTimer}
                    src={src}
                    alt='special media'
                />
            );
        }

        const regexSrc = /<iframe.*?src=['"](.*?)['"]/;
        const regexHeight = /<iframe.*?height=['"](.*?)['"]/;
        const regexWidth = /<iframe.*?width=['"](.*?)['"]/;

        // debugger;
        
        if(this.props.outerRef.current) {
            const girdWidth = this.props.outerRef.current.offsetWidth;
            const iframeHeight = Number(regexHeight.exec(src)[1] || 1);
            const iframeWidth = Number(regexWidth.exec(src)[1] || 1);
            const height = (iframeHeight / iframeWidth) * girdWidth;
            return (
                <iframe
                    onLoad={this.startTimer}
                    title='dogs' 
                    className={classes.prices} 
                    src={`${regexSrc.exec(src)[1] || ''}?autoplay=1`}
                    width={`${girdWidth - 20}px`}
                    height={`${height}px`} 
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                ></iframe>
            );
        }
        return (
            <div></div>
        );
    }
}

function SocialCard(props) {
    const { classes, name, minutes, img, text } = props;

    return (
        <Card className={classes.card} style={{border: '1px solid #c49c5e'}} variant='elevation'>
            <CardHeader
                avatar={(<Instagram/>)}
                title={`@${name}`}
                subheader={`${minutes} minutes ago`}
            />
            <CardMedia image={`/instaPics/dog${img}.jpg`} className={classes.media}/>
            <CardContent>
                <Typography>{text}</Typography>
            </CardContent>
        </Card>
    )
}

class SlideShow extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            slides: props.slide,
            isScrolling: false
        }

        this.innerSlideshowRef = React.createRef();

        setTimeout(() => {
            this.startTimer();
        }, this.props.startTimeout || 0);
    }

    startTimer = () => {
        setInterval(() => {
            const newSlide = this.props.getNextCard();
            const slides = this.state.slides;
            slides.push(newSlide);
            this.setState({slides, isScrolling: true});
        }, 5000);
    }

    componentDidUpdate = () => {
        const { classes } = this.props;
        setTimeout(() => {
            if(this.state.isScrolling) {
                this.innerSlideshowRef.current.firstChild.classList.add(classes.transition);
                const height = this.innerSlideshowRef.current.firstChild.firstChild.offsetHeight + 10;
                this.innerSlideshowRef.current.firstChild.style.top = '-'+ height +'px';

                setTimeout(() => {
                    this.innerSlideshowRef.current.firstChild.classList.remove(classes.transition);
                    const slides = this.state.slides;
                    slides.shift();
                    this.innerSlideshowRef.current.firstChild.style.top = '0px';
                    this.setState({slides, isScrolling: false});
                }, 1000)
            }
        }, 0);
    }

    render = () => {
        const { classes } = this.props;

        return (
            <div className={classes.slideShowContainer} ref={this.innerSlideshowRef}>
                <div className={classes.innerSlideshow}>
                    {this.state.slides.map((slide, i) => {
                        return <SocialCard
                            key={i}
                            classes={classes}
                            name={slide.name}
                            minutes={slide.minutes}
                            img={slide.img}
                            text={slide.text}
                            styles={classes}
                        />
                    })}
                </div>
            </div>
        )
    }
}

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

    getCard = () => {
        const params = this.getNewData();
        return this.generateCard(params);
    }

    generateCard = (params) => {
        const { classes } = this.props;
        return <SocialCard 
                name={params.name}
                minutes={params.minutes}
                getNewData={this.getNewData}
                img={params.img}
                text={params.text}
                timeout={this.counter}
                styles={classes}
            />
    }

    render = () => {
        const { classes, refer } = this.props;

        return (
            <Grid container ref={refer} className={classes.bg}>
                { configJson.headerText && configJson.headerText !== '' && 
                <Grid item md={12}>
                    <Typography variant='h1' className={classes.header}>Collar and Comb</Typography>
                </Grid>
                }
                <Grid item container md={6} ref={this.videoGridRef} alignItems='center'>
                    <MediaPlayer media={configJson.media} classes={classes} outerRef={this.videoGridRef}/>
                </Grid>
                <Grid item md={3}>
                    <SlideShow 
                        slide={[this.getNewData(), this.getNewData(), this.getNewData()]}
                        getNextCard={this.getNewData}
                        classes={classes}
                        startTimeout={2500}
                    />
                </Grid>
                <Grid item md={3}>
                    <SlideShow 
                        slide={[this.getNewData(), this.getNewData(), this.getNewData()]}
                        getNextCard={this.getNewData}
                        classes={classes}
                        startTimeout={0}
                    />
                </Grid>
            </Grid>
        );
    }
}

DisplayWall.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DisplayWall);