import React, { Component, Fragment } from 'react';
import { addWineDM, addWineCellar, removeWineDM, addWineFriend } from '../components/userFunctions';
import { editWine } from '../components/userFunctions';

  // Create a 'Wine' component that renders a wine card
  class Wine extends Component {
    constructor(props) {
      super(props)

      this.state = {
        edit: false,
        userbox: false,
        friend_username: '',
        id: this.props[0],
        name: this.props[1],
        year: this.props[2],
        country: this.props[3],
        grape: this.props[4],
        alcohol: this.props[5],
        message: ''
      }
    }

    /* 
      Function that manage the change of states
    */
    nameChange = (e) => {
      this.setState ({
        name: e.target.value,
      })
    }

    yearChange = (e) => {
      this.setState ({
        year: e.target.value,
      })
    }

    countryChange = (e) => {
      this.setState ({
        country: e.target.value,
      })
    }

    grapeChange = (e) => {
      this.setState ({
        grape: e.target.value,
      })
    }

    alcoholChange = (e) => {
      this.setState ({
        alcohol: e.target.value,
      })
    }

    friendChange = (e) => {
      this.setState ({
        friend_username: e.target.value,
      })
    }

    popshow() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    }
 
    /* 
      Function that manage the submition 
    */
    sendOnSubmit(wine, id) {
      addWineDM(wine, id).then(res => {
        if(!res.error){
          this.props.master()
        }
      })
    }

    addOnSubmit(wine, id) {
      
      addWineCellar(wine, id).then(res => {
        if(!res.error){
          this.props.shared()
        }
      })
    }

    removeOnSubmit(wine, id) {
      
      removeWineDM(wine, id).then(res => {
        if(!res.error){
          this.props.shared()
        }
      })
    }

    shareToUser() {
      this.setState({userbox: true})
    }

    shareOnSubmit(username, wine) {
      addWineFriend(username, wine).then(res => {
        if(!res.error) {
          this.setState({
            message: res['result']
          })
        }
        else {
          this.setState({
            message: res['result']
          })
        }
        this.popshow();
      })
    }

    edit() {
      this.setState({edit: true})
    }

    editOnSubmit = (e) => {
      const newWine = {
        id: this.state.id,
        name: this.state.name,
        year: this.state.year,
        country: this.state.country,
        grape: this.state.grape,
        alcohol: this.state.alcohol
      }

      editWine(newWine).then(res => {
        this.setState({
          edit: false,
          name: res.result.name,
          year: res.result.year,
          country: res.result.country,
          grape: res.result.grape,
          alcohol: res.result.alcohol
        });
      })
    }

    render () {
    return (
      <div className="card">
        <div>
          <img src={require('../images/wines/' + this.props[6])} alt={this.state.name} width= "100%" height= "auto"/>
        </div>

        {this.state.edit ? 
          <Fragment>
            <form>
              <input
              className="form_input" 
              type="text" 
              name="username"
              placeholder={this.state.name} 
              onChange={e => this.nameChange(e)}
              value={this.state.name}/>

              <input
              className="form_input" 
              type="text" 
              name="username"
              placeholder={this.state.year} 
              onChange={e => this.yearChange(e)}
              value={this.state.year}/>

              <input
              className="form_input" 
              type="text" 
              name="username"
              placeholder={this.state.country} 
              onChange={e => this.countryChange(e)}
              value={this.state.country}/>

              <input
              className="form_input" 
              type="text" 
              name="username"
              placeholder={this.state.grape} 
              onChange={e => this.grapeChange(e)}
              value={this.state.grape}/>

              <input
              className="form_input" 
              type="text" 
              name="username"
              placeholder={this.state.alcohol} 
              onChange={e => this.alcoholChange(e)}
              value={this.state.alcohol}/>

              <button 
                className="add_button" 
                type="button"
                onClick={e => this.editOnSubmit()}>
                Done
              </button>
            </form>
            
          </Fragment>
        :
          <Fragment>
            <h2>
            { this.state.name} 

            {// Render Send button
              this.props.send &&
              
               <button 
                className="add_button" 
                type="button"
                onClick={e => this.sendOnSubmit(this.state.id, this.props.id)}>
                Send to me
              </button>
            } 

            {// Render Share To User Box
              this.props.slideshow &&
              <button 
              className="add_button" 
              type="button"
              onClick={e => this.shareToUser(e)}>
              Share
              </button>
            }

            {//Manage data of user's friend
              this.state.userbox && 
              <Fragment>
                <div className="form_input_friend">
                  <input
                    className="form_input" 
                    type="text" 
                    name="friend_username"
                    placeholder= "Username of your friend" 
                    onChange={e => this.friendChange(e)}
                    value={this.state.friend_username}/>

                  <button 
                    className="add_button" 
                    type="button"
                    onClick={e => this.shareOnSubmit(this.state.friend_username, this.state.id)}>
                    Send!
                  </button>

                  <div className="popup">
                      <span className="popuptext" id="myPopup">{this.state.message}</span>
                  </div>
                </div>
              </Fragment>
            }

            {// Render Edit button 
              this.props.edit &&
              <button 
              className="add_button" 
              type="button"
              onClick={e => this.edit()}>
              Edit
              </button>
            }

            {// Render Add and Delete button 
              this.props.share &&
              <Fragment>
                 <button 
                  className="add_button" 
                  type="button"
                  onClick={e => this.removeOnSubmit(this.state.id, this.props.id)}>
                  Remove
                </button>
                <button 
                  className="add_button" 
                  type="button"
                  onClick={e => this.addOnSubmit(this.state.id, this.props.id)}>
                  Add
                </button>
              </Fragment>
            }

          </h2>
            <h3>Wine Profile</h3>
            <ul>
              <li><strong>Year:</strong> { this.state.year }</li>
              <li><strong>Country:</strong> { this.state.country }</li>
              <li><strong>Grape:</strong> { this.state.grape }</li>
              <li><strong>Alcohol:</strong> { this.state.alcohol }</li>
          </ul>
          </Fragment>
        }
      </div>
      );
    }
  }
  
  // Create a container component that iterates over the wine array 
  //    and renders a 'Wine' component for each object in the array 
  class WineList extends Component {
    constructor(props) {
      super(props)

      this.state = {
        indexValue: 0,
        wine: '' 
      }
    }

    slideshowFunction = (value) => {
      var newValue = this.state.indexValue + value;
      if(newValue > this.props.wines.length - 1) {
        newValue = 0;
      }
      else if (newValue < 0) {
        newValue = this.props.wines.length - 1;
      }
      this.setState({
        indexValue: newValue,
        wine: this.props.wines[newValue]
      });
    }

    render() {
      var mainWine = this.state.wine !== '' ? // verifica si wine esta vacio 
        this.props.searchChange === false ?  // verifica si hubo cambio en el search
          this.state.wine // si el wine no esta vacio y no hubo cambio, wine se mantiene
          :
          this.props.wines[0] // si el wine no esta vacio per si hubo cambio en search, resetea wine al primer vino
                              // Aqui surge el problema, siempre carga el primer vino pero no resetea la variable searchChange a false para permitir 
                              // el uso de las flechas para los demas vinos. 
        : 
        this.props.wines[0]; // si wine esta vacio, carga el primer vino 
      return (
        <div className="container">
          {this.props.send === true &&
            <h2 className="page_title">Master Cellar</h2>
          }
          {this.props.share === true &&
            <h2 className="page_title">Shared with me</h2>
          }
          {this.props.send === false && this.props.share === false && this.props.id !== 1 &&
            <h2 className="page_title">My Cellar</h2>
          }
          {this.props.send === false && this.props.share === false && this.props.id === 1 &&
            <h2 className="page_title">Master User Cellar</h2>
          }
  
          {this.props.slideshow === true ? 
            <Fragment>
              {console.log(this.props.wines)}
              {console.log(this.state.indexValue)}
              <img id="left_arrow" src={require('../images/left.png')} alt="Left Arrow" width= "auto" height= "auto" onClick={e => this.slideshowFunction(-1)}/>
              <Wine
                  {...mainWine}
                  key={mainWine[0]}
                  send={this.props.send}
                  share={this.props.share} 
                  id={this.props.id}
                  edit={this.props.edit}
                  master={this.props.master}
                  shared={this.props.shared}
                  slideshow={this.props.slideshow}
                /> 
                <img id="right_arrow" src={require('../images/right.png')} alt="Right Arrow" width= "auto" height= "auto" onClick={e => this.slideshowFunction(1)}/> 
            </Fragment>
          :
            <Fragment>
              {this.props.wines.map( wine => 
                <Wine
                    {...wine}
                    key={wine[0]}
                    send={this.props.send}
                    share={this.props.share} 
                    id={this.props.id}
                    edit={this.props.edit}
                    master={this.props.master}
                    shared={this.props.shared}
                  />  
                )}
            </Fragment>
          }
          
        </div>
      );
    }
  }
  export default WineList;