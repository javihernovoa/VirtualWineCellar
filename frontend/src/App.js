/* 
  Main class that have the base of the web app. 
*/
import React, { Component, Fragment} from 'react';
import { Link, withRouter } from "react-router-dom";
import Routes from './Routes';
import './style/App.css';
import Auth from './components/Auth';

class App extends Component {
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
        <div className="app">

        <header> 
            <h1><Link to="/">Virtual Wine Cellar</Link></h1>

            {Auth.isUserAuthenticated() ?
            <nav className="nav_header"> 
              <Link to="/cellar" className="link">Cellar</Link>
              <Link to="/login" className="link" onClick={e => this.handleLogout(e)}>Logout</Link>
            </nav> 
            : 
            <Fragment>
              <nav className="nav_header"> 
               <Link to="/login" className="link">Login</Link>
               <Link to="/register" className="link">Register</Link>

              </nav>  
            </Fragment>
            
            }
        </header>

        <Routes />
        
      </div>
    );
  }
}

export default withRouter(App);