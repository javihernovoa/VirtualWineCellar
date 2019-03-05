/* 
  Class that contain the Register information of the web app.
*/
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props){
    super(props) 

    this.state = {
      username: '',
      email: '',
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
  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="register_wrapper"> 

        <form className="register_form">

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
            type="email" 
            id="email" 
            placeholder="Email"
            onChange={e => this.onChange(e)}
            value={this.state.email}/>

          <input 
            className="form_input" 
            type="password" 
            id="password" 
            placeholder="Password"
            onChange={e => this.onChange(e)}
            value={this.state.password}/>

          <button 
            className="button_submit" 
            type="button" 
            onClick={e => this.onSubmit(e)}>
            Register
          </button>
          
        </form> 

        <p> Do you have an account? <Link to="/login"> Login here </Link> </p>

      </div>
    );
  }
}

export default Register;
