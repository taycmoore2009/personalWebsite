import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';

import TextInput from '../../forms/TextInput';
import SelectInput from '../../forms/SelectInput';
import ContainedButtons from '../../forms/Button';

export default function General(props) {
    return (
        <Grid container spacing={2} justify='center'>
            <Grid item xs={12}><Typography variant='h4'>General Settings</Typography></Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextInput
                            label='Display Screen Name'
                            onChange={props.handleInputChange}
                            color='secondary'
                            name='code'
                            value={props.state.code}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ContainedButtons
                            onClick={props.validate}
                            name='code'
                            classes={props.classes.button}
                        >
                            Validate
                        </ContainedButtons>
                        <ContainedButtons
                            classes={props.classes.button}
                            onClick={props.generateWall}
                        >Save Wall</ContainedButtons>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextInput
                            label='Display Screen Key'
                            onChange={props.handleInputChange}
                            color='secondary'
                            name='secretKey'
                            value={props.state.secretKey}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ContainedButtons
                            onClick={props.generatekey}
                            name='code'
                            classes={props.classes.button}
                        >
                            Randomly Generate
                        </ContainedButtons>
                        <ContainedButtons
                            onClick={props.loadSettings}
                            name='code'
                            classes={props.classes.button}
                        >
                            Load
                        </ContainedButtons>
                    </Grid>
                </Grid>
            </Grid>
            {[{
                label: 'Slide Delay',
                value: 'transitionTime'
            },{
                label: 'Header Text',
                value: 'headerText'
            }].map((inputVals) => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={inputVals.value}>
                        <TextInput
                            label={inputVals.label}
                            onChange={props.handleInputChange}
                            color='secondary'
                            name={inputVals.value}
                            value={props.state[inputVals.value]}
                        />
                    </Grid>
                );
            })}
            <Grid item xs={12} sm={6} md={4}>
                <SelectInput
                    value={props.state.transitionType}
                    onChange={props.handleInputChange}
                    name='transitionType'
                    label='Transition Type'
                    variant='outlined'
                    color='secondary'
                    labelId='transitionType'
                    labelText='Card Transition Type'
                >
                    <option value='fade'>Fade</option>
                    <option value='scroll'>Scroll</option>
                </SelectInput>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <SelectInput
                            value={props.state.layout}
                            onChange={props.handleInputChange}
                            name='layout'
                            label='Grid Layout'
                            variant='outlined'
                            color='secondary'
                            labelId='layout'
                            labelText='Grid Layout'
                        >
                            <option value='socialCards'>Only Social Cards</option>
                            <option value='mediaBox'>Only Media Box</option>
                            <option value='leftMedia'>Left Side Media Box</option>
                            <option value='centerMedia'>Center Media Box</option>
                            <option value='rightMedia'>Right Side Media Box</option>
                        </SelectInput>
                        <SelectInput
                            value={props.state.spacing}
                            onChange={props.handleInputChange}
                            name='spacing'
                            label='Grid Spacing'
                            variant='outlined'
                            color='secondary'
                            labelId='spacing'
                            labelText='Grid Spacing'
                        >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </SelectInput>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{
                            backgroundColor: props.state.styles.background.color,
                            backgroundImage: `url(${props.state.styles.background.img})`,
                            backgroundSize: props.state.styles.background.size,
                            backgroundPosition: 'center'
                        }}>
                            {props.state.headerText && (
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography
                                            align={props.state.styles.header.textAlign || 'left'}
                                            style={{color: props.state.styles.header.color, fontSize: props.state.styles.header.size}}
                                        >{props.state.headerText}</Typography>
                                    </Grid>
                                </Grid>
                            )}
                            <Grid container alignItems='center' justify='space-around' style={{height: 300}}>
                                {props.state.layout === 'mediaBox' ? (
                                    <Grid item xs={12} style={{height: '95%'}}>
                                        <Paper variant='outlined' style={{height: '100%', width: `${100 - (3 * (props.state.spacing-1))}%`, margin: '0 auto'}}/>
                                    </Grid>
                                ) : ['leftMedia', 'centerMedia', 'rightMedia'].map((media, index) => {
                                    return props.state.layout === media ? (
                                            <Grid key={index} item xs={6} style={{height: '95%'}}>
                                                <Paper variant='outlined' style={{height: '100%', width: `${100 - (3 * (props.state.spacing-1))}%`, margin: '0 auto'}}/>
                                            </Grid>
                                        ) : (
                                            <Grid key={index} item xs={3} style={{height: '100%'}}>
                                                <Grid container direction='column' justify='space-around' style={{height: '100%', width: `${100 - (3 * (props.state.spacing-1))}%`, margin: '0 auto'}}>
                                                    <Paper variant='outlined' style={{
                                                        height: '28%',
                                                        backgroundColor: props.state.styles.card.bgColor,
                                                        borderColor: props.state.styles.card.borColor
                                                    }}/>
                                                    <Paper variant='outlined' style={{
                                                        height: '28%',
                                                        backgroundColor: props.state.styles.card.bgColor,
                                                        borderColor: props.state.styles.card.borColor
                                                    }}/>
                                                    <Paper variant='outlined' style={{
                                                        height: '28%',
                                                        backgroundColor: props.state.styles.card.bgColor,
                                                        borderColor: props.state.styles.card.borColor
                                                    }}/>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                                {props.state.layout === 'socialCards' && (
                                    <Grid item xs={3} style={{height: '100%'}}>
                                        <Grid container direction='column' justify='space-around' style={{height: '100%', width: `${100 - (3 * (props.state.spacing-1))}%`, margin: '0 auto'}}>
                                            <Paper variant='outlined'elevation={3}  style={{
                                                        height: '28%',
                                                        backgroundColor: props.state.styles.card.bgColor,
                                                        borderColor: props.state.styles.card.borColor
                                                    }}/>
                                            <Paper variant='outlined'elevation={3}  style={{
                                                        height: '28%',
                                                        backgroundColor: props.state.styles.card.bgColor,
                                                        borderColor: props.state.styles.card.borColor
                                                    }}/>
                                            <Paper variant='outlined'elevation={3}  style={{
                                                        height: '28%',
                                                        backgroundColor: props.state.styles.card.bgColor,
                                                        borderColor: props.state.styles.card.borColor
                                                    }}/>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}