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
      edit: false
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
      share_component: false
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
      share_component: true
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
      share_component: false
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
            <p className="empty_cellar">The Cellar is empty.</p>
            : 
            <WineList wines={this.state.wines} send={this.state.add_component} share={this.state.share_component} id={this.state.id} edit={this.state.edit} master={e => this.masterOnSubmit(e)} add={e => this.sharedOnSubmit(e)}/>
        }
      </div>
    );
  }
}

export default Cellar;