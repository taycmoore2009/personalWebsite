import React from 'react';

import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Instagram } from '@material-ui/icons';

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
        const imgURL = `${img}`;

        return (
            <Card 
                className={classes.card}
                style={{
                    border: `1px solid ${this.props.customStyles.borColor || '#c49c5e'}`,
                    backgroundColor: this.props.customStyles.bgColor || '#000',
                    color: this.props.customStyles.color || '#000'
                }} 
                variant='elevation'
                key={this.props.key}
            >
                <CardHeader
                    avatar={(<Instagram/>)}
                    title={`@${name}`}
                    subheader={`${minutes} minutes ago`}
                />
                <img src={imgURL} title='Instagram Card' alt='Instagram Card' className={classes.media}/>
                <CardContent>
                    <Typography>{text}</Typography>
                </CardContent>
            </Card>
        )
    }
}