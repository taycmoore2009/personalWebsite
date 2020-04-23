import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const CssButton = withStyles({
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: '15px',
      paddingBottom: '15px',
      margin: '10px 0',
      backgroundColor: '#FFF',
      color: '#000',
      '& label': {
          color: '#FFF'
      },
      '& label.Mui-focused': {
          color: '#FFF',
      },
      '& .MuiInput-underline:after': {
          borderBottomColor: '#FFF',
      },
      '& .MuiButton-label': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
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
              color: '#FFF'
          }
      },
      '& .MuiFormHelperText-root': {
          color: '#FFF'
      }
  },
})(Button);
  
export default function ContainedButtons(props) {

  return (
      <CssButton
          variant={props.variant || 'contained'}
          className={props.classes}
          onClick={props.onClick}
          component={props.component}
      >{props.label}{props.children}</CssButton>
  );
}