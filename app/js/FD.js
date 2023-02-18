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

  handleSelectChange(which_side, event) {
    this.setState({
      [which_side]: event
    })
  }

  render() {
    const should_put_placeholder = this.props.should_put_placeholder

    return (
      <div className="FD" >
        <Select
          isMulti
          className="lhs"
          value={this.state.lhs}
          placeholder={should_put_placeholder ? "name, grower" : ""}
          onChange={event => this.handleSelectChange(lhs_state_name, event)}
          options={this.props.options}
        />
        ➞
        <Select
          isMulti
          className="rhs"
          value={this.state.rhs}
          placeholder={should_put_placeholder ? "price" : ""}
          onChange={event => this.handleSelectChange(rhs_state_name, event)}
          options={this.props.options}
        />
      </div>
    )
  }
}

export default FD;
