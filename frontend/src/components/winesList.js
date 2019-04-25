import React, { Component, Fragment } from 'react';
import { addWine } from '../components/userFunctions';
import { editWine } from '../components/userFunctions';

  // Create a 'Wine' component that renders a wine card
  class Wine extends Component {
    constructor(props) {
      super(props)

      this.state = {
        edit: false,
        id: this.props[0],
        name: this.props[1],
        year: this.props[2],
        country: this.props[3],
        grape: this.props[4],
        alcohol: this.props[5]
      }
    }

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
 
    addOnSubmit(wine, id) {
      
      addWine(wine, id).then(res => {
        if(!res.error){
          // Show in screen a done message 
        }
        else {
          // Show in screen an error message 
        }
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

            {// Render add button
              this.props.add &&
                <button 
                className="add_button" 
                type="button"
                onClick={e => this.addOnSubmit(this.state.id, this.props.id)}>
                Add
                </button>
            } 

            {// Render edit button 
              this.props.edit &&
              <button 
              className="add_button" 
              type="button"
              onClick={e => this.edit()}>
              Edit
              </button>
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
  const WineList = (props) => {
    return (
      <div className="container">
        {props.wines.map( wine => 
          <Wine
            {...wine}
            key={wine[0]}
            add={props.add} 
            id={props.id}
            edit={props.edit}
          />  
        )}
      </div>
    );
  }

  export default WineList;