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
      confirm_password: '',
      send_info: false,
    }
  }

  /* 
    Function that manage the change of states
  */
  usernameChange = (e) => {
    this.setState ({
      username: e.target.value,
    })
  }

  emailChange = (e) => {
    this.setState ({
      email: e.target.value,
    })
  }

  passwordChange = (e) => {
    this.setState ({
      password: e.target.value,
    })
  }

  confirmPasswordChange = (e) => {
    this.setState ({
      confirm_password: e.target.value,
    })
  }

  /* 
    Function that manage the submition 
  */
  onSubmit = (e) => {
    this.setState ({
      send_info: true,
    })
    
    //Testing
    if (!(this.state.username === '' && this.state.email === '' && this.state.password === '' && this.state.confirm_password === '')) {
      if(this.state.password === this.state.confirm_password){

        this.props.user.username = this.state.username;
        this.props.user.email = this.state.email;
        this.props.user.password = this.state.password;
  
        this.props.history.push("/login");
      }
    }
  }

  render() {
    return (
      <div className="data_form_wrapper"> 

        <form className="data_form">

          <h2 className="title_form">Register</h2>

          <label className="label_input">Username</label>
          <input 
            className="form_input" 
            type="text" 
            id="username" 
            autoCorrect="off" 
            autoCapitalize="off" 
            spellCheck="off"
            onChange={e => this.usernameChange(e)}
            value={this.state.username}/>

          <label className="label_input">Email</label>
          <input 
            className="form_input" 
            type="email" 
            id="email" 
            onChange={e => this.emailChange(e)}
            value={this.state.email}/>
          
          <label className="label_input">Password</label>
          <input 
            className="form_input" 
            type="password" 
            id="password" 
            onChange={e => this.passwordChange(e)}
            value={this.state.password}/>

          <label className="label_input">Confirm Password</label>
          <input 
            className="form_input" 
            type="password" 
            id="confirm_password" 
            onChange={e => this.confirmPasswordChange(e)}
            value={this.state.confrim_password}/>

          <button 
            className="button_submit" 
            type="button" 
            onClick={e => this.onSubmit(e)}>
            Register
          </button>
          
        </form> 

        <div className="connect_account">
          <p>Do you have an account?</p>

          <Link to="/login" className="button_link">Login in your account</Link> 

        </div>

      </div>
    );
  }
}

export default Register;
