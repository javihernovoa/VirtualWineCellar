import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../components/notFound';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
    
    it('renders message', () => {
      const wrapper = shallow(<NotFound />);
      expect(wrapper.find('.not_Found_Message').text()).toBe("Sorry, page not found!");
    });
  });