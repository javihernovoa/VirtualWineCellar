import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <header className="App-header">

            <h1> Virtual Wine Cellar </h1>

          </header>

          <body className="App-hp-body">


            <div className="App-hp-body-leftcolumn">

              <img src={require('./HPImage.jpg')} alt="Wine Home Page" width="450" height="330" />

            </div>

            <div className="App-hp-body-rightcolumn">

              <p> Username </p>
              <p> Email </p>
              <p> Password </p>
              <p> Confirm Password </p>

              <button> Sign Up </button>
              <button> Log In </button>

              </div>

              <p className="App-hp-body-info"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed felis eu urna dictum egestas.
               Nunc at iaculis erat. Cras id gravida lorem, sed congue nisl. Aliquam a magna ut dolor malesuada fringilla.
               Vestibulum odio diam, scelerisque nec turpis a, ultricies dignissim justo. Fusce feugiat ex sit amet mollis viverra.
               Mauris ut quam faucibus, convallis purus a, porttitor nunc. Curabitur congue velit quis tincidunt sollicitudin. </p>

            </body>

            <footer>

            </footer>

      </div>
    );
  }
}

export default App;
