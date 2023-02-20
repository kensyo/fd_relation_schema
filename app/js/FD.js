import React, { Component } from "react";
import Select from "react-select";

class FD extends Component {

  render() {
    const shouldPutPlaceholder = this.props.shouldPutPlaceholder

    return (
      <div className="FD" >
        <Select
          isMulti
          className="lhs"
          value={this.props.leftValue}
          placeholder={shouldPutPlaceholder ? "name, grower" : ""}
          onChange={this.props.onLeftSelectChange}
          options={this.props.options}
        />
        ➞
        <Select
          isMulti
          className="rhs"
          value={this.props.rightValue}
          placeholder={shouldPutPlaceholder ? "price" : ""}
          onChange={this.props.onRightSelectChange}
          options={this.props.options}
        />
        <button onClick={this.props.onButtonClick}>
          Remove
        </button>
      </div>
    )
  }
}

export default FD;
