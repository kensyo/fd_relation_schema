import React, { Fragment, useEffect } from 'react';

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
  };

  return (
    <Fragment>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        value={value}
        styles={styles}
      />
    </Fragment>
  );
};
