import { withStyles } from "@material-ui/styles";
import { PropTypes } from "prop-types";
import React from 'react';

import { Grid } from '@material-ui/core';

/**
 * background-image: url(https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9ad0d1950864/assets/img/stars/stars@2x.png);
    width: 102px;
    height: 18px;
    background-position: 0 -402px;
    background-size: 132px 560px;
    display: inline-block;
    vertical-align: middle;
 */

const styles = () => ({
    yelpWrapper: {
        backgroundColor: '#FFF',
        border: '1px solid #ddd',
        borderRadius: 3,
        padding: 4,
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: 12,
        height: 188,
        overflow: 'hidden'
    },
    topWrapper: {
        borderBottom: '1px solid #DDD',
        marginBottom: 5,
        height: 60,
    },
    storeWrapper: {
        display: 'inline-block',
        width: 'calc(100% - 50px)'
    },
    storeTitle: {
        fontSize: 14,
        color: '#0073bb',
        fontWeight: 600,
    },
    yelpStars: {
        backgroundImage: "url(https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9ad0d1950864/assets/img/stars/stars@2x.png)",
        width: 88,
        margin: '5px 0',
        backgroundPosition: '0px 14px',
        height: 14,
        backgroundSize: '132px 560px',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    yelpName: {
        fontSize: 12,
        color: '#0073bb',
        fontWeight: 600
    },
    yelpReview: {
        height: 85,
        overflow: 'hidden'
    }
});

class YelpReviews extends React.Component {
    
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
    startTimer = () => {
        const slideCounter = this.state.slides.length;
        const slides = this.state.slides;
        let index = 0;

        if (this.props.reviews.length > 1) {
            setInterval(() => {
                index = index+1 >= slideCounter ? 0 : index+1;
                this.layoutRef.current.style.opacity = 0;
                setTimeout(() => {
                    this.setState({
                        opacity: 0,
                        currentSlide: slides[index]
                    });
                    setTimeout(() => {
                        this.setState({
                            opacity: 1
                        });
                    }, 1000);
                }, 2000);
            }, 60000);
        }
    }

    render() {
        const classes = this.props.classes;
        const date = this.state.currentSlide.value.split('{summary}')[0];
        const summary = this.state.currentSlide.value.split('{summary}')[1].replaceAll("\n", "<br/>");

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
                    <div className={classes.yelpWrapper}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            style={{
                                transition: 'all 2s',
                                opacity: this.state.opacity
                            }}
                            className={classes.topWrapper}
                        >
                            <div className={classes.storeWrapper}>
                                <div className={classes.storeTitle}>Collar & Comb, Luxury Grooming</div>
                                <div className={classes.yelpStars}></div><span>{this.props.yelpNumOfReviews} reviews</span>
                            </div>
                            <div>
                                <img width='50px' alt='Yelp' src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/28332f3b0739/assets/img/logos/logo_desktop_medium_outline.png"/>
                            </div>
                        </Grid>
                        <div>
                            <div><span className={classes.yelpName}>{this.state.currentSlide.title}</span> - {date}</div>
                            <div className={classes.yelpStars}></div>
                            <div className={classes.yelpReview} dangerouslySetInnerHTML={{__html: summary}}/>
                        </div>
                    </div>
                )}
            </Grid>
        )
    }
}

YelpReviews.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(YelpReviews);