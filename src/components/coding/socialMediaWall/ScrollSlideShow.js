import React from 'react';

import { Grid } from '@material-ui/core';

import SocialCard from './ScrollSocialCard';

export default class SlideShow extends React.Component {
    
    constructor(props) {
        super(props);
        const numOfSlides = Math.ceil(window.innerHeight /500) + 1;
        const slides = []

        for(var i = 0; i < numOfSlides; i++){
            slides.push(this.props.getNextCard());
        }

        this.state = {
            slides,
            index: 0
        }

        setTimeout(() => {
            this.startTimer();
        }, this.props.startTimeout || 0);

        this.innerSlideshowRef = React.createRef();
        window.test = this.innerSlideshowRef;
    }

    startTimer = () => {
        setInterval(() => {
            const newSlide = this.props.getNextCard();
            const slides = this.state.slides;
            slides.push(newSlide);
            this.setState({
                slides,
                isScrolling: true
            });
            const height = this.innerSlideshowRef.current.firstChild.offsetHeight + 10;

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
                    }, 1000)
                }, 2000);
            }, 1000);
        }, 5000);
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
                </Grid>
            </Grid>
        )
    }
}
