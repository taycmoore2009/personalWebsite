import React from 'react';

import { Grid } from '@material-ui/core';

import SocialCard from './SocialCard';

export default class SlideShow extends React.Component {
    
    constructor(props) {
        super(props);
        const numOfSlides = Math.floor(window.innerHeight /500);
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
    }

    startTimer = () => {
        setInterval(() => {
            const slides = this.state.slides;
            const index = this.state.index;
            slides[index] = this.props.getNextCard();

            this.render();
            this.setState({
                slides,
                index: index === slides.length - 1? 0 : index + 1
            });
        }, this.props.transitionTime * 1000);
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
                <Grid item col={12}>
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
