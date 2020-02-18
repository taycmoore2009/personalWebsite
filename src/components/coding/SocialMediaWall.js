import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

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


class SocialMediaWall extends React.Component {

    generateCard = () => {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={(<Skeleton animation="wave" variant="circle"/>)}
                    title={(<Skeleton animation="wave" height={12} width="80%"/>)}
                    subheader={(<Skeleton animation="wave" height={10} width="40%"/>)}
                />
                <Skeleton animation="wave" variant="rect" className={classes.media}/>
                <CardContent>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
            </Card>
        )
    }

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