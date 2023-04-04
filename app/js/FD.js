import React from 'react'
import {
  Box,
  Grid,
  TextField,
  Autocomplete,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default (props) => {
  const fds = props.fds
  const index = props.index
  const dispatch = props.dispatch
  const options = props.options
  const placeholders = props.placeholders

  const indexPlus1 = index + 1

  const setFDs = (newFDs) => {
    dispatch({ type: 'fds_change', value: newFDs })
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

  const renderAutocomplete = (
    whichValue,
    whichSide,
    whichHandleChange,
    placeholder
  ) => {
    return (
      <Autocomplete
        multiple
        filterSelectedOptions
        isOptionEqualToValue={(option, value) => {
          if (option.label === value.label && option.value === value.value) {
            return true
          } else {
            return false
          }
        }}
        value={whichValue}
        onChange={whichHandleChange}
        options={options}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              color="primary"
              variant="outlined"
              label={option.label}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={`${whichSide} of FD${indexPlus1}`}
            size="small"
            InputLabelProps={{ shrink: true }}
            placeholder={index === 0 ? placeholder : ''}
          />
        )}
      />
    )
  }

  return (
    <Box>
      <Grid container spacing={1} alignItems="Center">
        <Grid item xs="auto">
          {`${indexPlus1}. `}
        </Grid>
        <Grid item xs>
          {renderAutocomplete(
            props.leftValue,
            'LHS',
            handleLeftChange,
            placeholders[0]
          )}
        </Grid>
        <Grid item xs="auto">
          ➞
        </Grid>
        <Grid item xs>
          {renderAutocomplete(
            props.rightValue,
            'RHS',
            handleRightChange,
            placeholders[1]
          )}
        </Grid>
        <Grid item xs="auto">
          <Tooltip title="Remove the FD">
            <IconButton onClick={handleClick}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  )
}
