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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.img !== prevProps.img) {
            this.checkImgHeight();
            this.setState({isLoaded: false});
        }
    }

    checkImgHeight() {
        const imgDom = new Image();
        const imgURL = `${this.props.img}`;

        imgDom.addEventListener('load', (event) => {
            const {
                naturalHeight,
                naturalWidth
            } = event.currentTarget
            const ratio = naturalHeight/naturalWidth;

            setTimeout(() => {
                if(ratio >= 1) {
                    this.setState({
                        isLoaded: true,
                        height: 300,
                        width: 300/ratio
                    });
                } else {
                    this.setState({
                        isLoaded: true,
                    });
                }
            }, 500);
        });

        imgDom.src = imgURL
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
                    color: this.props.customStyles.color || '#000',
                    opacity: this.state.isLoaded ? 1 : 0
                }} 
                variant='elevation'
            >
                <CardHeader
                    avatar={(<Instagram/>)}
                    title={`@${name}`}
                    subheader={`${minutes} minutes ago`}
                />
                {this.state.isLoaded ? (
                    <CardMedia
                        className={classes.mediaContainer}
                        image={imgURL}
                        title='instaDog'
                        style={{height: this.state.height, width: this.state.width}}
                    />
                ) : (
                    <Skeleton animation="wave" variant="rect" className={classes.mediaContainer} />
                )}
                <CardContent>
                    <Typography>{text}</Typography>
                </CardContent>
            </Card>
        )
    }
}