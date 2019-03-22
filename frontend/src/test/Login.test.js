import React from 'react';
import { shallow } from 'enzyme';
import Login from '../pages/login';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
    
    it('renders Login', () => {
      const wrapper = shallow(<Login />);
      expect(wrapper.find('.title_form').text()).toBe("Login");
    });

    it('renders Username', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.label_input').first().text()).toBe("Username");
    });

    it('renders Password', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.label_input').at(1).text()).toBe("Password");
    });

    it('renders Input Boxes', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.form_input').length).toBe(2);
    });

    it('renders Login button', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.button_submit').length).toBe(1);
    });

    it('renders message about account', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('p').text()).toBe("Do you need an account?");
    });

    it('renders button link "Login in your account"', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.button_link').text()).toBe("<Link />");
    });
  });

  describe('<Login /> Inputs', () => {

    it('testing simulated values', () => {
        const wrapper = shallow(<Login />);

        wrapper.find('input').at(0).simulate('change', {target: {value: 'Test'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: 'TestPassword'}});

        expect(wrapper.state('username')).toBe('Test');
        expect(wrapper.state('password')).toBe('TestPassword');
    });
    
    it('testing Login button', () => {
        const wrapper = shallow(<Login />);

        wrapper.find('.button_submit').simulate('click');

        expect(wrapper.state('send_info')).toBe(true);
    });

    it('testing Login in your account button', () => {
        const wrapper = shallow(<Login />);

        expect(wrapper.find('Link').prop('to')).toBe('/register');
    });
  });