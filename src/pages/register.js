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
  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="data_form_wrapper"> 

        <form className="data_form">

          <h2 className="title_form"> Register </h2>

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

          <label className="label_input"> Email </label>
          <input 
            className="form_input" 
            type="email" 
            id="email" 
            onChange={e => this.onChange(e)}
            value={this.state.email}/>
          
          <label className="label_input"> Password </label>
          <input 
            className="form_input" 
            type="password" 
            id="password" 
            onChange={e => this.onChange(e)}
            value={this.state.password}/>

          <button 
            className="button_submit" 
            type="button" 
            onClick={e => this.onSubmit(e)}>
            Register
          </button>
          
        </form> 

        <div className="connect_account">
          <p> Do you have an account? </p>

          <Link to="/login" className="button_link"> Login in your account </Link> 

        </div>

      </div>
    );
  }
}

export default Register;
