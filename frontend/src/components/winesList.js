  // Create a container component that iterates over the wine array 
  //    and renders a 'Wine' component for each object in the array 

import React, { Component, Fragment } from 'react';
import Wine from '../components/Wine';

  class WineList extends Component {
    constructor(props) {
      super(props)

      this.state = {
        indexValue: 0,
      }
    }

    slideshowFunction = (value) => {
      var newValue = this.state.indexValue + value;
      if(newValue > this.props.wines.length - 1) {
        newValue = 0;
      }
      else if (newValue < 0) {
        newValue = this.props.wines.length - 1;
      }
      this.setState({indexValue: newValue});
    }

    render() {
      return (
        <div className="container">
          {this.props.send === true &&
            <h2 className="page_title">Master Cellar</h2>
          }
          {this.props.share === true &&
            <h2 className="page_title">Shared with me</h2>
          }
          {this.props.send === false && this.props.share === false && this.props.id !== 1 &&
            <h2 className="page_title">My Cellar</h2>
          }
          {this.props.send === false && this.props.share === false && this.props.id === 1 &&
            <h2 className="page_title">Master User Cellar</h2>
          }
  
          {this.props.slideshow === true ? 
            <Fragment>
              <img id="left_arrow" src={require('../images/left.png')} alt="Left Arrow" width= "auto" height= "auto" onClick={e => this.slideshowFunction(-1)}/>
              <Wine
                  {...this.props.wines[this.state.indexValue]}
                  key={this.state.indexValue}
                  send={this.props.send}
                  share={this.props.share} 
                  id={this.props.id}
                  edit={this.props.edit}
                  master={this.props.master}
                  shared={this.props.shared}
                  slideshow={this.props.slideshow}
                /> 
                <img id="right_arrow" src={require('../images/right.png')} alt="Right Arrow" width= "auto" height= "auto" onClick={e => this.slideshowFunction(1)}/> 
            </Fragment>
          :
            <Fragment>
              {this.props.wines.map( wine => 
                <Wine
                    {...wine}
                    key={wine[0]}
                    send={this.props.send}
                    share={this.props.share} 
                    id={this.props.id}
                    edit={this.props.edit}
                    master={this.props.master}
                    shared={this.props.shared}
                  />  
                )}
            </Fragment>
          }
          
        </div>
      );
    }
  }
  export default WineList;