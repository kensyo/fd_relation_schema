import React, { useEffect } from 'react';

import { Autocomplete, Chip, TextField } from '@mui/material'

const createOption = (label) => ({
  label,
  value: label,
  isDuplicated: false
});

export default (props) => {
  const value = props.value
  const dispatch = props.dispatch
  const [inputValue, setInputValue] = React.useState('');

  const setValue = (newValue) => {
    dispatch({ type: "attributes_change", value: newValue })
  }

  useEffect(() => {
    const id = setTimeout(() => {
      for (const [i, option] of value.entries()) {
        if (option.isDuplicated) {
          const newValue = [...value]
          newValue[i].isDuplicated = false
          setValue(newValue)
        }
      }
    }, 150)

    // If state has changed within 150ms, clear setTimeout.
    return () => {
      clearTimeout(id)
    }
  }, [value])

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':

        // When Enter key is pressed to confirm IME input, its keyCode is 229. Otherwise 13.
        // Refer: https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
        // (Using keyCode seems to be deprecated.)
        if (event.keyCode == 229) {
          return
        }

        const trimedInputValue = inputValue.trim()

        for (const [i, option] of value.entries()) {
          if (option.value === trimedInputValue) {
            const newValue = [...value]
            newValue[i].isDuplicated = true

            setValue(newValue)
            event.preventDefault();

            return
          }
        }

        setValue([...value, createOption(trimedInputValue)])
        setInputValue('');
        event.preventDefault();
    }
  }

  return (
    <Autocomplete
      onKeyDown={handleKeyDown}
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={[]}
      freeSolo
      isOptionEqualToValue={() => false} // allow duplicated value to fire events
      inputValue={inputValue}
      value={value}
      onInputChange={(event, value, reason) => {
        switch (event.type) {
          case "change":
            setInputValue(value)
            break;

          default:
            break;
        }
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            style={{
              transition: option.isDuplicated ? "0.15s" : "0.0s",
              opacity: option.isDuplicated ? 0 : 1
            }}
            variant="outlined"
            label={option.label}
            {...getTagProps({ index })} />
        ))
      }
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
  );
};
