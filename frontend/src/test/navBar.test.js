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
        Auth.authenticateUser('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTcwNzAxODEsIm5iZiI6MTU1NzA3MDE4MSwianRpIjoiMWQzZDg0NDItMmE3My00YWY3LTg0MjEtZTMyNjEyYTk4NDkzIiwiZXhwIjoxNTU3MDcxMDgxLCJpZGVudGl0eSI6eyJpZCI6MiwidXNlcm5hbWUiOiJBbGUiLCJlbWFpbCI6ImFtYXRvczU3M0BnbWFpbC5jb20ifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Xmx4CDLIJauaFA9F-eTM3B-PRYpZBajbgtth0-uSoe8');

        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(wrapper.find('Link').at(1).prop('to')).toBe('/login');
    });

    it('testing Logout button', () => {
        Auth.authenticateUser('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTcwNzAxODEsIm5iZiI6MTU1NzA3MDE4MSwianRpIjoiMWQzZDg0NDItMmE3My00YWY3LTg0MjEtZTMyNjEyYTk4NDkzIiwiZXhwIjoxNTU3MDcxMDgxLCJpZGVudGl0eSI6eyJpZCI6MiwidXNlcm5hbWUiOiJBbGUiLCJlbWFpbCI6ImFtYXRvczU3M0BnbWFpbC5jb20ifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Xmx4CDLIJauaFA9F-eTM3B-PRYpZBajbgtth0-uSoe8');

        const wrapper = mount(<MemoryRouter><NavBar /></MemoryRouter>);

        wrapper.setState({
            cellar: true,
            logout: true
        });

        wrapper.find('.link').at(1).simulate('click', { button: 0 });

        expect(wrapper.state("logout")).toBe(true);
    });
});