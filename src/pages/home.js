import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (

      <div className="Home"> 

        <img id="home-image" src={require('../images/home.jpg')} alt="Wine Home Page" width="360" height="270" />

        <p className="home-info"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed felis eu urna dictum egestas.
        Nunc at iaculis erat. Cras id gravida lorem, sed congue nisl. Aliquam a magna ut dolor malesuada fringilla.
        Vestibulum odio diam, scelerisque nec turpis a, ultricies dignissim justo. Fusce feugiat ex sit amet mollis viverra.
        Mauris ut quam faucibus, convallis purus a, porttitor nunc. Curabitur congue velit quis tincidunt sollicitudin. </p>
      </div>
      
    );
  }
}

export default Home;
