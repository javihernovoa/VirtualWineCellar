/* 
  Class that contain the information of the user of the web app. 
*/
import React, { Component, Fragment } from 'react';
import jwt_decode from 'jwt-decode';
import WineList from '../components/winesList';
import { getWines, getWinesDM, getMasterWines } from '../components/userFunctions';


class Cellar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      username: '',
      email: '',
      wines: [],
      filtered: [],
      info: '', 
      add_component: '',
      share_component: '',
      edit: '', 
      slideshow: '',
      search_value: false
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id: decoded.identity.id,
      username: decoded.identity.username,
      email: decoded.identity.email,
      add_component: false,
      share_component: false,
      edit: false,
      slideshow: false
    })
      
    getWines(decoded.identity.id).then(res => {
      if(!res.error){
        this.setState({wines: res})
        this.searchOnSubmit()
      }
      else {
        // Show in screen an error message 
      }
    })

    getWinesDM(decoded.identity.id).then(res => {
      if(!res.error){
        this.setState({winesDM: res})
      }
      else {
        // Show in screen an error message 
      }
    })

    if(decoded.identity.id === 1){
      this.setState({edit: true})
    }
  }

  slideshow = (e) => {
    
    this.setState({slideshow: !this.state.slideshow})
  }

  searchOnChange() {
    this.setState({search_value: false})
  }

  /* 
    Function to reset states when the button of Cellar in the navigation bar is pressed.
  */
  static cellarOnSubmit() {
    getWines(this.state.id).then(res => {
      if(!res.error){
        this.setState({wines: res})
        this.searchOnSubmit()
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  /* 
    Function that manage the submition 
  */
  internalCellarOnSubmit() {
    this.setState ({
      add_component: false,
      share_component: false,
      slideshow: false
    });

    getWines(this.state.id).then(res => {
      if(!res.error){
        this.setState({wines: res})
        this.searchOnSubmit()
      }
    })
  }

  sharedOnSubmit() {
    this.setState ({
      add_component: false,
      share_component: true,
      slideshow: false
    });

    getWinesDM(this.state.id).then(res => {
      if(!res.error){
        this.setState({
          wines: res
        })
        this.searchOnSubmit()
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  searchInfoChange = (e) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
            // Assign the original list to currentList
      currentList = this.state.wines;
            // Use .filter() to determine which items should be displayed
            // based on the search terms
      newList = currentList.filter(item => {
        // change items to lowercase
        const name = item[1].toLowerCase();
        const year = item[2];
        const country = item[3].toLowerCase();
        const grape = item[4].toLowerCase();
        const alcohol = item[5];

        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content 

        return (name.includes(filter) || year.toString().includes(filter) 
        || country.includes(filter) || grape.includes(filter) || alcohol.toString().includes(filter));
      });

    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.state.wines;
    }
        // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
      info: e.target.value,
      search_value: true
    });
}


  searchOnSubmit = (e) => {
         // Variable to hold the original version of the list
         let currentList = [];
         // Variable to hold the filtered list before putting into state
         let newList = [];
     
         // If the search bar isn't empty
         if (this.state.info !== "") {
                 // Assign the original list to currentList
           currentList = this.state.wines;
                 // Use .filter() to determine which items should be displayed
                 // based on the search terms
           newList = currentList.filter(item => {
             // change items to lowercase
             const name = item[1].toLowerCase();
             const year = item[2];
             const country = item[3].toLowerCase();
             const grape = item[4].toLowerCase();
             const alcohol = item[5];
     
             // change search term to lowercase
             const filter = this.state.info.toLowerCase();
             // check to see if the current list item includes the search term
             // If it does, it will be added to newList. Using lowercase eliminates
             // issues with capitalization in search terms and search content 
     
             return (name.includes(filter) || year.toString().includes(filter) 
             || country.includes(filter) || grape.includes(filter) || alcohol.toString().includes(filter));
           });
     
         } else {
                 // If the search bar is empty, set newList to original task list
           newList = this.state.wines;
         }
             // Set the filtered state based on what our rules added to newList
         this.setState({
           filtered: newList,
         });
  }

  masterOnSubmit = (e) => {
    this.setState ({
      add_component: true,
      share_component: false, 
      slideshow: false
    });
    
    getMasterWines(this.state.id).then(res => {
      if(!res.error){
        this.setState({
          wines: res
        })
        this.searchOnSubmit()
      }
      else {
        // Show in screen an error message 
      }
    })
  }

  render() {  
    return (
      <div className="cellar"> 

        <p className="welcome_user">Welcome back, <span className="user_name"><b>{this.state.username}</b></span>!</p>
        <form className="search_form">
            <input 
                type="search" 
                className="search_box" 
                name="search" 
                placeholder="Search"
                size="50"
                onChange={e => this.searchInfoChange(e)} 
                value={this.state.info}/>
        </form>

        {this.state.add_component === false && this.state.share_component === false &&
            <Fragment>
              {this.state.slideshow === true ? 
                <img id="grid" src={require('../images/grid.png')} alt="Grid" width= "35px" height= "auto" onClick={e => this.slideshow(e)}/>
              :
                <img id="square" src={require('../images/square.png')} alt="Square" width= "35px" height= "auto" onClick={e => this.slideshow(e)}/>
              }
            </Fragment>
         }

        {this.state.id !== 1 &&
        <Fragment>
          <button 
            className="inbox_button" 
            type="button"
            onClick={e => this.internalCellarOnSubmit(e)}>
            My Cellar
          </button>

          <button 
            className="inbox_button" 
            type="button"
            onClick={e => this.masterOnSubmit(e)}>
            Master Cellar
          </button>

          <button 
            className="inbox_button" 
            type="button"
            onClick={e => this.sharedOnSubmit(e)}>
            Shared with me
          </button>
        </Fragment>
        }

        {this.state.filtered.length === 0 ?
            <p className="empty_cellar">There is nothing here.</p>
            : 
            <WineList 
            wines={this.state.filtered} 
            send={this.state.add_component} 
            share={this.state.share_component} 
            slideshow={this.state.slideshow} 
            id={this.state.id} 
            edit={this.state.edit}
            searchChange={this.state.search_value} 
            info={this.state.info}
            search={e => this.searchOnChange(e)}
            cellar={e => this.internalCellarOnSubmit(e)} 
            master={e => this.masterOnSubmit(e)} 
            shared={e => this.sharedOnSubmit(e)}/>
        }
      </div>
    );
  }
}

export default Cellar;