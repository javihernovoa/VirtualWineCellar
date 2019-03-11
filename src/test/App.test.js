import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {withRouter} from "react-router-dom";
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import Cellar from '../pages/cellar';
import {userIsLogged} from '../App';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<App />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<Login />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<Register />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<Home />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<Cellar />), div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App />', () => {
    
  it('Links to Cellar', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('.title_form').text()).toBe("Login");
  });

});