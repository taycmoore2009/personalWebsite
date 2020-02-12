import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import SocialCard from './SocialCard';

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
}

const styles = () => ({
    bg: configJson.styles.background,
    wrapper: {
        padding: '20px 0'
    },
    header: configJson.styles.header,
    card: configJson.card,
    prices: {
        maxWidth: 'calc(100% - 20px)',
        margin: '10px',
        maxHeight: 'calc(100% - 20px)'
    },
    media: {
        height: 190
    },
    pricesMedia: {
        height: '100%'
    }
});

class Mockup extends React.Component {

    constructor(props) {
        super(props);

        this.counter = 0;
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
        const Card1 = this.getCard;
        const Card2 = this.getCard;
        const Card3 = this.getCard;
        const Card4 = this.getCard;

        return (
            <Grid container ref={refer} className={classes.bg}>
                { configJson.headerText && configJson.headerText !== '' && 
                <Grid item md={12}>
                    <Typography variant='h1' className={classes.header}>Collar and Comb</Typography>
                </Grid>
                }
                <Grid item md={6}>
                    <iframe title='dogs' className={classes.prices} src="https://player.vimeo.com/video/189789787?title=0&byline=0&portrait=0&autoplay=1&loop=1&autopause=0" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </Grid>
                <Grid item md={3}>
                    <Card1/><Card2/>
                </Grid>
                <Grid item md={3}>
                    <Card3/><Card4/>
                </Grid>
            </Grid>
        );
    }
}

Mockup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Mockup);