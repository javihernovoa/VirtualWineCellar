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

    it('renders popup message', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.popuptext').text()).toBe("");
    });

    it('renders button link "Login in your account', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.button_link').text()).toBe("<Link />");
    });
  });

  describe('<Login /> Inputs', () => {

    it('testing simulated values', () => {
        const wrapper = shallow(<Login />);

        wrapper.find('input').at(0).simulate('change', {target: {value: 'Tester'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: 'Tester1234'}});

        expect(wrapper.state('username')).toBe('Tester');
        expect(wrapper.state('password')).toBe('Tester1234');
    });
    
    it('testing Login button', () => {
        const wrapper = shallow(<Login />);

        wrapper.find('.button_submit').simulate('click');

        expect(wrapper.state('send_info')).toBe(true);
        expect(wrapper.state('send_message')).toBe("Sended");
    });

    it('testing Login in your account button', () => {
        const wrapper = shallow(<Login />);

        expect(wrapper.find('Link').prop('to')).toBe('/register');
    });
  });