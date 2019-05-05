import React from 'react';
import { shallow } from 'enzyme';
import Cellar from '../pages/cellar';
import Auth from '../components/Auth';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
Auth.authenticateUser('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTcwNzAxODEsIm5iZiI6MTU1NzA3MDE4MSwianRpIjoiMWQzZDg0NDItMmE3My00YWY3LTg0MjEtZTMyNjEyYTk4NDkzIiwiZXhwIjoxNTU3MDcxMDgxLCJpZGVudGl0eSI6eyJpZCI6MiwidXNlcm5hbWUiOiJBbGUiLCJlbWFpbCI6ImFtYXRvczU3M0BnbWFpbC5jb20ifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Xmx4CDLIJauaFA9F-eTM3B-PRYpZBajbgtth0-uSoe8');

describe('<Cellar />', () => {
    
    it('test User is logged', () => {
        const wrapper = shallow(<Cellar />);
        expect(wrapper.state('username')).toBe('Ale');
    });

    it('renders welcome message', () => {
        const wrapper = shallow(<Cellar />);
        expect(wrapper.find('.welcome_user').text()).toBe("Welcome back, Ale!");
    });

    it('testing searched values', () => {
        const wrapper = shallow(<Cellar />);
        wrapper.find('input').at(0).simulate('change', {target: {value: 'cabernet'}});
        expect(wrapper.state('info')).toBe('cabernet');
        
        const wines = [
            {id: 1,
            name: "Undurraga",
            year: 2016,
            country: "Argentina",
            grape: "Cabernet",
            alcohol: 13,
            link: "undurraga.jpg"}
        ]

        wrapper.setState({wines: wines});
        expect(wrapper.state('wines').grape.toBe("Cabernet Sauvignon"));
        
    });

    it('changes view mode (slideshow)', () => {
        const wrapper = shallow(<Cellar />);
        if ( wrapper.state('add_component').toBe(false) && wrapper.state('share_component').toBe(false) ){
        wrapper.find('img').at(0).simulate('change', {target: {value: false}});
        expect(wrapper.state('slideshow')).toBe(false);
        }else{
            expect(wrapper.state('slideshow')).toBe(false);
        }
    });
    
});