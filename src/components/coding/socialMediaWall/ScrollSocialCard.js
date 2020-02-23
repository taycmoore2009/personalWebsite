import React from 'react';

import { Card, CardHeader, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Instagram } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';

export default class SocialCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            height: 200,
            width: 200
        }
    }

    render() {
        const { classes, name, img, minutes, text } = this.props;
        const imgURL = `/instaPics/dog${img}.jpg`;
        
        return (
            <Card 
                className={classes.card} 
                style={{
                    border: '1px solid #c49c5e'
                }} 
                variant='elevation'
                key={this.props.key}
            >
                <CardHeader
                    avatar={(<Instagram/>)}
                    title={`@${name}`}
                    subheader={`${minutes} minutes ago`}
                />
                <img src={imgURL} title='instaDog' alt='instaDog' className={classes.media}/>
                <CardContent>
                    <Typography>{text}</Typography>
                </CardContent>
            </Card>
        )
    }
}