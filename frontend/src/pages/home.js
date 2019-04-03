/* 
  Class that contain the information of the web app. 
*/
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Auth from '../components/Auth';

class Home extends Component {
  render() {
    return (

      <div className="home">

        <figure className="home_image"> 
          <img id="hp_image_1" src={require('../images/home_section1.jpg')} alt="Wine Cellar" width= "100%" height= "auto"/>
        </figure> 

        <article className="welcome"> 

          <h3>Welcome to Virtual Wine Cellar</h3>

          <p>Virtual Wine Cellar is a web application for people who want to keep a record of their wines in one place.</p>

          {Auth.isUserAuthenticated() !== true &&
            <Link to="/register" className="home_button_link"> START NOW! </Link>
          }

        </article>

        <article> 
          <section className="feature_a">
          
            <h3>Features:</h3>

            <h4>Scan</h4>

            <p>Scan through your collection of wines!</p>

            <p>You can scan all in one list or one by one with a backward and forward option.</p>
    
          </section>

          <section className="feature_b"> 

            <h4>Add</h4>

            <p>Keep a record of your wines!</p>

            <p>Adding the wine to your collection is simple and easy. 
              You just need to fill the blank spaces in the add section.</p>
          </section>

          <section className="feature_a"> 

            <h4>Edit</h4>

            <p>Did your wine change any property? Edit it!</p>

            <p>Editing is simple, fast and easy. You just need to modify
              the specific property that changed.</p>
          </section>

          <section className="feature_b"> 

            <h4>Delete</h4>

            <p>It was a bad idea to add that wine? Delete it!</p>

            <p>Deleting a wine is straight foward, just go to the wine
              information and press the "X" button.</p>
          </section>

          <section className="feature_a"> 

            <h4>Share</h4>

            <p>Do you want to share a wine with a friend? You can do it!</p>

            <p>With the Share option you can share any wine to another 
              user at any time.</p>
          </section>

        </article>

      </div>
    );
  }
}

export default Home;
