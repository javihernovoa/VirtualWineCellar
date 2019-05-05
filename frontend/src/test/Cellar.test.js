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
});