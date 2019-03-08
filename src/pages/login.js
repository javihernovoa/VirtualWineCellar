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

    //Testing 
    if(this.state.username === this.props.user.username && this.state.password === this.props.user.password){
      this.props.userIsLogged(true);
      this.props.history.push("/cellar");
    }
  }

  render() {
    return (
      <div className="data_form_wrapper"> 

        <form className="data_form">

          <h2 className="title_form"> Login </h2>

          <label className="label_input"> Username </label>
          <input 
            className="form_input" 
            type="text" 
            id="username" 
            autoCorrect="off" 
            autoCapitalize="off" 
            spellCheck="off"
            onChange={e => this.onChange(e)}
            value={this.state.username}/>

          <label className="label_input"> Password </label>
          <input 
            className="form_input" 
            type="password" 
            id="password" 
            onChange={e => this.onChange(e)}
            value={this.state.password}/>

          <button 
            className="button_submit" 
            type="submit" 
            onClick={e => this.onSubmit(e)}>
            Login
          </button>
          
        </form> 

        <div className="connect_account">
          <p> Do you need an account? </p>

          <Link to="/register" className="button_link"> Create an account </Link> 

        </div> 
        
      </div>
    );
  }
}

export default Login;
