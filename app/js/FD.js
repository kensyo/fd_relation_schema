import { Grid, Button, TextField, Autocomplete, Chip } from "@mui/material";
import React from "react";

export default (props) => {
  const fds = props.fds
  const index = props.index
  const dispatch = props.dispatch
  const options = props.options

  const indexPlus1 = index + 1

  const setFDs = (newFDs) => {
    dispatch({ type: "fds_change", value: newFDs })
  }

  const handleLeftChange = (event, value, reason) => {
    const newFDs = [...fds]
    newFDs[index][0] = value
    setFDs(newFDs)
  }

  const handleRightChange = (event, value, reason) => {
    const newFDs = [...fds]
    newFDs[index][1] = value
    setFDs(newFDs)
  }

  const handleClick = () => {
    const newFDs = [...fds]
    newFDs.splice(index, 1)
    setFDs(newFDs)
  }

  const renderAutocomplete = (whichValue, whichSide, whichHandleChange) => {
    return (
      <Autocomplete
        multiple
        filterSelectedOptions
        value={whichValue}
        onChange={whichHandleChange}
        options={options}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              color="secondary"
              variant="outlined"
              label={option.label}
              size="small"
              {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={`${whichSide} of FD${indexPlus1}`}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    )
  }

  return (
    <React.Fragment>
      <Grid item xs={0}>
        {`${indexPlus1}. `}
      </Grid>
      <Grid item xs={5}>
        {renderAutocomplete(props.leftValue, "LHS", handleLeftChange)}
      </Grid>
      <Grid item xs={0}>
        ➞
      </Grid>
      <Grid item xs={5}>
        {renderAutocomplete(props.rightValue, "RHS", handleRightChange)}
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined" color="error" onClick={handleClick}>
          Remove
        </Button>
      </Grid>
    </React.Fragment>
  )
}
