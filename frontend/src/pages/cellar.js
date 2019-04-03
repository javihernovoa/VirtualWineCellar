/* 
  Class that contain the information of the user of the web app. 
*/
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'

class Cellar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      username: decoded.identity.username,
      email: decoded.identity.email
    })
  }

  render() {
    return (

      <div className="cellar"> 

        <p>Welcome {this.state.username}</p>
        <WineList wines={wines} />
      </div>
      
    );
  }
}

const wines = [
  {
    id: '1',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  }
];

// Create a 'Wine' component that renders a wine card
const Wine = (props) => {
  return (
  <div className="card">
    <div>
      <img src={require('../images/wines/wine_' + props.id + '.jpg')} alt={props.name} width= "100%" height= "auto"/>
    </div>
    <h2>{ props.name }</h2>
    <p>{ props.desc }</p>
    <h3>Wine Profile</h3>
    <ul>
      <li><strong>Year:</strong> { props.year }</li>
      <li><strong>Country:</strong> { props.country }</li>
      <li><strong>Grape:</strong> { props.grape }</li>
      <li><strong>Alcohol:</strong> { props.alcohol }</li>
    </ul>
  </div>
  );
}

// Create a container component that iterates over the wine array 
//    and renders a 'Wine' component for each object in the array 
const WineList = (props) => {
  return (
    <div className="container">
      {props.wines.map( wine => 
        <Wine
          {...wine}
          key={wine.id}
        />      
      )}
    </div>
  );
}

export default Cellar;