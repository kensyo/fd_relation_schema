import React, { Fragment, useEffect, useState } from 'react'
import { TextField } from '@mui/material'

const Name = (props) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(props.value)
  }, [props.value])

  return (
    <Fragment>
      <TextField
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
        onBlur={() => {
          props.dispatch({ type: 'name_change', value: inputValue })
        }}
        disabled={props.isLocked}
        fullWidth
        size="small"
        InputLabelProps={{ shrink: true }}
        label="Name"
        placeholder={props.placeholder}
      />
    </Fragment>
  )
}

export default Name
