/* 
  Main class that have the base of the web app. 
*/
import React, { Component, Fragment} from 'react';
import { Link, withRouter } from "react-router-dom";
import Routes from './Routes';
import './style/App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogged: false,
    }

    this.user = {
      username: '',
      email: '',
      password: '',
    }
  }

  /* 
    Function that changes the state of isLogged
  */
  userIsLogged = (logging) => {
    this.setState({
        isLogged: logging,
    });
  }

  /* 
    Function that manages the logout 
  */
  handleLogout = async (e) => {
    this.userIsLogged(false);
    this.setState({userNew: null});
    this.props.history.push("/login");
  }

  render() {

    const childProps = {
      isLogged: this.state.isLogged,
      userIsLogged: this.userIsLogged,
      user: this.user,
    };

    return (
        <div className="app">

        <header> 
            <h1><Link to="/"> Virtual Wine Cellar </Link></h1>

            {this.state.isLogged ?
            <nav className="nav_menu"> 
              <Link to="/login" className="link" onClick={e => this.handleLogout(e)}> Logout </Link>
            </nav> 
            : 
            <Fragment>
              <nav className="nav_menu"> 
                <Link to="/login" className="link"> Login </Link>
                <Link to="/register" className="link"> Register </Link>
              </nav>  
            </Fragment>
            
          }
        </header>

        <Routes childProps={childProps} />
        
      </div>
    );
  }
}

export default withRouter(App);