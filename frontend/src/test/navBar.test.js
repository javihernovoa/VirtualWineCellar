import React from 'react';
import { shallow, mount } from 'enzyme';
import NavBar from '../components/navBar';
import {MemoryRouter} from "react-router-dom";
import Auth from '../components/Auth';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<NavBar />', () => {

    ('Render all links', () => {
        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(wrapper.find('Link').length).toBe(4);
      });
    
    it('renders Title', () => {
      const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);
      expect(wrapper.find('Link').at(0).prop('to')).toBe('/');
    });

    it('renders Login button', () => {
        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(wrapper.find('Link').at(1).prop('to')).toBe('/login');
    });

    it('renders Register button', () => {
        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(wrapper.find('Link').at(2).prop('to')).toBe('/register');
    });

});

describe('<NavBar />', () => {

    it('renders Logout button', () => {
        Auth.authenticateUser({
            'id': 100,
            'username': "Tester",
            'email': "tester@gmail.com"
        })
        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(wrapper.find('Link').at(1).prop('to')).toBe('/login');
    });

    it('testing Logout button', () => {
        Auth.authenticateUser({
            'id': 100,
            'username': "Tester",
            'email': "tester@gmail.com"
        })

        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);

        wrapper.setState({
            cellar: true,
            logout: true
        });

        wrapper.find('.link').at(1).simulate('click', { button: 0 });

        expect(wrapper.state("logout")).toBe(true);
    });
});