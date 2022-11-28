import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dataset from './components/dataset';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Prayer Times</h1>
        </header>
        <Dataset />
      </div>
    );
  }
}

export default App;
