/* 
  Main class that have the base of the web app. 
*/
import React, { Component} from 'react';
import { withRouter } from "react-router-dom";
import Routes from './Routes';
import NavBar from './components/navBar';
import './style/App.css';


class App extends Component {

  render() {
    return (
        <div className="app">

        <NavBar />
        <Routes />
        
      </div>
    );
  }
}

export default withRouter(App);