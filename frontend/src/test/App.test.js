import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {withRouter, MemoryRouter} from "react-router-dom";
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import Cellar from '../pages/cellar';

import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<App />', () => {
    
  it('Has all links', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    expect(wrapper.find('Link').length).toBe(4);
  });

  it('Links to Cellar', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    expect(wrapper.find('Link').at(0).prop('to')).toBe('/');
  });

  it('Links to login', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    expect(wrapper.find('Link').at(1).prop('to')).toBe('/login');
  });

  it('Links to register', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    expect(wrapper.find('Link').at(2).prop('to')).toBe('/register');
  });

  it('Links to register from Home page', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    expect(wrapper.find('Link').at(3).prop('to')).toBe('/register');
  });

  it('Links to login after logout', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
    wrapper.setState({isLogged: true});
    expect(wrapper.find('Link').at(1).prop('to')).toBe('/login');
  });

});

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

