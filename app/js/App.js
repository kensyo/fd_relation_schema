import React, { Component } from "react";
import "../css/App.css";
import FD from "./FD.js";

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
        <div>
          <label>Functional Dependencies:</label>
          {
            this.props.FDsSelect.map((fd, num) =>
              <FD
                key={num}
                options={options}
                shouldPutPlaceholder={shouldPutPlaceholder}
                leftValue={fd[0]}
                rightValue={fd[1]}
                onLeftSelectChange={event => this.props.handleLeftSelectChange(num, event)}
                onRightSelectChange={event => this.props.handleRightSelectChange(num, event)}
                onButtonClick={event => this.props.handleRemoveButtonClick(num, event)}
              />
            )
          }
          <button onClick={this.props.handleAddButtonClick}>
            Add another FD
          </button>
        </div>
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
        const new_lhs = []
        for (const elem of fd[0]) {
          const value = elem.value
          if (attributes.includes(value)) {
            new_lhs.push(elem)
          }
        }

        const new_rhs = []
        for (const elem of fd[1]) {
          const value = elem.value
          if (attributes.includes(value)) {
            new_rhs.push(elem)
          }
        }

        newFDs.push(
          [new_lhs, new_rhs]
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
      <div className="App">
        <h1>Normalize and investigate fd scheme</h1>
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
      </div>
    );
  }
}

export default App;

  // <h1>Normalize and investigate fd scheme</h1> -->
  // <p>Enter your sheme information.</p> -->
  // <div> -->
  //   <label>Name:</label> -->
  //   <input type="text" id="relation_name" size="40" maxlength="20" placeholder="vegetables"> -->
  // </div> -->
  // <div> -->
  //   <label>Attributes:</label> -->
  //   <input type="text" id="relation_attributes" size="40" maxlength="20" placeholder="name,grower,growing_area,price"> -->
  // </div> -->
  // <div> -->
  //   <label>Functional Dependencies:</label> -->
  //   <select id="relation_fds"> -->
  //     <!-1- <option disabled selected>What to do?</option> -1-> -->
  //     <option value="1">elem1</option> -->
  //     <option value="2">elem2</option> -->
  //   </select> -->
  // </div> -->
  // <!-1- <div> -1-> -->
  // <!-1-   <label>Functional dependencies:</label> -1-> -->
  // <!-1-   <input type="text" id="relation_fds" size="40" maxlength="20" placeholder="{name,grower}->{price},{grower}->{growing_area}"> -1-> -->
  // <!-1- </div> -1-> -->
  // <p>Select what to do</p> -->
  // <div> -->
  //   <select id="what_to_do"> -->
  //     <!-1- <option disabled selected>What to do?</option> -1-> -->
  //     <option value="check_normality">Check normality</option> -->
  //     <option value="synthesize">Decompose by synthesis</option> -->
  //   </select> -->
  //   <button id="do">Do</button> -->
  // </div> -->
  // <div id="result_area"></div> -->
