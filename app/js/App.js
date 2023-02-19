import React, { Component } from "react";
import "../css/App.css";
import FD from "./FD.js";

import FDRS from "3NF_SYNTHESIS"

const FdRelationScheme = FDRS.FdRelationScheme

const name_state_name = "name_input"
const attributes_state_name = "attributes_input"
const FDs_state_name = "FDs"

class Info extends Component {
  get_attributes(str = this.props[attributes_state_name]) {
    return Array.from(new Set(str.split(',').map(x => x.trim()).filter(x => x)))
  }

  render() {
    const attributes = this.get_attributes()
    const options = attributes.map(attr => {
      return { value: attr, label: attr }
    })

    const should_put_placeholder =
      this.props[name_state_name] === "" &&
      this.props[attributes_state_name] === ""

    return (
      <div>
        <p>Enter your scheme information.</p>
        <div>
          <label>Name:</label>
          <input
            value={this.props[name_state_name]}
            onChange={event => this.props.handleInputChange(name_state_name, event)}
            type="text"
            className="relation_name"
            size="40"
            maxLength="50"
            placeholder={should_put_placeholder ? "example: vegetables" : ""} />
        </div>
        <div>
          <label>Attributes:</label>
          <input
            value={this.props[attributes_state_name]}
            onChange={event => this.props.handleInputChange(attributes_state_name, event)}
            type="text"
            className="relation_attributes"
            size="40"
            maxLength="500"
            placeholder={should_put_placeholder ? "name,grower,growing_area,price" : ""}
          />
        </div>
        <div>
          <label>Functional Dependencies:</label>
          {
            this.props[FDs_state_name].map((fd, num) =>
              <FD
                key={num}
                options={options}
                should_put_placeholder={should_put_placeholder}
                leftValue={fd[0]}
                rightValue={fd[1]}
                onLeftSelectChange={event => this.props.handleLeftSelectChange(num, event)}
                onRightSelectChange={event => this.props.handleRightSelectChange(num, event)}
                onButtonClick={event => this.props.handleButtonClick(num, event)}
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
// <FD attributes={attributes} options={options} should_put_placeholder={should_put_placeholder} />

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [name_state_name]: "",
      [attributes_state_name]: "",
      [FDs_state_name]: [
        [[], []]
      ]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleLeftSelectChange = this.handleLeftSelectChange.bind(this)
    this.handleRightSelectChange = this.handleRightSelectChange.bind(this)
  }

  get_attributes(str = this.state[attributes_state_name]) {
    return Array.from(new Set(str.split(',').map(x => x.trim()).filter(x => x)))
  }

  handleInputChange(state_name, event) {
    if (state_name === attributes_state_name) {
      const attributes = this.get_attributes(event.target.value)

      const new_FDs = []
      for (const fd of this.state[FDs_state_name]) {
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

        new_FDs.push(
          [new_lhs, new_rhs]
        )

      }
      this.setState({
        [FDs_state_name]: new_FDs
      })
    }

    this.setState({
      [state_name]: event.target.value,
    })
  }

  handleLeftSelectChange(num, event) {
    const new_FDs = this.state[FDs_state_name]
    new_FDs[num][0] = event
    this.setState({
      [FDs_state_name]: new_FDs
    })
  }

  handleRightSelectChange(num, event) {
    const new_FDs = this.state[FDs_state_name]
    new_FDs[num][1] = event
    this.setState({
      [FDs_state_name]: new_FDs
    })
  }

  handleButtonClick(num, event) {
    const new_FDs = this.state[FDs_state_name].slice()
    new_FDs.splice(num, 1)
    this.setState({
      [FDs_state_name]: new_FDs
    })
  }

  handleAddButtonClick(event) {
    const new_FDs = this.state[FDs_state_name].slice()
    new_FDs.push([[], []])
    this.setState({
      [FDs_state_name]: new_FDs
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Normalize and investigate fd scheme</h1>
        <Info
          name_input={this.state.name_input}
          attributes_input={this.state.attributes_input}
          FDs={this.state.FDs}
          handleInputChange={this.handleInputChange}
          handleLeftSelectChange={this.handleLeftSelectChange}
          handleRightSelectChange={this.handleRightSelectChange}
          handleButtonClick={this.handleButtonClick}
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
