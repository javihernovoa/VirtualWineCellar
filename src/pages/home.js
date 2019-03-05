/* 
  Class that contain the information of the web app. 
*/
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (

      <div className="home"> 

        <img id="home_image" src={require('../images/home.jpg')} alt="Wine Home Page" width="360" height="270" />

        <p className="home_info"> Information about the web app. </p>
      </div>
      
    );
  }
}

export default Home;
