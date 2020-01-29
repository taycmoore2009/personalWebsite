import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';

import BinaryTree from '../coding/BinaryTree';
import NewsFeed from '../coding/NewsFeed';

const styles = () => ({
    /* temporary styling to remove later */
    divider: {
        margin: '5px 0',
        background: '#EEE'
    }
});

class Code extends React.Component {

    showSubStep = () => {
        switch (this.props.subStep) {
            case 'tree':
                return <BinaryTree/>;
            case 'news':
                return <NewsFeed/>
            default:
                return (
                    <div>
                        Select a code sample
                    </div>
                )
        }
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