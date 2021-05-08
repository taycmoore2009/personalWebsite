import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Flickr from 'flickr-sdk' 
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const useStyles = makeStyles((theme) => ({
    img: {
        height: '100vh',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
}));

export default () => {
    const [photos, updatePhotos] = useState([]);
    const classes = useStyles();
    const flickr = new Flickr('a8b1cb91cd5325d42f1f7278ed3e0e07');

    useEffect(() => {
        /** Load flicker api */
        flickr.groups.pools.getPhotos({
            group_id: '14734920@N24',
            page_size: 200
        })
        .then(resp => {return resp.body.photos})
        .then(groupInfo => {
            if (groupInfo.photo && groupInfo.photo.length) {
                updatePhotos(groupInfo.photo.map(photo => {
                    return {img: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, title: photo.title};
                }));
            }
        });
    }, [flickr.groups.pools]);
    
    return (
        <div className="slide-container" style={{height: '100vh'}}>
            <Slide indicators={false}>
                {photos.map(photo => {
                    return (
                        <div key={photo.title} className="each-slide">
                            <div
                                className={classes.img}
                                style={{'backgroundImage': `url(${photo.img})`}}>
                            </div>
                        </div>
                    )
                })}
            </Slide>
        </div>
    )
}