import React, { Component } from 'react';
import './App.css';

import Mask from './Mask'
import Keyboard from './Keyboard'

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const DICTIONARY = ["chocolat", "soupe", "verre", "ecran", "pinata", "ciel", "matraque", "mobilisation", "robotique"];



class App extends Component {

  state = {
    usedLetters : [],
    word : this.getRandomWord(),
    score : 0
  }
  


  componentDidMount () {
    document.addEventListener("keypress", this.handleKeyboardPress);
  }

  componentWillUnmount () {
    document.removeEventListener("keypress", this.handleKeyboardPress);
  }

  getRandomWord () {
    return DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_')
    ).split("");
  }

  mapAlphabetAndLetter () {
    return ALPHABET.map((val) => {
      return {
        letter : val,
        use : this.state.usedLetters.indexOf(val) > -1
      }
    });
  }

  handleKeyboardPress = e => {
    this.handleKeyboardClick(e.key);
  }

  handleKeyboardClick = letter => {
    const currentUsedLetters = this.state.usedLetters;
    const currentScore = this.state.score;

    if (currentUsedLetters.indexOf(letter) > -1) return;
    if (ALPHABET.indexOf(letter) === -1) return;

    this.setState({usedLetters : [...currentUsedLetters, ...[letter]]});

    let score;
    if (this.state.word.indexOf(letter) === -1) {
      score = currentScore - 1;
    } else {
      score = currentScore + 2;
    }
    this.setState({score : score});
  }

  hasWin (wordDisplay) {
    return wordDisplay.indexOf("_") === -1;
  }

  handleRestart = () => {
    this.setState({word : this.getRandomWord(), usedLetters : [], score : 0});
  }

  render() {
    const wordDisplay = this.computeDisplay(this.state.word, this.state.usedLetters);

    const mask = <Mask word={wordDisplay}/>;
    const score = <div className="score">Score : {this.state.score}</div>

    const keyboard = <Keyboard 
      letters={this.mapAlphabetAndLetter()} 
      onClick={this.handleKeyboardClick}
    />
    const restart = (<button className="restart" onClick={this.handleRestart}>RESTART</button>);
    
  

    return (
      <div className="App">
        {mask}
        {this.hasWin(wordDisplay) ? restart : keyboard}
        {score}
      </div>
    );
  }
}

export default App;
