import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

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
        const { classes, img, text } = this.props;
        const imgURL = `${img}`;

        return (
            <Card 
                className={classes.card}
                style={{
                    border: `1px solid ${this.props.customStyles.borColor || '#FFF'}`,
                    backgroundColor: this.props.customStyles.bgColor || '#000',
                    color: this.props.customStyles.color || '#000'
                }} 
                variant='elevation'
                key={this.props.key}
            >
                <img src={imgURL} title='Instagram Card' alt='Instagram Card' className={classes.media}/>
                <CardContent
                    style={{padding: '0 5px'}}
                >
                    <Typography>{text}</Typography>
                </CardContent>
            </Card>
        )
    }
}