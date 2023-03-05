import React, { Fragment, memo, useReducer } from 'react';
import { Box, InputLabel, TextField } from '@mui/material';

const Name = (props) => {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 2 }}>
        <InputLabel>Name</InputLabel>
        <TextField
          value={props.nameInput}
          onChange={(event) => props.dispatch({ type: "name_input", value: event.target.value })}
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </Fragment>
  );
}

export default Name
