import React, { Fragment, useEffect } from 'react';

import { Autocomplete, Chip, TextField } from '@mui/material'

export default (props) => {
  const value = props.value
  const dispatch = props.dispatch

  const setValue = (newValue) => {
    dispatch({ type: "attributes_change", value: newValue })
  }

  return (
    <Fragment>
      <Autocomplete
        multiple
        id="tags-filled"
        options={[]}
        defaultValue={[""]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              size="small"
              style={{ backgroundColor: "red" }}
              variant="outlined" label={option + "+hoge"} {...getTagProps({ index })} />
          ))
        }
        value={value} // maybe not necessary
        onChange={(event, value, reason) => { setValue(value) }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Attributes"
            placeholder="あとで変更する"
            helperText="🍵 Press enter to confirm your input."
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </Fragment>
  );
};

