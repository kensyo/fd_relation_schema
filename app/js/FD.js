import { Grid, Button, TextField, Autocomplete, Chip } from "@mui/material";
import React from "react";

export default (props) => {
  const fds = props.fds
  const index = props.index
  const dispatch = props.dispatch
  const options = props.options

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

  return (
    <React.Fragment>
      <Grid item xs={5}>
        <Autocomplete
          multiple
          filterSelectedOptions
          value={props.leftValue}
          onChange={handleLeftChange}
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
              label="LHS of FD"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={0}>
        ➞
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          multiple
          filterSelectedOptions
          value={props.rightValue}
          onChange={handleRightChange}
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
              label="RHS of FD"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined" color="error" onClick={handleClick}>
          Remove
        </Button>
      </Grid>
    </React.Fragment>
  )
}


// +import React from "react";
//  import Select from "react-select";
// +import { Grid, Button } from '@mui/material'
// +export default (props) => {
// +  const fds = props.fds
// +  const index = props.index
// +  const dispatch = props.dispatch
// +  const setFDs = (newFDs) => {
// +    dispatch({ type: "fds_change", value: newFDs })
// +  }
// +  const handleLeftChange = (event) => {
// +    const newFDs = [...fds]
// +    newFDs[index][0] = event
// +    setFDs(newFDs)
// +  }
// +
// +  const handleRightChange = (event) => {
// +    const newFDs = [...fds]
// +    newFDs[index][1] = event
// +    setFDs(newFDs)
//    }
// +  const handleClick = () => {
// +    const newFDs = [...fds]
// +    newFDs.splice(index, 1)
// +    setFDs(newFDs)
// +  }
// +
// +  return (
// +    <React.Fragment>
// +      <Grid item xs={5}>
// +        <Select
// +          isMulti
// +          className="lhs"
// +          value={props.leftValue}
// +          onChange={handleLeftChange}
// +          options={props.options}
// +        />
// +      </Grid>
// +      <Grid item xs={0}>
// +        ➞
// +      </Grid>
// +      <Grid item xs={5}>
// +        <Select
// +          isMulti
// +          className="rhs"
// +          value={props.rightValue}
// +          onChange={handleRightChange}
// +          options={props.options}
// +        />
// +      </Grid>
// +      <Grid item xs={0}>
// +        <Button variant="outlined" color="error" onClick={handleClick}>
// +          Remove
// +        </Button>
// +      </Grid>
// +    </React.Fragment>
// +  )
// +}

