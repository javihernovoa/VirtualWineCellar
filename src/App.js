import React, { Component } from 'react';
import Routes from './Routes';
import './style/App.css';
import Header from './components/header';
import Nav from './components/nav';

class App extends Component {
  render() {

    return (
      <div className="App">

      <Header />
      <Nav />
      <Routes />

      </div>
    );
  }
}

export default App;
