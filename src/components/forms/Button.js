import React from 'react';
import Button from '@material-ui/core/Button';
  
export default function ContainedButtons(props) {

  return (
      <Button
          variant="contained"
          className={props.classes}
          onClick={props.onClick}
      >{props.label}</Button>
  );
}