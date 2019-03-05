/* 
  Class that contain the Login information of the web app.
*/
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  /* 
    Function that manage the change of states
  */
  onChange = (e) => {
    this.setState ({
      [e.target.id]: e.target.value,
    })
  }

  /* 
    Function that manage the submition 
  */
  onSubmit = (e) => {
    e.preventDefault();

    this.setState({isLoading: true});

    if(this.state.username === "admin" && this.state.password === "admin"){
      this.props.userIsLogged(true);
      this.props.history.push("/cellar");
    }
  }

  render() {
    return (
      <div className="login_wrapper"> 

        <form className="login_form">

          <input 
            className="form_input" 
            type="text" 
            id="username" 
            placeholder="Username" 
            autoCorrect="off" 
            autoCapitalize="off" 
            spellCheck="off"
            onChange={e => this.onChange(e)}
            value={this.state.username}/>

          <input 
            className="form_input" 
            type="password" 
            id="password" 
            placeholder="Password"
            onChange={e => this.onChange(e)}
            value={this.state.password}/>

          <button 
            className="button_submit" 
            type="submit" 
            onClick={e => this.onSubmit(e)}>
            Login
          </button>
          
        </form> 

        <p> Do you need an account? <Link to="/register"> Register here </Link> </p>

      </div>
    );
  }
}

export default Login;
