import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class GroupedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  handleIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  handleDecrement = () => {
    this.setState({ counter: Math.max(1, this.state.counter - 1) });
  };

  render() {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={this.handleDecrement}>-</Button>
          <Button>{this.state.counter}</Button>
          <Button onClick={this.handleIncrement}>+</Button>
        </ButtonGroup>
        <Box ml={1}>
          <Button onClick={() => this.props.handleClick(this.state.counter)}>
            {this.props.buttonText}
          </Button>
        </Box>
      </Box>
    );
  }
}

export default GroupedButton;
