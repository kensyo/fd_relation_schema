// import React, { Component } from "react";
// import Select from "react-select";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'

// class FD extends Component {

//   render() {
//     const shouldPutPlaceholder = this.props.shouldPutPlaceholder

//     return (
//       <React.Fragment>
//         <Grid item xs={5}>
//           <Select
//             isMulti
//             className="lhs"
//             value={this.props.leftValue}
//             placeholder={shouldPutPlaceholder ? "name, grower" : ""}
//             onChange={this.props.onLeftSelectChange}
//             options={this.props.options}
//           />
//         </Grid>
//         <Grid item xs={0}>
//           ➞
//         </Grid>
//         <Grid item xs={5}>
//           <Select
//             isMulti
//             className="rhs"
//             value={this.props.rightValue}
//             placeholder={shouldPutPlaceholder ? "price" : ""}
//             onChange={this.props.onRightSelectChange}
//             options={this.props.options}
//           />
//         </Grid>
//         <Grid item xs={0}>
//           <Button variant="outlined" color="error" onClick={this.props.onButtonClick}>
//             Remove
//           </Button>
//         </Grid>
//       </React.Fragment>
//     )
//   }
// }

// export default FD;
import MenuItem from '@mui/material/MenuItem'
import { createStyles, makeStyles } from '@mui/styles'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import React, { HTMLAttributes } from 'react'
import Select from 'react-select'

const pokemons = [
  { value: 'pikachu', label: 'ピカチュウ' },
  { value: 'bulbasaur', label: 'フシギダネ' },
  { value: 'charmander', label: 'ヒトカゲ' },
  { value: 'squirtle', label: 'ゼニガメ' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}))

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 40,
    },
    input: {
      display: 'flex',
      padding: 0,
      height: 'auto',
    },
  }),
)

const inputComponent = React.forwardRef((props, ref) => {
  // const { inputRef, ...iprops } = props
  // console.log(props)

  return <div ref={ref} {...props} />
})

const Control = (props) => {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props

  // const classess = useStyles({ dense: TextFieldProps.margin === 'dense' });

  console.log(children)
  const child0 = children[0]
  const child1 = children[1]

  return (
    <TextField
      InputProps={{
        inputComponent: inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children: child0,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    >
    </TextField>
  )
}

const Option = (props) => {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

const components = {
  Control,
  Option,
}

const FD = (props) => {
  const classes = useStyles()
  const [pokemon, setPokemon] = React.useState(null)

  const onChange = (value) => {
    setPokemon(value)
  }

  const shouldPutPlaceholder = props.shouldPutPlaceholder

  return (
    <React.Fragment>
      <Grid item xs={5}>
        <Select
          isMulti
          classes={classes}
          inputId="pokemon"
          TextFieldProps={{
            multiline: true,
            variant: "outlined",
            fullWidth: true,
            label: "pokemon",
            size: "small",
            InputLabelProps: {
              htmlFor: 'pokemon',
              shrink: true,
            },
          }}
          placeholder="選択してください"
          options={pokemons}
          components={components}
          value={pokemon}
          onChange={onChange}
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
          placeholder={shouldPutPlaceholder ? "price" : ""}
          onChange={props.onRightSelectChange}
          options={props.options}
        />
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined" color="error" onClick={props.onButtonClick}>
          Remove
        </Button>
      </Grid>
    </React.Fragment>
  )
}

export default FD
