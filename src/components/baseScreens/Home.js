import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import {  } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(() => ({
    header: {
        fontSize: '36px',
        margin: '50px 0px'
    }
}));

export default function Home(props) {
    const classes = styles();

    return (
        <Grid container ref={props.refer}>
            <Grid item md={12}>
                <Typography
                component='h1'
                align='center'
                gutterBottom
                className={classes.header}
                >Hi, I'm Tay!</Typography>
            </Grid>
            <Grid item md={12}>
                <Typography
                component='p'
                align='center'
                gutterBottom
                >
                    I believe in letting my work talk for me. So here you will find some of my fun creations. I've also included a Bio in case you're curious about my life. It also has a section that specifically breaks down my career life. To get started, select anything from the menu on the left. You're currently on the Home Page
                </Typography>
            </Grid>
        </Grid>
    )
}