import React from 'react';

import { Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import TextInput from '../../forms/TextInput';
import ContainedButtons from '../../forms/Button';

export default function YelpReviews(props) {

    return (
        <Grid container spacing={2} justify='center'>
            <Grid item xs={12}><Typography variant='h4'>Yelp Reviews</Typography></Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    label='Add New Review'
                    color='secondary'
                    name='media'
                    refer={props.yelpRefer}
                    styles={props.classes.mediaInput}
                />
                <ContainedButtons
                    onClick={props.addYelpReview}
                    name='mediaButton'
                    classes={props.classes.button}
                >
                    Add Media
                </ContainedButtons>
            </Grid>
            <Grid item xs={12} md={6}>
                    <List dense={true}>
                        {props.reviews.map((review, index) => {
                            console.log(review);
                            return (
                                <ListItem button key={index} className={props.classes.listItem} data-index={index}>
                                    <ListItemText primary={review}/>
                                    <ListItemSecondaryAction onClick={() => {props.removeYelpReview(index)}}>
                                        <IconButton edge="end" aria-label="delete">
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
        </Grid>
    );
}