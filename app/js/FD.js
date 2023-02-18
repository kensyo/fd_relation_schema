import React, { Component } from "react";
import Select from "react-select";

const lhs_state_name = "lhs"
const rhs_state_name = "rhs"

class FD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [lhs_state_name]: [],
      [rhs_state_name]: []
    }
  }

  handleChange(which_side, event) {
    this.setState({
      [which_side]: event
    })
  }

  render() {
    return (
      <div className="FD" >
        <Select
          isMulti
          className="lhs"
          value={this.state.lhs}
          placeholder="hoge"
          onChange={event => this.handleChange(lhs_state_name, event)}
          options={this.props.options}
        />
        ➞
        <Select
          isMulti
          className="rhs"
          value={this.state.rhs}
          placeholder="fuga"
          onChange={event => this.handleChange(rhs_state_name, event)}
          options={this.props.options}
        />
      </div>
    )
  }
}

export default FD;
