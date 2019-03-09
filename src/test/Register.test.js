import React from 'react';
import { shallow, mount } from 'enzyme';
import Register from '../pages/register';
import {withRouter} from "react-router-dom";

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

    it('renders message about account', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('p').text()).toBe("Do you have an account?");
    });

    it('renders button link "Login in your account"', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.button_link').text()).toBe("<Link />");
    });
  });

  describe('<Register /> When input is writen', () => {

    it('testing props value', () => {
        const state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        wrapper = shallow(<Register />);
        expect(wrapper.state('username')).toBe(state.username);
        expect(wrapper.state('email')).toBe(state.username);
        expect(wrapper.state('password')).toBe(state.password);
        expect(wrapper.state('confirm_password')).toBe(state.confirm_password);
    });
  });