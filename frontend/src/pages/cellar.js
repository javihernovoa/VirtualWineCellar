/* 
  Class that contain the information of the user of the web app. 
*/
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import WineList from '../components/winesList';

class Cellar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      info: '',
      search_option: 'users',
      sort_option: 'name'
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      username: decoded.identity.username,
      email: decoded.identity.email,
    })
  }

  searchInfoChange = (e) => {
    this.setState ({
      info: e.target.value,
    })
  }

  searchOptionChange = (e) => {
    this.setState ({
      search_option: e.target.value,
    })
  }

  sortOptionChange = (e) => {
    this.setState ({
      sort_option: e.target.value,
    })
  }

  searchOnSubmit = (e) => {
    console.log(this.state)

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
            <select className="select_options" onChange={e => this.searchOptionChange(e)} value={this.state.search_option}>
                <option value='users'>users</option>
                <option value='wines'>wines</option>
            </select>
            <button 
            className="option_button_submit" 
            type="button" 
            onClick={e => this.searchOnSubmit(e)}>
            Go!
          </button>
        </form>

        <div className="sort"> 
            <p className="sort_title">Sort by: </p>
            <select className="select_options" onChange={e => this.sortOptionChange(e)} value={this.state.sort_option}>
                    <option value='name'>Name</option>
                    <option value='year'>Year</option>
                    <option value='country'>Country</option>
                    <option value='grape'>Grape</option>
                    <option value='alcohol'>Alcohol</option>
            </select>
        </div>
    
        <button 
            className="inbox_button" 
            type="button">
            Shared with Me
          </button>

          {<WineList wines={wines} />}
      </div>
    );
  }
}

const wines = [
  {
    id: '1',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  },

  {
    id: '2',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  },

  {
    id: '3',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  },

  {
    id: '4',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  },

  {
    id: '5',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  },

  {
    id: '6',
    name: 'Undurraga',
    year: '2016',
    country: 'Argentina',
    desc: 'Undurraga is good.',
    grape: 'Cabernet Sauvignon',
    alcohol: 12
  }
];

export default Cellar;