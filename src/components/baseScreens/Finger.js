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
                <Grid item container md={12}>
                    <Grid item sm={12}>
                        <h2>Quick Background</h2>
                        <p>I grew up and attended college in Maryland. At a young age I developed a love of traveling and new experiences. This was fostered by my parents taking me camping every chance they had. I never grew up with money, but that didn't stop me from seeing as much as possible. In college, I worked for an event boutique. This helped me to fuel my love of travel by sending me to events around the world. Some notable events were the Nike football combine and under armour marathons. This also exposed me to my current work, websites. I started building website for OzTech Media in 2012, and I've never stopped. My expertise eventually lead me to Texas to work for Kibo. I made a ton of friends while there that I still keep in contact with. I also adopted the two most important things in my life, Roxie and Apollo. At some points Chrome River reached out to me and offered me a job in Los Angeles. I accepted and now I'm here. I spend my weekdays working, walking, and play video games with my friends. On the weekend I feed my curiosity by exploring as much as possible.</p>
                    </Grid>
                    <Grid item sm={12}>
                        <h2>Friends List</h2>
                    </Grid>
                    <Grid item sm={3}>
                        <h3>Maryland</h3>
                        <ul>
                            <li>Scott</li>
                            <li>Justin</li>
                            <li>Maddie</li>
                            <li>Annika</li>
                            <li>Andrew</li>
                            <li>Tim</li>
                        </ul>
                    </Grid>
                    <Grid item sm={3}>
                        <h3>Texas</h3>
                        <ul>
                            <li>Chris</li>
                            <li>Ben</li>
                            <li>Evelyn</li>
                            <li>Jim</li>
                            <li>Brandtley</li>
                            <li>Jason</li>
                        </ul>
                    </Grid>
                    <Grid item sm={3}>
                        <h3>Los Angeles</h3>
                        <ul>
                            <li>Paul</li>
                            <li>Joel</li>
                            <li>Shiloh</li>
                            <li>Cyn</li>
                        </ul>
                    </Grid>
                    <Grid item sm={3}>
                        <h3>Online</h3>
                        <ul>
                            <li>JAD</li>
                            <li>EverMello</li>
                            <li>PinkMochii</li>
                            <li>Raider</li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Finger.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Finger);