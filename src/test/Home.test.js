import React from 'react';
import { shallow } from 'enzyme';
import Home from '../pages/home';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Home />', () => {

    it('renders Home image', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('#hp_image_1').prop('alt')).toBe("Wine Cellar");
    });

    it('shows welcome', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('.welcome').exists()).toBe(true);
    });

    it('shows feature a', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('.feature_a').exists()).toBe(true);
    });

    it('shows feature b', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('.feature_b').exists()).toBe(true);
    });

});