import React from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Flickr from 'flickr-sdk'

const styles = () => ({
    flickrImgContainer: {
        width: '20%',
        height: '200px',
        cursor: 'pointer',
        backgroundPosition: 'center'
    },
});

class Finger extends React.Component {
    state = {
        photos: []
    }
    
    componentDidMount = () => {

        const flickr = new Flickr('a8b1cb91cd5325d42f1f7278ed3e0e07');

        /** Load flicker api */
        flickr.groups.pools.getPhotos({
            group_id: '14734920@N24',
            page_size: 400
        })
        .then(resp => {return resp.body.photos})
        .then(groupInfo => {
            if (groupInfo.photo && groupInfo.photo.length) {
                const photos = [];

                groupInfo.photo.forEach(photo => {
                    photos.push({img: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, id: photo.id, title: photo.title});
                });
                this.setState({photos});
            }
        });
    }

    adjustImage = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = _.clamp((event.clientX - rect.left) * 2, 0, rect.width);
        const y = _.clamp((event.clientY - rect.top) * 2, 0, rect.top);
        event.currentTarget.style.backgroundPosition = `-${x}px -${y}px`
    }

    resetPhoto = (photoId, event) => {
        if (this.state.currentPhoto === photoId) {
            this.setState({currentPhoto: ''});
        }
        event.currentTarget.style.backgroundPosition = `center`
    }

    render = () => {
        const { refer } = this.props;

        return (
            <Grid container>
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <h2>Quick Background</h2>
                        <p>I grew up and attended college in Maryland. At a young age I developed a love of traveling and new experiences. This was fostered by my parents taking me camping every chance they had. I never grew up with money, but that didn't stop me from seeing as much as possible. In college, I worked for an event boutique. This helped me to fuel my love of travel by sending me to events around the world. Some notable events were the Nike football combine and under armour marathons. This also exposed me to my current work, websites. I started building website for OzTech Media in 2012, and I've never stopped. My expertise eventually lead me to Texas to work for Kibo. I made a ton of friends while there that I still keep in contact with. I also adopted the two most important things in my life, Roxie and Apollo. At some points Chrome River reached out to me and offered me a job in Los Angeles. I accepted and now I'm here. I spend my weekdays working, walking, and play video games with my friends. On the weekend I feed my curiosity by exploring as much as possible.</p>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={12}>
                            <h2>Photo Gallery</h2>
                        </Grid>
                        {photos.map(photo => {
                            return (
                                <div
                                    key={photo.id}
                                    className={classes.flickrImgContainer}
                                    onMouseEnter={() => {this.setState({currentPhoto: photo.id})}}
                                    onMouseMove={(event) => this.adjustImage(event)}
                                    onMouseLeave={(event) => this.resetPhoto(photo.id, event)}
                                    onClick={this.onPhotoClick}
                                    style={{backgroundImage: `url(${photo.img})`}}
                                ></div>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Finger);