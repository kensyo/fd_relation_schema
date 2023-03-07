import React, { Fragment } from 'react';
import { TextField } from '@mui/material';

const Name = (props) => {
  return (
    <Fragment>
      <TextField
        value={props.nameInput}
        onChange={(event) => props.dispatch({ type: "name_change", value: event.target.value })}
        fullWidth
        size="small"
        InputLabelProps={{ shrink: true }}
        label="Name"
        placeholder="あとで変更する"
      />
    </Fragment>
  );
}

export default Name
