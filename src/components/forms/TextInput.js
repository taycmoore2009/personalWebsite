import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '10px 0',
        color: '#FFF',
        '& label': {
            color: '#FFF'
        },
        '& label.Mui-focused': {
            color: '#FFF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFF',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#FFF',
            },
            '&:hover fieldset': {
                borderColor: '#FFF',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FFF',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                textAlign: 'left'
            },
            '& .MuiInputBase-input': {
                color: '#FFF',
                '&:-internal-autofill-selected': {
                    backgroundColor: 'transparent !important'
                }
            }
        },
        '& .MuiFormHelperText-root': {
            color: '#FFF'
        }
    },
})(TextField);

export default function TextInput(props) {

    return (
        <CssTextField
            className={props.styles}
            label={props.label}
            variant="outlined"
            helperText={props.helperText}
            inputRef={props.refer}
            onChange={props.onChange}
            onClick={props.onClick}
            onBlur={props.onBlur}
            color={props.color}
            name={props.name}
            value={props.value}
        />
    )
}