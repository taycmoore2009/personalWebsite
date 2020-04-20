import React from 'react';
import { Grid, Typography} from '@material-ui/core';

import TextInput from '../../forms/TextInput';
import SelectInput from '../../forms/SelectInput';
import ContainedButtons from '../../forms/Button';

export default function General(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}><Typography variant='h4'>Custom Styling</Typography></Grid>
            <Grid item xs={12}><Typography variant='h5'>Background</Typography></Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextInput
                    label='Background Color'
                    onClick={props.handleCurrentColorChangeState}
                    color='secondary'
                    name='background.color'
                    value={props.state.styles.background.color}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <SelectInput
                    value={props.state.styles.background.size}
                    onChange={props.handleInputChangeStyle}
                    name='background.size'
                    label='Background Size'
                    variant='outlined'
                    color='secondary'
                    labelId='size'
                    labelText='Background Size'
                >
                    <option value='contain'>Contain</option>
                    <option value='cover'>Cover</option>
                </SelectInput>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ContainedButtons
                        component='label'
                        name='newMediaButton'
                        classes={props.classes.button}
                    >
                    Upload Image
                    <input 
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={props.backgroundImageUpload}
                        type="file"
                        style={{display: 'none'}}
                    />
                </ContainedButtons>
            </Grid>
            <Grid item xs={12}><Typography variant='h5'>Header Title</Typography></Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextInput
                    label='Header Title Color'
                    onClick={props.handleCurrentColorChangeState}
                    color='secondary'
                    name='header.color'
                    value={props.state.styles.header.color}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <SelectInput
                    value={props.state.styles.header.textAlign}
                    onChange={props.handleInputChangeStyle}
                    name='header.textAlign'
                    label='Header text alignment'
                    variant='outlined'
                    color='secondary'
                    labelId='headerTextAlignment'
                    labelText='Header Text Alignment'
                >
                    <option value='left'>Left</option>
                    <option value='center'>Center</option>
                    <option value='right'>Right</option>
                </SelectInput>
            </Grid>
            <Grid item xs={12}><Typography variant='h5'>Cards</Typography></Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextInput
                    label='Background Color'
                    onClick={props.handleCurrentColorChangeState}
                    color='secondary'
                    name='card.bgColor'
                    value={props.state.styles.card.bgColor}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextInput
                    label='Border Color'
                    onClick={props.handleCurrentColorChangeState}
                    color='secondary'
                    name='card.borColor'
                    value={props.state.styles.card.borColor}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextInput
                    label='Text Color'
                    onClick={props.handleCurrentColorChangeState}
                    color='secondary'
                    name='card.color'
                    value={props.state.styles.card.color}
                />
            </Grid>
        </Grid>
    );
}