import React from 'react';

import { Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import TextInput from '../../forms/TextInput';
import ContainedButtons from '../../forms/Button';

export default function YelpReviews(props) {
    let yelpName = '';
    let yelpDate = '';
    let yelpReview = '';

    const addYelpReview = () => {
        props.addYelpReview({title: yelpName, value: `${yelpDate}{summary}${yelpReview}`})
    }

    return (
        <Grid container spacing={2} justify='center'>
            <Grid item xs={12}><Typography variant='h4'>Yelp Reviews</Typography></Grid>
            <Grid item xs={12}>
                <TextInput
                    label='Number of reviews'
                    color='secondary'
                    name='media'
                    styles={props.classes.mediaInput}
                    value={props.numOfReviews}
                    onChange={(event) => {props.setNumOfReviews(event.currentTarget.value);}}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    label='Name of reviewer'
                    color='secondary'
                    name='media'
                    styles={props.classes.mediaInput}
                    onChange={(event) => {yelpName = event.currentTarget.value;}}
                />
                <TextInput
                    label='Date of review'
                    color='secondary'
                    name='media'
                    styles={props.classes.mediaInput}
                    onChange={(event) => {yelpDate = event.currentTarget.value;}}
                />
                <TextInput
                    label='Add Review'
                    color='secondary'
                    name='media'
                    styles={props.classes.mediaInput}
                    onChange={(event) => {yelpReview = event.currentTarget.value;}}
                />
                <ContainedButtons
                    onClick={addYelpReview}
                    name='mediaButton'
                    classes={props.classes.button}
                >
                    Add Media
                </ContainedButtons>
            </Grid>
            <Grid item xs={12} md={6}>
                    <List dense={true}>
                        {props.reviews.map((review, index) => {
                            return (
                                <ListItem button key={index} className={props.classes.listItem} data-index={index}>
                                    <ListItemText primary={review.title}/>
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