import React from 'react';
import { PropTypes } from 'prop-types';

import { 
    Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import Flickr from 'flickr-sdk'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        background: '#e3e9ff'
    },
    slideShow: {
        height: 400
    },
    flickrImg: {
        marginTop: 20,
        height: 350,
        width: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
};

class Calendar extends React.Component {
    state = {
        photos: []
    }
    
    componentDidMount = () => {
        const flickr = new Flickr('a8b1cb91cd5325d42f1f7278ed3e0e07');

        flickr.groups.pools.getPhotos({
            group_id: '14734920@N24',
        })
            .then(resp => {return resp.body.photos})
            .then(groupInfo => {
                if (groupInfo.photo && groupInfo.photo.length) {
                    const photos = [];

                    groupInfo.photo.forEach(photo => {
                        photos.push({img: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, title: photo.title});
                    });
                    this.setState({photos});
                }
            });
    }

    render = () => {
        const { classes } = this.props;

        return (
            <Grid container justify="flex-start" className={classes.root}>
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23e3e9ff&amp;ctz=America%2FLos_Angeles&amp;src=dGF5Y21vb3JlMjAwOUBnbWFpbC5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=c3RlcGhhbmllbC5nZXJ0c2NoQGdtYWlsLmNvbQ&amp;src=dGF5Lm1vb3JlQGVtYnVyc2UuY29t&amp;color=%23F6BF26&amp;color=%234285F4&amp;color=%23795548&amp;color=%237986CB&amp;showCalendars=0&amp;showTabs=0&amp;showPrint=0&amp;showDate=0&amp;showNav=0&amp;showTitle=0&amp;showTz=0"
                            style={{border: '0'}}
                            width="650"
                            height="600"
                            frameBorder="0"
                            scrolling="no"
                            title="Month Calendar"
                        ></iframe>
                    </Grid>
                </Grid>
                <Grid item container xs={6}>
                    <Grid item xs={12} className={classes.slideShow}>
                    <div className="slide-container">
                        <Fade
                            indicators={false}
                            arrows={false}
                        >
                            {this.state.photos.map(photo => {
                                return (
                                <div key={photo.title} className="each-fade">
                                    <div className="image-container">
                                        <div className={classes.flickrImg} style={{backgroundImage: `url(${photo.img})`}} alt={photo.title}></div>
                                    </div>
                                    <h2>{photo.title.indexOf('IMG') === -1 && photo.title.indexOf('PXL') === -1 ? photo.title : ''}</h2>
                                </div>
                                )
                            })}
                        </Fade>
                    </div>
                    </Grid>
                    <Grid item xs={12}>
                        <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23e3e9ff&amp;ctz=America%2FLos_Angeles&amp;src=dGF5Y21vb3JlMjAwOUBnbWFpbC5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=c3RlcGhhbmllbC5nZXJ0c2NoQGdtYWlsLmNvbQ&amp;src=dGF5Lm1vb3JlQGVtYnVyc2UuY29t&amp;color=%23F6BF26&amp;color=%234285F4&amp;color=%23795548&amp;color=%237986CB&amp;showCalendars=0&amp;showTabs=0&amp;showPrint=0&amp;showDate=0&amp;showNav=0&amp;showTitle=0&amp;showTz=0&amp;mode=AGENDA"
                            style={{borderWidth:0}}
                            width="650"
                            height="200"
                            frameBorder="0"
                            scrolling="no"
                            title="Agenda"
                        ></iframe>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Calendar);