import React from 'react';
import Enzyme from 'enzyme';
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
        const wines = [
            {
                0: 1,
                1: "Undurraga",
                2: 2016,
                3: "Argentina",
                4: "Cabernet Sauvignon",
                5: 13,
                6: "undurraga.jpg"
            },
            {   
                0: 2,
                1: "Undurraga",
                2: 2017,
                3: "Argentina",
                4: "Cabernet Sauvignon",
                5: 13,
                6: "undurraga.jpg"
            },
            {   
                0: 3,
                1: "Campo Viejo",
                2: 2012,
                3: "España",
                4: "Tempranillo",
                5: 12,
                6: "undurraga.jpg"
            }

        ];

        wrapper.setState({wines: wines});
        wrapper.find('input').at(0).simulate('change', {target: {value: 'cabernet'}});
        expect(wrapper.state('info')).toBe('cabernet');
        
        expect(wrapper.state('filtered').length).toBe(2);

        // for (wine in wrapper.state('filtered')){
        var wine;
        var type;

        for (var i = 0; i < wrapper.state('filtered').length; i++){
            wine = wrapper.state('filtered')[i];
            type = wine[4]
            expect(type).toBe('Cabernet Sauvignon'); 
            expect(type.toLowerCase()).toContain('cabernet'); 
        }
       
    });

    it('changes view mode (slideshow)', () => {
        const wrapper = shallow(<Cellar />);
        if (wrapper.state('add_component') === false && wrapper.state('share_component') === false ){
        wrapper.find('img').at(0).simulate('change', {target: {value: false}});
        expect(wrapper.state('slideshow')).toBe(false);
        }else{
            expect(wrapper.state('slideshow')).toBe(true);
        }
    });
    
});