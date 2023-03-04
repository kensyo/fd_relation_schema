import React, { Component } from "react";
import Select from "react-select";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'

class FD extends Component {

  render() {
    const shouldPutPlaceholder = this.props.shouldPutPlaceholder

    return (
      <React.Fragment>
        <Grid item xs={5}>
          <Select
            isMulti
            className="lhs"
            value={this.props.leftValue}
            placeholder={shouldPutPlaceholder ? "name, grower" : ""}
            onChange={this.props.onLeftSelectChange}
            options={this.props.options}
          />
        </Grid>
        <Grid item xs={0}>
          ➞
        </Grid>
        <Grid item xs={5}>
          <Select
            isMulti
            className="rhs"
            value={this.props.rightValue}
            placeholder={shouldPutPlaceholder ? "price" : ""}
            onChange={this.props.onRightSelectChange}
            options={this.props.options}
          />
        </Grid>
        <Grid item xs={0}>
          <Button variant="outlined" color="error" onClick={this.props.onButtonClick}>
            Remove
          </Button>
        </Grid>
      </React.Fragment>
    )
  }
}

export default FD;
