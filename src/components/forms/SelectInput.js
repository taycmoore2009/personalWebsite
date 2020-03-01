import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const styles = () => ({
    label: {
        color: '#FFF !important'
    },
    formControl: {
        margin: '10px 0',
        width: '100%'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        color: '#FFF',
        minWidth: 200,
        '& label': {
            color: '#FFF'
        },
        '& label.Mui-focused': {
            color: '#FFF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFF',
        },
        '& fieldset': {
            borderColor: '#FFF !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF',
        },
        '& .MuiInputBase-input': {
            color: '#FFF'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            textAlign: 'left',
            '& span': {
                fontSize: '16px'
            }
        },
        '& .MuiFormHelperText-root': {
            color: '#FFF'
        }
    },
});

class SelectInput extends React.Component {

    render() {
        return (
            <FormControl variant="outlined" className={this.props.classes.formControl}>
                {this.props.labelId && <InputLabel id='transitionType' className={this.props.classes.label}>{this.props.labelText}</InputLabel> }
                <Select
                    className={`${this.props.styles} ${this.props.classes.root}`}
                    label={this.props.label}
                    variant="outlined"
                    inputRef={this.props.refer}
                    onChange={this.props.onChange}
                    color={this.props.color}
                    name={this.props.name}
                    value={this.props.value}
                    labelId={this.props.labelId}
                >
                    {this.props.children}
                </Select>
            </FormControl>
        )
    }
}

SelectInput.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SelectInput);