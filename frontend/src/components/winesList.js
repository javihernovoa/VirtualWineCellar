import React from 'react';
 
  // Create a 'Wine' component that renders a wine card
  const Wine = (props) => {
    return (
    <div className="card">
      <div>
        <img src={require('../images/wines/wine_' + props[0] + '.jpg')} alt={props[1]} width= "100%" height= "auto"/>
      </div>
      <h2>{ props[1] }</h2>
      <h3>Wine Profile</h3>
      <ul>
        <li><strong>Year:</strong> { props[2] }</li>
        <li><strong>Country:</strong> { props[3] }</li>
        <li><strong>Grape:</strong> { props[4] }</li>
        <li><strong>Alcohol:</strong> { props[5] }</li>
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
            key={wine[0]}
          />      
        )}
      </div>
    );
  }

  export default WineList;