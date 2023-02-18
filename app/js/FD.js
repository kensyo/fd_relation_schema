import React, { Component } from "react";
import Select from "react-select";

class FD extends Component {

  render() {
    const should_put_placeholder = this.props.should_put_placeholder

    return (
      <div className="FD" >
        <Select
          isMulti
          className="lhs"
          value={this.props.leftValue}
          placeholder={should_put_placeholder ? "name, grower" : ""}
          onChange={this.props.onLeftSelectChange}
          options={this.props.options}
        />
        ➞
        <Select
          isMulti
          className="rhs"
          value={this.props.rightValue}
          placeholder={should_put_placeholder ? "price" : ""}
          onChange={this.props.onRightSelectChange}
          options={this.props.options}
        />
      </div>
    )
  }
}

export default FD;
