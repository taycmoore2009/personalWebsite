import React from 'react';

import { Card, CardHeader } from '@material-ui/core';

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
        const { classes, name, img } = this.props;
        const imgURL = `${img}`;

        return (
            <Card 
                className={classes.card}
                style={{
                    border: `1px solid ${this.props.customStyles.borColor || '#c49c5e'}`,
                    backgroundColor: this.props.customStyles.bgColor || '#000',
                    color: this.props.customStyles.color || '#000',
                    width: '100%'
                }} 
                variant='elevation'
                key={this.props.key}
            >
                <CardHeader
                    title={name}
                />
                <img src={imgURL} title='Instagram Card' alt='Instagram Card' className={classes.media}/>
            </Card>
        )
    }
}