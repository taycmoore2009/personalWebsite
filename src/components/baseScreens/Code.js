import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';

import BinaryTree from '../coding/BinaryTree';
import NewsFeed from '../coding/NewsFeed';
import SocialMediaWall from '../coding/SocialMediaWall'
import SocialWallAuth from '../coding/socialMediaAdmin/auth'
import VideoCapture from '../coding/VideoCapture'
import { BrowserRouter as Route, Switch } from 'react-router-dom';

const styles = () => ({
    /* temporary styling to remove later */
    divider: {
        margin: '5px 0',
        background: '#EEE'
    }
});

class Code extends React.Component {

    showSubStep = () => {
        return (
            <Switch>
                <Route path='/code/tree'>
                    <BinaryTree/>
                </Route>
                <Route path='/code/news'>
                    <NewsFeed/>
                </Route>
                <Route path='/code/socialwall/auth'>
                    <SocialWallAuth/>
                </Route>
                <Route path='/code/socialwall'>
                    <SocialMediaWall/>
                </Route>
                <Route path='/code/videocapture'>
                    <VideoCapture/>
                </Route>
                <Route path='/code'>
                    Code
                </Route>
            </Switch>
        );
    }

    render = () => {
        const { refer } = this.props;
        const CurrentCode = this.showSubStep

        return (
            <Grid container ref={refer}>
                <CurrentCode/>
            </Grid>
        );
    }
}

Code.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Code);