/* 
  Class that contain the information of the web app. 
*/
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (

      <div className="home"> 

        <img id="home_image" src={require('../images/home.jpg')} alt="Wine Home Page"/>

        <p className="home_info"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet imperdiet ligula, in auctor lacus. Donec tincidunt felis et porttitor scelerisque. Proin a consequat elit, vitae fermentum nunc. Duis gravida luctus diam at maximus. Ut ut interdum diam. Quisque volutpat urna massa, non lacinia lorem hendrerit a. Curabitur posuere odio sit amet risus dignissim posuere. Nulla finibus enim at tortor posuere, ac sagittis tellus vulputate. Praesent consequat auctor libero, ac lacinia orci vehicula in. Nulla non mattis mauris. Nullam dignissim nisl dolor, ut pulvinar enim eleifend sed. </p>
      </div>
      
    );
  }
}

export default Home;
