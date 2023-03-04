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
  // control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   const color = chroma(data.color);
  //   return {
  //     ...styles,
  //     backgroundColor: isDisabled
  //       ? undefined
  //       : isSelected
  //         ? data.color
  //         : isFocused
  //           ? color.alpha(0.1).css()
  //           : undefined,
  //     color: isDisabled
  //       ? '#ccc'
  //       : isSelected
  //         ? chroma.contrast(color, 'white') > 2
  //           ? 'white'
  //           : 'black'
  //         : data.color,
  //     cursor: isDisabled ? 'not-allowed' : 'default',

  //     ':active': {
  //       ...styles[':active'],
  //       backgroundColor: !isDisabled
  //         ? isSelected
  //           ? data.color
  //           : color.alpha(0.3).css()
  //         : undefined,
  //     },
  //   };
  // },
  multiValue: (styles, { data }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      // backgroundColor: color.alpha(0.1).css(),
      transition: data.isDuplicated ? "0.15s" : "0.0s",
      opacity: data.isDuplicated ? 0 : 1
    };
  },
  // multiValueLabel: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  // }),
  // multiValueRemove: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  //   ':hover': {
  //     backgroundColor: data.color,
  //     color: 'white',
  //   },
  // }),
};

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState([]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => {
          const trimedInputValue = inputValue.trim()

          for (const [i, option] of prev.entries()) {
            if (option.value === trimedInputValue) {
              const newValue = [...prev]
              newValue[i].isDuplicated = true
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

              return newValue
            }
          }

          return [...prev, createOption(trimedInputValue)]
        });
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
