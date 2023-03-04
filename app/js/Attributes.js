import { InputLabel } from '@mui/material';
import React, { Fragment } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
  isDuplicated: false
});

const styles = {
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      transition: data.isDuplicated ? "0.15s" : "0.0s",
      opacity: data.isDuplicated ? 0 : 1
    };
  },
};

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState([]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':

        const trimedInputValue = inputValue.trim()

        for (const [i, option] of value.entries()) {
          if (option.value === trimedInputValue) {
            const newValue = [...value]
            newValue[i].isDuplicated = true

            setValue(newValue)

            setTimeout(() => {
              setValue((prev) => {
                for (const [i, option] of prev.entries()) {
                  if (option.value === trimedInputValue) {
                    const newValue = [...prev]
                    newValue[i].isDuplicated = false
                    return newValue
                  }
                }
                return [...prev]
              })
            }, 150)

            event.preventDefault();

            return
          }
        }

        setValue([...value, createOption(trimedInputValue)])
        setInputValue('');
        event.preventDefault();
    }
  };

  return (
    <Fragment>
      <InputLabel>Attributes</InputLabel>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="vegetable_name, grower, growing_area, price"
        value={value}
        styles={styles}
      />
    </Fragment>
  );
};
