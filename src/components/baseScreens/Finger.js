import React from 'react';

import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';

const styles = () => ({
    /* temporary styling to remove later */
    stretch: {
      height: '10000px'
    }
});

class Finger extends React.Component {
    render = () => {
        const { classes, refer } = this.props;

        return (
            <Grid container ref={refer}>
                <Grid item md={12} className={classes.stretch}>
                    I love hiking, dogs, tourturing my friends St.John, Toaster, and Joe, and long walks on the beach.
                </Grid>
            </Grid>
        );
    }
}

Finger.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Finger);