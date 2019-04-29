/* 
  Class that contain the Register information of the web app.
*/
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { register } from '../components/userFunctions';

class Register extends Component {
  constructor(props){
    super(props) 

    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      message: '',

       //Test variables 
       send_info: false,
       send_message: ''
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

  popshow() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  /* 
    Function that manage the submition 
  */
  onSubmit = (e) => {
    
    // Test variables
    this.setState({
      send_info: true,
      send_message: "Sended"
    })

    if(this.state.password.length >= 8) {
      if(this.state.password === this.state.confirm_password) { 

        const newUser = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
    
        register(newUser).then(res => {
          this.props.history.push('/login')
        })
      }
      else {
        this.setState({
          message: "Passwords are not equal."
        })
      }
    }
    else {
      this.setState({
        message: "Password must have at least 8 characters."
      })
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
            name="username" 
            autoCorrect="off" 
            autoCapitalize="off" 
            spellCheck="off"
            onChange={e => this.usernameChange(e)}
            value={this.state.username}/>

          <label className="label_input">Email</label>
          <input 
            className="form_input" 
            type="email" 
            name="email" 
            onChange={e => this.emailChange(e)}
            value={this.state.email}/>
          
          <label className="label_input">Password</label>
          <input 
            className="form_input" 
            type="password" 
            name="password" 
            onChange={e => this.passwordChange(e)}
            value={this.state.password}/>

          <label className="label_input">Confirm Password</label>
          <input 
            className="form_input" 
            type="password" 
            name="confirm_password" 
            onChange={e => this.confirmPasswordChange(e)}
            value={this.state.confrim_password}/>

          <button 
            className="button_submit" 
            type="button" 
            onClick={e => this.onSubmit(e)}>
            Register
          </button>
          
        </form> 

        <div className="popup_r">
          <span className="popuptext" id="myPopup">{this.state.message}</span>
        </div> 

        <div className="connect_account">
          <p>Do you have an account?</p>

          <Link to="/login" className="button_link">Login in your account</Link> 

        </div>

      </div>
    );
  }
}

export default Register;
