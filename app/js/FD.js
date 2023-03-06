import React from "react";
import Select from "react-select";

import { Grid, Button } from '@mui/material'

export default (props) => {
  const fds = props.fds
  const index = props.index
  const dispatch = props.dispatch

  const setFDs = (newFDs) => {
    dispatch({ type: "fds_change", value: newFDs })
  }

  const handleLeftChange = (event) => {
    const newFDs = [...fds]
    newFDs[index][0] = event
    setFDs(newFDs)
  }

  const handleRightChange = (event) => {
    const newFDs = [...fds]
    newFDs[index][1] = event
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
        <Select
          isMulti
          className="lhs"
          value={props.leftValue}
          onChange={handleLeftChange}
          options={props.options}
        />
      </Grid>
      <Grid item xs={0}>
        ➞
      </Grid>
      <Grid item xs={5}>
        <Select
          isMulti
          className="rhs"
          value={props.rightValue}
          onChange={handleRightChange}
          options={props.options}
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
