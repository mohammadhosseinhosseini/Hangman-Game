import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import Button from "./Button";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetButton = this.resetButton.bind(this);
    let win = false;
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    console.log(evt);
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map(ltr => (
        <Button
          disabled={this.state.guessed.has(ltr)}
          key={ltr}
          letter={ltr}
          handleGuess={this.handleGuess}
        />
      ));
  }
  resetButton(e) {
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    }));
  }

  /** render: render game */
  render() {
    this.win = true;
    for (let i = 0; i < this.state.answer.length; i++) {
      if (!this.state.guessed.has(this.state.answer[i])) this.win = false;
    }
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong}/${this.props.maxWrong}`}
        />
        <p className="Hangman-word">{this.guessedWord()}</p>
        <div>Number of Wrong guesses: {this.state.nWrong}</div>
        <p
          className="Hangman-btns"
          style={{
            display:
              this.props.maxWrong <= this.state.nWrong || this.win ? "none" : ""
          }}
        >
          {this.generateButtons()}
        </p>
        <h3
          className="Hangman-lose"
          style={{
            display: this.props.maxWrong <= this.state.nWrong ? "" : "none"
          }}
        >
          You Lose ... answer is : {this.state.answer}
        </h3>
        <h3
          className="Hangman-lose"
          style={{ display: this.win ? "" : "none" }}
        >
          You Won ...
        </h3>
        <div className="Hangman-btnReset" onClick={this.resetButton}>
          Restart
        </div>
      </div>
    );
  }
}

export default Hangman;
