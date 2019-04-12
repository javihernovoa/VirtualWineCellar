/* 
  Navigation bar of the web app. 
*/
import React, { Component, Fragment} from 'react';
import { Link, withRouter } from "react-router-dom";
import '../style/App.css';
import Auth from './Auth';

class navBar extends Component {
  /* 
    Function that manages the logout 
  */
  handleLogout = async (e) => {
    e.preventDefault();
    Auth.deauthenticateUser();
    this.props.history.push('/')
  }

  render() {
    return (
        <div className="navBar">

        <header> 
            <h1><Link to="/">Virtual Wine Cellar</Link></h1>

            {Auth.isUserAuthenticated() ?
            <nav className="nav_header"> 
              <p><Link to="/login" className="link" onClick={e => this.handleLogout(e)}>Logout</Link></p>
              <p><Link to="/cellar" className="link">Cellar</Link></p>
            </nav> 
            : 
            <Fragment>
              <nav className="nav_header"> 
               <p><Link to="/login" className="link">Login</Link></p>
               <p><Link to="/register" className="link">Register</Link></p>

              </nav>  
            </Fragment>
            
            }
        </header>        
      </div>
    );
  }
}

export default withRouter(navBar);