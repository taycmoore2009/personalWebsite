import React from 'react';

import { Grid } from '@material-ui/core';

import SocialCard from './ScrollSocialCard';

export default class SlideShow extends React.Component {
    
    constructor(props) {
        super(props);
        const numOfSlides = Math.ceil(window.innerHeight /500) + 1;
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
            const height = this.innerSlideshowRef.current.firstChild ? this.innerSlideshowRef.current.firstChild.offsetHeight + 10 : 0;

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

        return (
            <Grid
                container
                direction='column'
                justify='center'
                className={classes.slideShowContainer}
            >
                <Grid 
                    item 
                    col={12} 
                    className={`${classes.innerSlideshow} ${this.state.isScrolling && classes.transition}`}
                    ref={this.innerSlideshowRef}
                    t={this.state.scrollHeight}
                    style={{top: `${this.state.scrollHeight}px`}}
                >
                    {this.state.slides.map((slide, i) => {
                        return <div key={slide.key}>
                            <SocialCard
                                classes={classes}
                                name={slide.username}
                                minutes={slide.timestamp}
                                img={slide.thumbnail_url || slide.media_url}
                                text={slide.caption}
                                styles={classes}
                                customStyles={this.props.cardStyles}
                            />
                        </div>
                    })}
                </Grid>
            </Grid>
        )
    }
}
