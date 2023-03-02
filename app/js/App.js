import React, { Component } from "react";
import Select from "react-select";
import "../css/App.css";
import FD from "./FD.js";

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';

import FDRS from "3NF_SYNTHESIS"

const FdRelationScheme = FDRS.FdRelationScheme

function getAttributes(str) {
  return Array.from(new Set(str.split(',').map(x => x.trim()).filter(x => x)))
}

class Info extends Component {

  render() {
    const attributes = getAttributes(this.props.attributesInput)
    const options = attributes.map(attr => {
      return { value: attr, label: attr }
    })

    const shouldPutPlaceholder =
      this.props.nameInput === "" &&
      this.props.attributesInput === ""

    return (
      <div>
        <p>Enter your scheme information.</p>
        <div>
          <label>Name:</label>
          <input
            value={this.props.nameInput}
            onChange={event => this.props.handleInputChange("nameInput", event)}
            type="text"
            className="relation_name"
            size="40"
            maxLength="50"
            placeholder={shouldPutPlaceholder ? "example: vegetables" : ""} />
        </div>
        <div>
          <label>Attributes:</label>
          <input
            value={this.props.attributesInput}
            onChange={event => this.props.handleInputChange("attributesInput", event)}
            type="text"
            className="relation_attributes"
            size="40"
            maxLength="500"
            placeholder={shouldPutPlaceholder ? "name,grower,growing_area,price" : ""}
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <label>Functional Dependencies:</label>
          <Button variant="contained" onClick={this.props.handleAddButtonClick}>
            Add another FD
          </Button>
          <Grid container rowSpacing={1}>
            {
              this.props.FDsSelect.map((fd, num) =>
                <Grid key={num} container item spacing={1} alignItems="Center">
                  <FD
                    options={options}
                    shouldPutPlaceholder={shouldPutPlaceholder}
                    leftValue={fd[0]}
                    rightValue={fd[1]}
                    onLeftSelectChange={event => this.props.handleLeftSelectChange(num, event)}
                    onRightSelectChange={event => this.props.handleRightSelectChange(num, event)}
                    onButtonClick={event => this.props.handleRemoveButtonClick(num, event)}
                  />
                </Grid>
              )
            }
          </Grid>
        </Box>
      </div>
    )
  }
}

class Exec extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scheme: null,
      selectValue: "",
    }
  }

  options = [
    { value: "diagnose", label: "Diagnose normality" },
    { value: "synthesize", label: "Decompose into 3NF by synthesis" },
  ]

  renderSchemeInfo(scheme, showNormality = false) {
    const FDStrings = Array.from(scheme.fds).map(fd => {
      const array_fd = JSON.parse(fd)
      const X = array_fd[0]
      const Y = array_fd[1]

      const stringifiedX = X.length === 0 ? "\u2205" : X.join(', ')
      const stringifiedY = Y.length === 0 ? "\u2205" : Y.join(', ')

      return (
        <li key={stringifiedX + stringifiedY}>
          {stringifiedX + ' ➞ ' + stringifiedY}
        </li>
      )
    })

    const diagnosis = scheme.diagnose_normality()

    return (
      <ul>
        <li>Name: {scheme.name}</li>
        <li>Attributes: {Array.from(scheme.attributes).join(', ')}</li>
        <li>FDs:
          <ul>
            {FDStrings}
          </ul>
        </li>
        {showNormality &&
          <li>
            Normality: {diagnosis.normality} {diagnosis.is_definite ? " with no higher order" : " or higher"}
          </li>
        }
      </ul>
    )
  }

  renderResult() {
    if (this.state.scheme === null) {
      return <div className="result"></div>
    }

    const scheme = this.state.scheme

    switch (this.state.selectValue.value) {
      case "diagnose":
        const diagnosis = this.state.scheme.diagnose_normality()
        const prefix = diagnosis.is_definite ? "" : "at least"
        const postfix = diagnosis.is_definite ? " and isn't in the normal form with higher order." : "."
        const diagnosisString = `This is ${prefix} in ${diagnosis.normality}${postfix}`

        return (
          <div className="result">
            {this.renderSchemeInfo(scheme)}
            <p>{diagnosisString}</p>
          </div>
        )

      case "synthesize":
        const decomposition = FDRS.synthesize_into_3NF(scheme)

        return (
          <div className="result">
            {this.renderSchemeInfo(scheme)}
            <p>is decomposed into 3NF as follows:</p>
            {
              Array.from(decomposition).map(decomposedScheme => {
                return (
                  <div key={decomposedScheme.name}>
                    {this.renderSchemeInfo(decomposedScheme, true)}
                  </div>
                )
              })
            }
          </div>
        )

      default:
        return <div className="result"></div>
    }

  }

  render() {

    return (
      <div>
        <Select
          className="execSelect"
          options={this.options}
          value={this.state.selectValue}
          onChange={(event) => {
            const name = this.props.nameInput
            const attributes = getAttributes(this.props.attributesInput)
            const FDs = []
            for (const select of this.props.FDsSelect) {
              const leftSelect = select[0]
              const X = leftSelect.map(x => x.value)

              const rightSelect = select[1]
              const Y = rightSelect.map(x => x.value)

              FDs.push([X, Y]) // adding X->Y to FDs
            }

            const scheme = new FdRelationScheme(
              name,
              attributes,
              FDs
            )

            this.setState({
              scheme: scheme,
              selectValue: event
            })
          }}
        />
        {this.renderResult()}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameInput: "",
      attributesInput: "",
      FDsSelect: [
        [[], []]
      ]
      // [[{ value: attr, label: attr }, ... ], [{ value: attr, label: attr }, ...]]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this)
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleLeftSelectChange = this.handleLeftSelectChange.bind(this)
    this.handleRightSelectChange = this.handleRightSelectChange.bind(this)
  }

  handleInputChange(state_name, event) {
    if (state_name === "attributesInput") {
      const attributes = getAttributes(event.target.value)

      const newFDs = []
      for (const fd of this.state.FDsSelect) {
        const newLHS = []
        for (const elem of fd[0]) {
          const value = elem.value
          if (attributes.includes(value)) {
            newLHS.push(elem)
          }
        }

        const newRHS = []
        for (const elem of fd[1]) {
          const value = elem.value
          if (attributes.includes(value)) {
            newRHS.push(elem)
          }
        }

        newFDs.push(
          [newLHS, newRHS]
        )

      }
      this.setState({
        FDsSelect: newFDs
      })
    }

    this.setState({
      [state_name]: event.target.value,
    })
  }

  handleLeftSelectChange(num, event) {
    const newFDs = this.state.FDsSelect
    newFDs[num][0] = event
    this.setState({
      FDsSelect: newFDs
    })
  }

  handleRightSelectChange(num, event) {
    const newFDs = this.state.FDsSelect
    newFDs[num][1] = event
    this.setState({
      FDsSelect: newFDs
    })
  }

  handleRemoveButtonClick(num, event) {
    const newFDs = this.state.FDsSelect.slice()
    newFDs.splice(num, 1)
    this.setState({
      FDsSelect: newFDs
    })
  }

  handleAddButtonClick(event) {
    const newFDs = this.state.FDsSelect.slice()
    newFDs.push([[], []])
    this.setState({
      FDsSelect: newFDs
    })
  }

  render() {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Normalize and investigate fd scheme
          </Typography>
          <Info
            nameInput={this.state.nameInput}
            attributesInput={this.state.attributesInput}
            FDsSelect={this.state.FDsSelect}
            handleInputChange={this.handleInputChange}
            handleLeftSelectChange={this.handleLeftSelectChange}
            handleRightSelectChange={this.handleRightSelectChange}
            handleRemoveButtonClick={this.handleRemoveButtonClick}
            handleAddButtonClick={this.handleAddButtonClick}
          />
          <Exec
            nameInput={this.state.nameInput}
            attributesInput={this.state.attributesInput}
            FDsSelect={this.state.FDsSelect}
          />
        </Box>
      </Container>
    );
  }
}

export default App;
