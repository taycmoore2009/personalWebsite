import React from 'react';

import { Grid } from '@material-ui/core';

import SocialCard from './ScrollSocialCard';
import CustomCard from './ScrollCustomCard';

export default class SlideShow extends React.Component {
    
    constructor(props) {
        super(props);
        const slideHeight = this.props.customSlide ? 100 : 350;
        const numOfSlides = Math.ceil(window.innerHeight /slideHeight) + 1;
        const slides = []

        for(var i = 0; i < numOfSlides; i++){
            const nextCard = this.props.getNextCard();
            if (nextCard) slides.push({...this.props.getNextCard(), key: i});
        }

        this.state = {
            slides,
            index: 0
        }

        setTimeout(() => {
            this.startTimer();
        }, this.props.slideDelay || 0);

        this.innerSlideshowRef = React.createRef();
        window.test = this.innerSlideshowRef;
    }

    startTimer = () => {
        const transitionTime = this.props.transitionTime;
        let slideCounter = this.state.slides.length;
        setInterval(() => {
            const newSlide = this.props.getNextCard();
            const slides = this.state.slides;
            if (newSlide) {
                slides.push({...newSlide, key: slideCounter});
                slideCounter = slideCounter === 100 ? 0 : slideCounter + 1;
            }
            this.setState({
                slides,
                isScrolling: true
            });
            const height = this.innerSlideshowRef.current.firstChild ? this.innerSlideshowRef.current.firstChild.offsetHeight : 0;

            setTimeout(() => {
                this.setState({
                    scrollHeight: `-${height}`
                });

                setTimeout(() => {
                    this.setState({
                        isScrolling: false,
                    });
                    setTimeout(() => {
                        this.setState({
                            slides: this.state.slides.slice(1),
                            scrollHeight: '0'
                        });
                    }, transitionTime/5)
                }, transitionTime/3);
            }, transitionTime/5);
        }, transitionTime);
    }

    render() {
        const { classes } = this.props;
        console.log(this.state);

        return (
            <Grid
                container
                direction='column'
                justify='center'
                className={classes.slideShowContainer}
            >
                <Grid
                    container
                    item 
                    xs={12} 
                    className={`${classes.innerSlideshow} ${this.state.isScrolling && classes.transition}`}
                    ref={this.innerSlideshowRef}
                    justify='center'
                    style={{top: `${this.state.scrollHeight}px`}}
                >
                    {this.state.slides.map((slide, i) => {
                        return <Grid item xs={12} key={slide.key}>
                            {this.props.customSlide ? (
                                <CustomCard
                                    classes={classes}
                                    name={slide.title}
                                    img={slide.link}
                                    customStyles={this.props.cardStyles}
                                />
                            ) : (
                                <SocialCard
                                    classes={classes}
                                    name={slide.username || slide.title}
                                    minutes={slide.timestamp || ''}
                                    img={slide.thumbnail_url || slide.media_url || slide.link}
                                    text={slide.caption || ''}
                                    customStyles={this.props.cardStyles}
                                />
                            )}
                        </Grid>
                    })}
                </Grid>
            </Grid>
        )
    }
}
