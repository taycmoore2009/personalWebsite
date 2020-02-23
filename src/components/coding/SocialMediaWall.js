import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';

const styles = () => ({
    wrapper: {
        padding: '20px 0'
    },
    card: {
        maxWidth: 345,
        margin: '20px auto'
    },
    media: {
        height: 190
    }
});

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
    headerTexta: 'a',
    transitionTime: 5,
    media: [
        {
            src: '<iframe title="vimeo-player" src="https://player.vimeo.com/video/357849250" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
            time: '93'
        }
    ]
}

class SocialMediaWall extends React.Component {

    render = () => {
        const { classes } = this.props;

        return (
            <Grid item xs={12} className={classes.wrapper}>
                Coming Soon!
            </Grid>
        )
    }
}


SocialMediaWall.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SocialMediaWall);