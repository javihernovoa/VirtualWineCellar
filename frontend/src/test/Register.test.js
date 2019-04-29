import React from 'react';
import { shallow } from 'enzyme';
import Register from '../pages/register';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Register />', () => {
    
    it('renders Register', () => {
      const wrapper = shallow(<Register />);
      expect(wrapper.find('.title_form').text()).toBe("Register");
    });

    it('renders Username', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.label_input').first().text()).toBe("Username");
    });

    it('renders Email', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.label_input').at(1).text()).toBe("Email");
    });

    it('renders Password', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.label_input').at(2).text()).toBe("Password");
    });

    it('renders Confirm Password', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.label_input').at(3).text()).toBe("Confirm Password");
    });

    it('renders Input Boxes', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.form_input').length).toBe(4);
    });

    it('renders Register button', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.button_submit').length).toBe(1);
    });

    it('renders popup message', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.popuptext').text()).toBe("");
    });

    it('renders message about account', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('p').text()).toBe("Do you have an account?");
    });

    it('renders button link "Login in your account"', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.button_link').text()).toBe("<Link />");
    });
  });

  describe('<Register /> Inputs', () => {

    it('testing simulated values', () => {
        const wrapper = shallow(<Register />);

        wrapper.find('input').at(0).simulate('change', {target: {value: 'Test'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: 'test@test.com'}});
        wrapper.find('input').at(2).simulate('change', {target: {value: 'TestPassword'}});
        wrapper.find('input').at(3).simulate('change', {target: {value: 'TestPassword'}});

        expect(wrapper.state('username')).toBe('Test');
        expect(wrapper.state('email')).toBe('test@test.com');
        expect(wrapper.state('password')).toBe('TestPassword');
        expect(wrapper.state('confirm_password')).toBe('TestPassword');
    });
    
    it('testing Register button', () => {
        const wrapper = shallow(<Register />);

        wrapper.find('.button_submit').simulate('click');

        expect(wrapper.state('send_info')).toBe(true);
        expect(wrapper.state('send_message')).toBe("Sended");
    });

    it('testing Login in your account button', () => {
        const wrapper = shallow(<Register />);

        expect(wrapper.find('Link').prop('to')).toBe('/login');
    });
  });