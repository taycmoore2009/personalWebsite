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

class Pets extends React.Component {
    render = () => {
        const { classes, refer } = this.props;

        return (
            <Grid container ref={refer}>
                <Grid item md={12} className={classes.stretch}>
                    Pet Info Here
                </Grid>
            </Grid>
        );
    }
}

Pets.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pets);