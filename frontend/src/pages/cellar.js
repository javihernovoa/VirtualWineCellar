/* 
  Class that contain the information of the user of the web app. 
*/
import React, { Component, Fragment } from 'react';
import jwt_decode from 'jwt-decode';
import WineList from '../components/winesList';
import { getWines, getWinesDM, getMasterWines } from '../components/userFunctions';

class Cellar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      username: '',
      email: '',
      wines: [],
      info: '', 
      add_component: false,
      share_component: false,
      edit: false, 
      slideshow: true
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id: decoded.identity.id,
      username: decoded.identity.username,
      email: decoded.identity.email,
    })
      
    getWines(decoded.identity.id).then(res => {
      if(!res.error){
        this.setState({wines: res})
      }
      else {
        // Show in screen an error message 
      }
    })

    getWinesDM(decoded.identity.id).then(res => {
      if(!res.error){
        this.setState({winesDM: res})
      }
      else {
        // Show in screen an error message 
      }
    })

    if(decoded.identity.id === 1){
      this.setState({edit: true})
    }
  }

  slideshow = (e) => {
    var value;
    if (this.state.slideshow === true) {
      value = false;
    }
    else {
      value = true;
    }
    this.setState({slideshow: value})
  }

  /* 
    Function to reset states when the button of Cellar in the navigation bar is pressed.
  */
  static cellarOnSubmit() {
    getWines(this.state.id).then(res => {
      if(!res.error){
        this.setState({wines: res})
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  /* 
    Function that manage the submition 
  */
  internalCellarOnSubmit() {
    this.setState ({
      add_component: false,
      share_component: false,
      slideshow: true
    });

    getWines(this.state.id).then(res => {
      if(!res.error){
        this.setState({wines: res})
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  sharedOnSubmit() {
    this.setState ({
      add_component: false,
      share_component: true,
      slideshow: false
    });

    getWinesDM(this.state.id).then(res => {
      if(!res.error){
        this.setState({
          wines: res
        })
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  searchInfoChange = (e) => {
    this.setState ({
      info: e.target.value,
    })
  }

  searchOnSubmit = (e) => {
    // Search funtion 
    console.log(this.state)

  }

  masterOnSubmit = (e) => {
    this.setState ({
      add_component: true,
      share_component: false, 
      slideshow: false
    });
    
    getMasterWines(this.state.id).then(res => {
      if(!res.error){
        this.setState({
          wines: res
        })
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  render() {  
    return (
      <div className="cellar"> 

        <p className="welcome_user">Welcome back, <span className="user_name"><b>{this.state.username}</b></span>!</p>
        <form className="search_form">
            <input 
                type="search" 
                className="search_box" 
                name="search" 
                placeholder="Search"
                size="50"
                onChange={e => this.searchInfoChange(e)} 
                value={this.state.info}/>
            <button 
            className="option_button_submit" 
            type="button" 
            onClick={e => this.searchOnSubmit(e)}>
            Go!
          </button>
        </form>

        {this.state.add_component === false && this.state.share_component === false &&
            <Fragment>
              {this.state.slideshow === true ? 
                <img id="grid" src={require('../images/grid.png')} alt="Grid" width= "35px" height= "auto" onClick={e => this.slideshow(e)}/>
              :
                <img id="square" src={require('../images/square.png')} alt="Square" width= "35px" height= "auto" onClick={e => this.slideshow(e)}/>
              }
            </Fragment>
         }

        {this.state.id !== 1 &&
        <Fragment>
          <button 
            className="inbox_button" 
            type="button"
            onClick={e => this.internalCellarOnSubmit(e)}>
            My Cellar
          </button>

          <button 
            className="inbox_button" 
            type="button"
            onClick={e => this.masterOnSubmit(e)}>
            Master Cellar
          </button>

          <button 
            className="inbox_button" 
            type="button"
            onClick={e => this.sharedOnSubmit(e)}>
            Shared with me
          </button>
        </Fragment>
        }

        {console.log(this.state)}

        {this.state.wines.length === 0 ?
            <p className="empty_cellar">There is nothing here.</p>
            : 
            <WineList wines={this.state.wines} send={this.state.add_component} share={this.state.share_component} slideshow={this.state.slideshow} id={this.state.id} edit={this.state.edit} cellar={e => this.internalCellarOnSubmit(e)} master={e => this.masterOnSubmit(e)} shared={e => this.sharedOnSubmit(e)}/>
        }
      </div>
    );
  }
}

export default Cellar;