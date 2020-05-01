import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Close, Instagram } from '@material-ui/icons';

import TextInput from '../../forms/TextInput';
import ContainedButtons from '../../forms/Button';

export default function CustomMedia(props) {

    return (
        <Grid container spacing={2} justify='flex-start'>
            <Grid item xs={12}><Typography variant='h4'>Social Media Feeds</Typography></Grid>
            <Grid item xs={12}><Typography variant='h5'><Instagram/> Instagram</Typography></Grid>
            <Grid item xs={12} sm={6} lg={5} xl={2}>
                <TextInput
                    refer={props.newInstaTagsRefer}
                    label='Instagram Tags'
                    color='secondary'
                    name='instaTags'
                    styles={props.classes.newMediaInput}
                />
                <ContainedButtons
                    onClick={props.addNewInstaTag}
                    name='newInstaTagsButton'
                    classes={props.classes.button}
                >
                    Add tag
                </ContainedButtons>
            </Grid>
            <Grid item xs={12} sm={6} lg={7} xl={10}>
                <Grid item xs={12}><Typography variant='subtitle1'>Current Tags</Typography></Grid>
                {props.state.instaTags.map((instaTag, index) => {
                    return <Button 
                            size='small' 
                            className={props.classes.tag}
                            onClick={() => {props.removeInstaTag(index)}}
                            key={index}
                        >
                            #{instaTag}
                            <Close className={props.classes.tagClose}/>
                        </Button>
                })}
            </Grid>
            <Grid item xs={12}>
                <ContainedButtons
                    onClick={props.addInstaAccount}
                    classes={props.classes.button}
                >
                    Add your account!
                </ContainedButtons>
                <Typography variant="button" className={props.classes.instaAccount}>Connected Account: {props.state.instaAccount || 'No Account'}</Typography>
            </Grid>
        </Grid>
    );
}