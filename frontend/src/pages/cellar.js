/* 
  Class that contain the information of the user of the web app. 
*/
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import WineList from '../components/winesList';
import { getWines } from '../components/userFunctions';

class Cellar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      username: '',
      email: '',
      wines: [],
      info: ''
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
  }

  searchInfoChange = (e) => {
    this.setState ({
      info: e.target.value,
    })
  }

  searchOnSubmit = (e) => {
    console.log(this.state)

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
    
        <button 
            className="inbox_button" 
            type="button">
            Shared with Me
        </button>

        <WineList wines={this.state.wines} />
      </div>
    );
  }
}

export default Cellar;