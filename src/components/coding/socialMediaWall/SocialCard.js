import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Card, CardHeader, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Instagram } from '@material-ui/icons';

const styles = () => ({
    card: {
        maxWidth: '90%',
        margin: '10px auto'
    },
    media: {
        height: 190
    },
});

class SocialCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props
        }

        this.startTimer();
    }

    startTimer = () => {
        setTimeout(() => {
            setInterval(() => {
                const newData = this.props.getNewData();
                this.setState(newData);
            }, 20000);
        }, this.props.timeout * 5000);
    }

    render = () => {
        const { classes } = this.props;

        return (
            <Card className={classes.card} style={{border: '1px solid #c49c5e'}} variant='elevation'>
                <CardHeader
                    avatar={(<Instagram/>)}
                    title={`@${this.state.name}`}
                    subheader={`${this.state.minutes} minutes ago`}
                />
                <CardMedia image={`/instaPics/dog${this.state.img}.jpg`} className={classes.media}/>
                <CardContent>
                    <Typography>{this.state.text}</Typography>
                </CardContent>
            </Card>
        )
    }
}

SocialCard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SocialCard);