import React, { Component } from "react";
import "../css/App.css";
import FD from "./FD.js";

import FDRS from "3NF_SYNTHESIS"

const FdRelationScheme = FDRS.FdRelationScheme

const name_state_name = "name_input"
const attributes_state_name = "attributes_input"

class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [name_state_name]: "",
      [attributes_state_name]: ""
    }
    this.handleChange = this.handleInputChange.bind(this)
  }

  handleInputChange(state_name, event) {
    this.setState({
      [state_name]: event.target.value,
    })
  }

  render() {
    const attributes = Array.from(new Set(this.state[attributes_state_name].split(',').map(x => x.trim()).filter(x => x)))
    const options = attributes.map(attr => {
      return { value: attr, label: attr }
    })

    const should_put_placeholder =
      this.state[name_state_name] === "" &&
      this.state[attributes_state_name] === ""

    return (
      <div>
        <p>Enter your scheme information.</p>
        <div>
          <label>Name:</label>
          <input
            value={this.state[name_state_name]}
            onChange={event => this.handleInputChange(name_state_name, event)}
            type="text"
            className="relation_name"
            size="40"
            maxLength="50"
            placeholder={should_put_placeholder ? "vegetables" : ""} />
        </div>
        <div>
          <label>Attributes:</label>
          <input
            value={this.state[attributes_state_name]}
            onChange={event => this.handleInputChange(attributes_state_name, event)}
            type="text"
            className="relation_attributes"
            size="40"
            maxLength="500"
            placeholder={should_put_placeholder ? "name,grower,growing_area,price" : ""}
          />
        </div>
        <div>
          <label>Functional Dependencies:</label>
          <FD options={options} should_put_placeholder={should_put_placeholder}/>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scheme: new FdRelationScheme(
        "",
        [],
        []
      )
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Normalize and investigate fd scheme</h1>
        <Info />
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
