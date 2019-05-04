/* 
  Navigation bar of the web app. 
*/
import React, { Component, Fragment} from 'react';
import { Link, withRouter } from "react-router-dom";
import '../style/App.css';
import Auth from './Auth';
import Cellar from '../pages/cellar';

class navBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      cellar : true,
      logout: false
    }
  }
  /* 
    Function that manages the logout.
  */
  handleLogout = async (e) => {
    this.setState({
      logout: true
    })
    Auth.deauthenticateUser();
    this.props.history.push('/');
  }

  cellarChange = (e) => {
    this.setState({
      cellar: false
    })
  }

  render() {
    return (
        <div className="navBar">

        <header> 
            <h1><Link to="/" onClick={e => this.cellarChange(e)}>Virtual Wine Cellar</Link></h1>

            {Auth.isUserAuthenticated() ?
            <Fragment>
              <nav className="nav_header"> 
                <p><Link to="/login" className="link" onClick={e => this.handleLogout(e)}>Logout</Link></p>
                {this.state.cellar !== true &&
                  <Fragment>
                    <p><Link to="/cellar" className="link" onClick={e => Cellar.cellarOnSubmit(e)}>Cellar</Link></p>
                    {this.state.cellar === true}
                  </Fragment>
                }
              </nav> 
            </Fragment>
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