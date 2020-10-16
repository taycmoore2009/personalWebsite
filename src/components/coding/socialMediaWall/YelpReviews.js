import React from 'react';

import { Grid } from '@material-ui/core';

export default class YelpReviews extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            slides: props.reviews,
            currentSlide: props.reviews[0],
            opacity: 1
        }
        this.layoutRef = React.createRef();
        this.startTimer();
    }

    yelpScript = () => {
        const script = document.createElement('script');

        script.id = 'yelpReviewScript';
        script.src = "https://www.yelp.com/embed/widgets.js";
        script.async = true;
        script.type = "text/javascript";
        return script;
    }
    startTimer = () => {
        const slideCounter = this.state.slides.length;
        const slides = this.state.slides;
        let index = 0;

        
        document.body.appendChild(this.yelpScript());
        if (this.props.reviews.length > 1) {
            setInterval(() => {
                index = index+1 >= slideCounter ? 0 : index+1;
                this.layoutRef.current.style.opacity = 0;
                document.getElementById('yelpReviewScript').remove();
                setTimeout(() => {
                    this.setState({
                        opacity: 0,
                        currentSlide: slides[index]
                    });
                    document.body.appendChild(this.yelpScript());
                    setTimeout(() => {
                        this.setState({
                            opacity: 1
                        });
                    }, 2000);
                }, 2000);
            }, 60000);
        }
    }

    render() {
        
        return (
            <Grid
                container
                direction='column'
                justify='center'
                ref={this.layoutRef}
                style={{
                    transition: 'all 2s',
                    opacity: this.state.opacity
                }}
            >
                {this.state.currentSlide && (
                    <span className="yelp-review" data-review-id={this.state.currentSlide.value} data-hostname="www.yelp.com">{this.state.currentSlide.title}</span>)
                }
            </Grid>
        )
    }
}