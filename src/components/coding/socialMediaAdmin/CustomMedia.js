import React from 'react';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import TextInput from '../../forms/TextInput';
import ContainedButtons from '../../forms/Button';

export default function CustomMedia(props) {

    return (
        <Grid container spacing={2} justify='flex-start'>
            <Grid item xs={12}><Typography variant='h4'>Manage Custom Media</Typography></Grid>
            <Grid item xs={12}>
                <TextInput
                    refer={props.newMediaTitleRefer}
                    label='Media Title'
                    color='secondary'
                    name='newMedia'
                    styles={props.classes.newMediaInput}
                />
                <TextInput
                    refer={props.newMediaLinkRefer}
                    label='Add New Media Link'
                    color='secondary'
                    name='newMedia'
                    styles={props.classes.newMediaInput}
                />
                <TextInput
                    refer={props.newMediaLengthRefer}
                    label='Media length'
                    color='secondary'
                    name='newMedia'
                    styles={props.classes.newMediaInput}
                />
                <ContainedButtons
                    onClick={props.addNewMedia}
                    name='newMediaButton'
                    classes={props.classes.button}
                >
                    Add Media
                </ContainedButtons>
            </Grid>
            <Grid item xs={6} md={8}>
                <List dense={true}>
                    {props.state.media.map((media, index) => {
                        return (
                            <ListItem button key={index} className={props.classes.listItem}  data-index={index}>
                                <ListItemIcon>
                                    {index !== 0 && <KeyboardArrowUp onClick={props.moveMediaUp}/>}
                                    {index !== props.state.media.length -1 && <KeyboardArrowDown onClick={props.moveMediaDown}/>}
                                </ListItemIcon>
                                <ListItemText onClick={props.showMedia} data-media={media.link} primary={media.title} />
                                <ListItemSecondaryAction onClick={props.deleteMedia}>
                                    <IconButton edge="end" aria-label="delete">
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
            <Grid item xs={6} md={4}>
                {props.state.mediaDisplay && (
                    <img src={props.state.mediaDisplay} alt='currentMedia' className={props.classes.mediaImg}/>
                )}
            </Grid>
        </Grid>
    );
}