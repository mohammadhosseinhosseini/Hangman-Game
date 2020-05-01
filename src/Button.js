import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.handleGuess(e);
  }
  render() {
    return (
      <button
        value={this.props.letter}
        onClick={this.handleClick}
        disabled={this.props.disabled}
      >
        {this.props.letter}
      </button>
    );
  }
}
export default Button;
